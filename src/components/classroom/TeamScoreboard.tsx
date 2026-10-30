import type { Team } from '@/core/classroom-store';
import styles from './TeamScoreboard.module.css';

export interface TeamScoreboardProps {
  teams: Team[];
  isPresenter?: boolean;
  onAddScore?: (teamId: string, delta: number) => void;
  onResetScores?: () => void;
}

export function TeamScoreboard({
  teams,
  isPresenter = false,
  onAddScore,
  onResetScores,
}: TeamScoreboardProps) {
  if (isPresenter) {
    return (
      <div className={styles.controlsRow} data-testid="presenter-team-controls">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#94a3b8' }}>
            ⭐ BẢNG ĐIỂM THI ĐUA ĐỘI
          </span>
          <button
            onClick={onResetScores}
            style={{
              fontSize: '12px',
              padding: '4px 8px',
              background: '#450a0a',
              color: '#f87171',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Đặt lại
          </button>
        </div>

        {teams.map((team) => (
          <div key={team.id} className={styles.controlCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: team.color,
                }}
              />
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>
                {team.name}
              </span>
              <span style={{ color: '#facc15', fontWeight: 800, fontSize: '15px' }}>
                ⭐ {team.score}
              </span>
            </div>

            <div className={styles.btnGroup}>
              <button
                className={styles.scoreBtn}
                onClick={() => onAddScore?.(team.id, -1)}
                title="Trừ 1 điểm"
              >
                -1
              </button>
              <button
                className={`${styles.scoreBtn} ${styles.scoreBtnPlus}`}
                onClick={() => onAddScore?.(team.id, 1)}
                title="Cộng 1 điểm"
                data-testid={`score-plus1-${team.id}`}
              >
                +1 ⭐
              </button>
              <button
                className={`${styles.scoreBtn} ${styles.scoreBtnPlus}`}
                style={{ background: '#2563eb' }}
                onClick={() => onAddScore?.(team.id, 5)}
                title="Cộng 5 điểm"
              >
                +5 ⭐
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // TV Screen Header Compact Banner
  return (
    <div className={styles.bannerContainer} data-testid="tv-team-scoreboard">
      {teams.map((team) => (
        <div
          key={team.id}
          className={styles.teamBadge}
          style={{ borderColor: team.color }}
        >
          <span className={styles.teamName}>{team.name}</span>
          <span className={styles.starScore}>
            <span>⭐</span>
            <span>{team.score}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

