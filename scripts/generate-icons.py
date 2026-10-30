import zlib
import struct
import math

def create_png(width, height, get_pixel_func):
    """Encodes RGBA pixel array into valid PNG file bytes using standard library only."""
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # Filter byte: None
        for x in range(width):
            r, g, b, a = get_pixel_func(x, y, width, height)
            raw_data.extend([int(r), int(g), int(b), int(a)])
            
    compressed = zlib.compress(bytes(raw_data), 9)
    
    # PNG signature
    png = bytearray(b'\x89PNG\r\n\x1a\n')
    
    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data)
    png.extend(struct.pack('>I', len(ihdr_data)))
    png.extend(b'IHDR')
    png.extend(ihdr_data)
    png.extend(struct.pack('>I', ihdr_crc))
    
    # IDAT chunk
    idat_crc = zlib.crc32(b'IDAT' + compressed)
    png.extend(struct.pack('>I', len(compressed)))
    png.extend(b'IDAT')
    png.extend(compressed)
    png.extend(struct.pack('>I', idat_crc))
    
    # IEND chunk
    iend_crc = zlib.crc32(b'IEND')
    png.extend(struct.pack('>I', 0))
    png.extend(b'IEND')
    png.extend(struct.pack('>I', iend_crc))
    
    return bytes(png)

def pixel_shader(x, y, w, h):
    # Normalized coordinates [-1, 1]
    nx = (x / (w - 1)) * 2 - 1
    ny = (y / (h - 1)) * 2 - 1
    dist = math.sqrt(nx * nx + ny * ny)
    
    # Rounded squircle boundary (radius ~ 0.88)
    # x^4 + y^4 <= r^4
    squircle_dist = (nx**4 + ny**4) ** 0.25
    if squircle_dist > 0.92:
        return 0, 0, 0, 0 # Transparent background outside squircle
        
    # Anti-aliasing edge
    edge_alpha = 1.0
    if squircle_dist > 0.88:
        edge_alpha = max(0.0, min(1.0, (0.92 - squircle_dist) / 0.04))
        
    # Blue gradient background: #1d4ed8 to #3b82f6
    grad = (ny + 1) * 0.5
    bg_r = int(29 + (59 - 29) * grad)
    bg_g = int(78 + (130 - 78) * grad)
    bg_b = int(216 + (246 - 216) * grad)
    
    # Golden badge / circle in center
    badge_dist = math.sqrt(nx * nx + (ny + 0.05) ** 2)
    if badge_dist < 0.48:
        # Gold gradient: #f59e0b to #fbbf24
        gold_t = (ny + 0.48) / 0.96
        br = int(245 + (251 - 245) * gold_t)
        bg = int(158 + (191 - 158) * gold_t)
        bb = int(11 + (36 - 11) * gold_t)
        
        # White "1" digit in center
        # Stem of "1": nx in [-0.06, 0.06], ny in [-0.25, 0.20]
        # Flag of "1": nx in [-0.18, 0.0], ny in [-0.25, -0.10]
        # Base of "1": nx in [-0.18, 0.18], ny in [0.16, 0.24]
        is_stem = (-0.05 <= nx <= 0.05) and (-0.22 <= ny <= 0.20)
        is_flag = (-0.16 <= nx <= 0.0) and (-0.22 <= ny <= -0.10) and (ny - nx <= -0.06)
        is_base = (-0.16 <= nx <= 0.16) and (0.16 <= ny <= 0.24)
        
        if is_stem or is_flag or is_base:
            return 255, 255, 255, int(255 * edge_alpha)
            
        return br, bg, bb, int(255 * edge_alpha)
        
    # Subtle border around badge
    if badge_dist < 0.52:
        return 255, 255, 255, int(220 * edge_alpha)

    return bg_r, bg_g, bg_b, int(255 * edge_alpha)

def main():
    print("🎨 Generating PWA icons...")
    for size in [192, 512]:
        png_data = create_png(size, size, pixel_shader)
        out_path = f"public/icon-{size}.png"
        with open(out_path, "wb") as f:
            f.write(png_data)
        print(f"   ✅ Created {out_path} ({len(png_data):,} bytes)")

if __name__ == "__main__":
    main()
