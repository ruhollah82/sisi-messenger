import { useEffect, useRef, useState } from "react";

// Improved Perlin noise implementation
const perlin = {
  grad: function (hash, x, y) {
    const h = hash & 15;
    return ((h & 1) === 0 ? x : -x) + ((h & 2) === 0 ? y : -y);
  },
  fade: function (t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  },
  lerp: function (a, b, t) {
    return a + t * (b - a);
  },
  p: new Array(512),
  init: function () {
    const permutation = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
      140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247,
      120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177,
      33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165,
      71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211,
      133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25,
      63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
      135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
      226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206,
      59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248,
      152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22,
      39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218,
      246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
      81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
      222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
    ];
    for (let i = 0; i < 256; i++) {
      this.p[i] = permutation[i];
      this.p[256 + i] = permutation[i];
    }
  },
  noise: function (x, y) {
    if (!this.p[0]) this.init();

    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = this.fade(x);
    const v = this.fade(y);

    const a = this.p[X] + Y;
    const aa = this.p[a];
    const ab = this.p[a + 1];
    const b = this.p[X + 1] + Y;
    const ba = this.p[b];
    const bb = this.p[b + 1];

    // Fixed return statement - removed extra operators
    return this.lerp(
      this.lerp(this.grad(aa, x, y), this.grad(ba, x - 1, y), u),
      this.lerp(this.grad(ab, x, y - 1), this.grad(bb, x - 1, y - 1), u),
      v
    );
  },
};

/**
 * @param {string} color - CSS color
 * @param {{x: number, y: number}} origin - Starting position in %
 * @param {number} radius - Gradient radius percentage (e.g., 70)
 * @param {number} speedFactor - How fast it moves
 * @param {number} amplitude - Movement range (size of movement area)
 * @param {'perlin'|'wave'|'static'} mode - Motion style
 * @param {'circle'|'ellipse'} shape - Gradient shape
 */
export function useMovingRadial(
  color,
  origin = { x: 50, y: 50 },
  radius = 70,
  speedFactor = 0.5,
  amplitude = 20,
  mode = "perlin",
  shape = "circle"
) {
  const [position, setPosition] = useState(origin);
  const requestRef = useRef();
  const noiseOffset = useRef({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      let newX = origin.x;
      let newY = origin.y;

      if (mode === "perlin") {
        // Calculate noise-based position
        const noiseX = perlin.noise(noiseOffset.current.x, 0);
        const noiseY = perlin.noise(0, noiseOffset.current.y);

        newX = origin.x + noiseX * amplitude;
        newY = origin.y + noiseY * amplitude;

        // Update noise offsets
        noiseOffset.current.x += delta * speedFactor;
        noiseOffset.current.y += delta * speedFactor;
      } else if (mode === "wave") {
        const t = performance.now() / 1000;
        newX = origin.x + Math.sin(t * speedFactor) * 10;
        newY = origin.y + Math.cos(t * speedFactor) * 10;
      }
      // Else: static mode - position remains at origin

      setPosition({ x: newX, y: newY });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mode, amplitude, speedFactor, origin]);

  return `radial-gradient(${shape} at ${position.x}% ${position.y}%, ${color} 0%, transparent ${radius}%)`;
}
