const numberWords: Record<string, string> = {
  '0': 'không', '1': 'một', '2': 'hai', '3': 'ba', '4': 'bốn',
  '5': 'năm', '6': 'sáu', '7': 'bảy', '8': 'tám', '9': 'chín', '10': 'mười',
};

const phonemeNames: Record<string, string> = {
  b: 'bờ', c: 'cờ', d: 'dờ', đ: 'đờ', g: 'gờ', k: 'ca',
  h: 'hờ', l: 'lờ', m: 'mờ', n: 'nờ', p: 'pờ', r: 'rờ',
  s: 'sờ', t: 'tờ', v: 'vờ', x: 'xờ', ch: 'chờ', nh: 'nhờ',
  th: 'thờ', gh: 'gờ',
};
const phonemeTokens = new Set([
  ...Object.keys(phonemeNames),
  ...Object.values(phonemeNames),
]);

function tokenize(text: string): string[] {
  let normalized = text.toLowerCase();
  normalized = normalized
    .replace(/^\s*=\s*(?=\d)/, ' ')
    .replace(/</g, ' dấu bé ')
    .replace(/>/g, ' dấu lớn ')
    .replace(/\+/g, ' cộng ')
    .replace(/-/g, ' trừ ')
    .replace(/=/g, ' bằng ');

  for (const [digit, word] of Object.entries(numberWords)) {
    normalized = normalized.replace(new RegExp(`\\b${digit}\\b`, 'g'), word);
  }

  return normalized
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      if (token === 'ảnh' || token === 'tranh') return 'hình';
      if (token === 'cái') return 'chiếc';
      if (token === 'chú') return 'con';
      return token;
    });
}

function stripPhonemeLabelPrefix(text: string): string {
  const prefix = /^\s*(?:chữ(?:\s+cái)?|phụ\s+âm)\s+/iu;
  const match = text.match(prefix);
  if (!match) return text;

  const remainder = text.slice(match[0].length);
  const tokens = tokenize(remainder);
  const onlyToken = tokens.length === 1 ? tokens[0] : undefined;
  return onlyToken !== undefined && phonemeTokens.has(onlyToken) ? remainder : text;
}

export function audioTextMatches(displayed: string, spoken: string): boolean {
  let displayedText = displayed;
  let spokenText = spoken;
  if (/^\s*=\s*\d/u.test(displayed)) {
    const resultLabelPrefix = /^(?:kết\s+quả|đáp\s+số|đáp\s+án)\s*/iu;
    const withoutResultPrefix = spoken.replace(resultLabelPrefix, '');
    if (withoutResultPrefix !== spoken) {
      displayedText = displayed.replace(/^\s*=\s*/, '');
      spokenText = withoutResultPrefix;
    }
  }

  displayedText = stripPhonemeLabelPrefix(displayedText);
  spokenText = stripPhonemeLabelPrefix(spokenText);
  const displayedTokens = tokenize(displayedText);
  const spokenTokens = tokenize(spokenText);
  if (displayedTokens.length === 0 || spokenTokens.length === 0) return false;

  const tokensMatch = (expected: string, actual: string): boolean =>
    expected === actual || phonemeNames[expected] === actual || phonemeNames[actual] === expected;

  let expectedIndex = 0;
  for (const spokenToken of spokenTokens) {
    const expectedToken = displayedTokens[expectedIndex];
    if (expectedToken !== undefined && tokensMatch(expectedToken, spokenToken)) expectedIndex++;
    if (expectedIndex === displayedTokens.length) return true;
  }
  return false;
}
