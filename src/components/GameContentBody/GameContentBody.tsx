import type { ReactNode } from "react";
import styles from "./GameContentBody.module.scss";

// ─── Corner coordinate reference ────────────────────────────────────────────
// Each SVG is 200 × 200 and positioned so the parchment corner aligns to:
//   TL → SVG (28, 28)   TR → SVG (172, 28)
//   BL → SVG (28, 172)  BR → SVG (172, 172)
//
// Inside branches tip ≤55px from the parchment edge.
// Accent leaves whose tips are outside the border (x<28/y<28 for TL, etc.)
// are drawn larger to frame the page from the exterior.

// ── TOP-LEFT ─────────────────────────────────────────────────────────────────
const TopLeftFoliage = ({ className }: { className: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    overflow="visible"
  >
    {/* Main vines */}
    <path
      d="M 28 -5 C 33 28 22 58 28 92 C 34 126 21 155 26 192"
      stroke="#1e3d22"
      strokeWidth="4.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M -5 28 C 28 33 58 22 92 28 C 126 34 155 21 192 26"
      stroke="#1e3d22"
      strokeWidth="4.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* Left-vine branches — tips ≤55px inside */}
    {/* y=36: reaches UP into outside-top corner area */}
    <path
      d="M 28 36 C 36 24 48 16 58 12"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* y=80: horizontal-ish, shortened from 114→66 */}
    <path
      d="M 28 80 C 44 70 56 70 66 74"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* y=134: short right reach */}
    <path
      d="M 26 134 C 36 126 48 122 58 120"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />

    {/* Top-vine branches — tips ≤55px inside */}
    {/* x=48: S-curve shortened from y=100→68 */}
    <path
      d="M 48 28 C 38 42 32 56 26 68"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* x=104: curves down, shortened from y=80→62 */}
    <path
      d="M 104 24 C 116 22 112 46 100 62"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* x=158: nearly vertical, shortened from y=86→60 */}
    <path
      d="M 158 26 C 160 40 158 52 152 60"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />

    {/* ── Leaves ── */}

    {/* tip (58,12) — OUTSIDE top edge (y<28). Large leaf. */}
    <path
      d="M 58 12 C 80 -10 108 0 90 26 C 72 52 48 34 58 12"
      fill="#4e8a54"
    />
    <path
      d="M 58 12 L 90 26"
      stroke="#2a5030"
      strokeWidth="1.2"
      fill="none"
      opacity={0.65}
    />
    <path
      d="M 64 10 C 76 0 86 2 88 10"
      stroke="#2a5030"
      strokeWidth="0.8"
      fill="none"
      opacity={0.45}
    />

    {/* tip (66,74) — short inside, compact leaf */}
    <path
      d="M 66 74 C 80 60 98 68 86 86 C 74 104 60 90 66 74"
      fill="#3d7244"
    />
    <path
      d="M 66 74 L 86 86"
      stroke="#2a5030"
      strokeWidth="1.1"
      fill="none"
      opacity={0.65}
    />

    {/* tip (58,120) — short inside, compact leaf */}
    <path
      d="M 58 120 C 74 106 92 114 80 132 C 68 150 54 136 58 120"
      fill="#4e8a54"
    />
    <path
      d="M 58 120 L 80 132"
      stroke="#2a5030"
      strokeWidth="1.1"
      fill="none"
      opacity={0.65}
    />

    {/* tip (26,68) — hugs left vine, leaf opens LEFT (outside parchment). Large. */}
    <path
      d="M 26 68 C 2 82 4 112 28 96 C 52 80 46 60 26 68"
      fill="#3d7244"
    />
    <path
      d="M 26 68 L 28 96"
      stroke="#2a5030"
      strokeWidth="1.1"
      fill="none"
      opacity={0.65}
    />

    {/* tip (100,62) — top vine curves down, medium leaf */}
    <path
      d="M 100 62 C 116 48 136 56 122 76 C 108 96 92 78 100 62"
      fill="#4e8a54"
    />
    <path
      d="M 100 62 L 122 76"
      stroke="#2a5030"
      strokeWidth="1.2"
      fill="none"
      opacity={0.65}
    />

    {/* tip (152,60) — near-vertical, medium leaf */}
    <path
      d="M 152 60 C 138 74 142 96 158 84 C 174 72 166 56 152 60"
      fill="#3d7244"
    />
    <path
      d="M 152 60 L 158 84"
      stroke="#2a5030"
      strokeWidth="1.1"
      fill="none"
      opacity={0.65}
    />

    {/* ── Outer accent leaves — ENLARGED (sit outside or on the parchment border) ── */}
    {/* Outside top (y < 28): */}
    <path
      d="M 50 20 C 38 6 24 12 32 28 C 40 44 58 36 50 20"
      fill="#60a464"
      opacity={0.9}
    />
    <path
      d="M 20 50 C 6 38 12 24 28 32 C 44 40 36 58 20 50"
      fill="#60a464"
      opacity={0.9}
    />
    <path
      d="M 78 14 C 68 0 52 6 62 22 C 72 38 86 28 78 14"
      fill="#60a464"
      opacity={0.85}
    />
    <path
      d="M 14 78 C 0 68 6 52 22 62 C 38 72 28 86 14 78"
      fill="#60a464"
      opacity={0.85}
    />
    <path
      d="M 144 20 C 134 6 118 12 128 28 C 138 44 152 34 144 20"
      fill="#60a464"
      opacity={0.78}
    />
    <path
      d="M 20 144 C 6 134 12 118 28 128 C 44 138 34 152 20 144"
      fill="#60a464"
      opacity={0.78}
    />

    {/* Curly tendrils */}
    <path
      d="M 40 22 C 47 17 52 21 48 28 C 44 35 35 31 38 24"
      stroke="#2d5c32"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 22 40 C 17 47 21 52 28 48 C 35 44 31 35 24 38"
      stroke="#2d5c32"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 26 192 C 22 204 28 212 24 222"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity={0.65}
    />
    <path
      d="M 192 26 C 204 22 212 28 222 24"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity={0.65}
    />

    {/* Moss cluster at corner */}
    <circle
      cx="14"
      cy="14"
      r="20"
      fill="#3a683a"
      opacity={0.52}
    />
    <circle
      cx="26"
      cy="8"
      r="15"
      fill="#3a683a"
      opacity={0.58}
    />
    <circle
      cx="8"
      cy="26"
      r="15"
      fill="#3a683a"
      opacity={0.58}
    />
    <circle
      cx="33"
      cy="17"
      r="11"
      fill="#4e824e"
      opacity={0.62}
    />
    <circle
      cx="17"
      cy="33"
      r="11"
      fill="#4e824e"
      opacity={0.62}
    />
    <circle
      cx="40"
      cy="8"
      r="9"
      fill="#4e824e"
      opacity={0.58}
    />
    <circle
      cx="8"
      cy="40"
      r="9"
      fill="#4e824e"
      opacity={0.58}
    />
    <circle
      cx="24"
      cy="24"
      r="10"
      fill="#2a4e2a"
      opacity={0.68}
    />
    <circle
      cx="36"
      cy="28"
      r="7"
      fill="#659865"
      opacity={0.6}
    />
    <circle
      cx="28"
      cy="36"
      r="7"
      fill="#659865"
      opacity={0.6}
    />
    <circle
      cx="43"
      cy="16"
      r="6"
      fill="#78ae78"
      opacity={0.52}
    />
    <circle
      cx="16"
      cy="43"
      r="6"
      fill="#78ae78"
      opacity={0.52}
    />
    <circle
      cx="44"
      cy="30"
      r="5"
      fill="#659865"
      opacity={0.48}
    />
    <circle
      cx="30"
      cy="44"
      r="5"
      fill="#659865"
      opacity={0.48}
    />
    <circle
      cx="48"
      cy="20"
      r="4"
      fill="#78ae78"
      opacity={0.45}
    />
    <circle
      cx="20"
      cy="48"
      r="4"
      fill="#78ae78"
      opacity={0.45}
    />
  </svg>
);

// ── TOP-RIGHT ─────────────────────────────────────────────────────────────────
const TopRightFoliage = ({ className }: { className: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    overflow="visible"
  >
    <path
      d="M 172 -5 C 167 28 178 58 172 92 C 166 126 179 155 174 192"
      stroke="#1e3d22"
      strokeWidth="4.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 205 28 C 172 33 142 22 108 28 C 74 34 45 21 8 26"
      stroke="#1e3d22"
      strokeWidth="4.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* Right-vine branches — tips ≤55px inside from right edge (x≥117) */}
    {/* y=62: shortened from x=96→120 */}
    <path
      d="M 172 62 C 152 46 136 52 120 70"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* y=140: shortened from x=106→124 */}
    <path
      d="M 174 140 C 156 136 140 140 124 132"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* Top-vine branches — tips ≤55px inside from top edge (y≤83) */}
    {/* x=158: near-vertical, shortened from y=82→70 */}
    <path
      d="M 158 28 C 162 44 164 58 166 70"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    {/* x=122: curves down, shortened from y=78→64 */}
    <path
      d="M 122 24 C 134 22 130 50 120 64"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* x=82: S-curve, shortened from y=96→70 and x=68→114 */}
    <path
      d="M 82 28 C 80 48 86 62 114 72"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* x=46: redirected UPWARD to hang outside the top edge */}
    <path
      d="M 46 26 C 40 16 34 6 28 -4"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />

    {/* ── Leaves ── */}

    {/* tip (120,70) — right vine going left, leaf opens left-down */}
    <path
      d="M 120 70 C 100 56 80 66 96 88 C 112 110 130 90 120 70"
      fill="#4e8a54"
    />
    <path
      d="M 120 70 L 96 88"
      stroke="#2a5030"
      strokeWidth="1.2"
      fill="none"
      opacity={0.65}
    />
    <path
      d="M 116 74 C 108 68 100 70 98 76"
      stroke="#2a5030"
      strokeWidth="0.8"
      fill="none"
      opacity={0.45}
    />

    {/* tip (124,132) — right vine lower, leaf opens left */}
    <path
      d="M 124 132 C 104 118 84 128 100 150 C 116 172 132 152 124 132"
      fill="#3d7244"
    />
    <path
      d="M 124 132 L 100 150"
      stroke="#2a5030"
      strokeWidth="1.2"
      fill="none"
      opacity={0.65}
    />

    {/* tip (166,70) — near-vertical, compact leaf opens right */}
    <path
      d="M 166 70 C 178 86 178 108 162 96 C 146 84 156 68 166 70"
      fill="#3d7244"
    />
    <path
      d="M 166 70 L 162 96"
      stroke="#2a5030"
      strokeWidth="1.1"
      fill="none"
      opacity={0.65}
    />

    {/* tip (120,64) — top vine curves down, medium leaf */}
    <path
      d="M 120 64 C 134 48 154 56 140 76 C 126 96 110 78 120 64"
      fill="#4e8a54"
    />
    <path
      d="M 120 64 L 140 76"
      stroke="#2a5030"
      strokeWidth="1.2"
      fill="none"
      opacity={0.65}
    />

    {/* tip (114,72) — S-curve medium leaf */}
    <path
      d="M 114 72 C 96 58 76 68 92 90 C 108 112 124 92 114 72"
      fill="#3d7244"
    />
    <path
      d="M 114 72 L 92 90"
      stroke="#2a5030"
      strokeWidth="1.2"
      fill="none"
      opacity={0.65}
    />

    {/* tip (28,−4) — OUTSIDE top edge! Large leaf hangs ABOVE the parchment. */}
    <path
      d="M 28 -4 C 8 -22 -12 -10 4 16 C 20 42 40 22 28 -4"
      fill="#4e8a54"
    />
    <path
      d="M 28 -4 L 4 16"
      stroke="#2a5030"
      strokeWidth="1.2"
      fill="none"
      opacity={0.65}
    />

    {/* ── Outer accent leaves — ENLARGED (x>172 or y<28) ── */}
    <path
      d="M 156 16 C 164 2 178 8 172 22 C 166 36 152 28 156 16"
      fill="#60a464"
      opacity={0.9}
    />
    <path
      d="M 135 18 C 143 4 157 10 151 24 C 145 38 131 30 135 18"
      fill="#60a464"
      opacity={0.87}
    />
    <path
      d="M 180 50 C 192 38 206 46 198 62 C 190 78 178 68 180 50"
      fill="#60a464"
      opacity={0.9}
    />
    <path
      d="M 176 112 C 188 100 202 108 194 124 C 186 140 174 130 176 112"
      fill="#60a464"
      opacity={0.82}
    />
    <path
      d="M 106 16 C 114 2 128 8 122 22 C 116 36 102 28 106 16"
      fill="#60a464"
      opacity={0.84}
    />
    <path
      d="M 74 18 C 82 4 96 10 90 24 C 84 38 70 30 74 18"
      fill="#60a464"
      opacity={0.8}
    />

    {/* Curly tendril at corner */}
    <path
      d="M 162 20 C 156 14 150 18 154 25 C 158 32 166 29 162 20"
      stroke="#2d5c32"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 174 192 C 178 205 172 216 177 228"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity={0.65}
    />
    <path
      d="M 8 26 C -3 22 -9 27 -16 23"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity={0.65}
    />

    {/* Compact moss cluster */}
    <circle
      cx="186"
      cy="14"
      r="16"
      fill="#3a683a"
      opacity={0.52}
    />
    <circle
      cx="174"
      cy="8"
      r="12"
      fill="#3a683a"
      opacity={0.58}
    />
    <circle
      cx="192"
      cy="26"
      r="12"
      fill="#3a683a"
      opacity={0.55}
    />
    <circle
      cx="180"
      cy="22"
      r="9"
      fill="#4e824e"
      opacity={0.62}
    />
    <circle
      cx="192"
      cy="36"
      r="8"
      fill="#4e824e"
      opacity={0.58}
    />
    <circle
      cx="170"
      cy="18"
      r="9"
      fill="#2a4e2a"
      opacity={0.65}
    />
    <circle
      cx="184"
      cy="32"
      r="6"
      fill="#659865"
      opacity={0.58}
    />
    <circle
      cx="194"
      cy="20"
      r="5"
      fill="#78ae78"
      opacity={0.52}
    />
    <circle
      cx="166"
      cy="28"
      r="5"
      fill="#659865"
      opacity={0.5}
    />
    <circle
      cx="196"
      cy="32"
      r="4"
      fill="#78ae78"
      opacity={0.45}
    />
  </svg>
);

// ── BOTTOM-LEFT ───────────────────────────────────────────────────────────────
const BottomLeftFoliage = ({ className }: { className: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    overflow="visible"
  >
    <path
      d="M 28 205 C 33 172 22 142 28 108 C 34 74 21 45 26 8"
      stroke="#1e3d22"
      strokeWidth="4.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M -5 172 C 28 167 58 178 92 172 C 126 166 155 179 192 174"
      stroke="#1e3d22"
      strokeWidth="4.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* Left-vine branches — tips ≤55px inside from left (x≤83) */}
    {/* y=148: shortened from x=116→68 */}
    <path
      d="M 28 148 C 44 142 58 144 68 152"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* y=104: shortened from x=112→66 */}
    <path
      d="M 28 104 C 44 92 56 86 66 80"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* y=65: shortened from x=78→64 */}
    <path
      d="M 26 65 C 38 56 52 50 64 46"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    {/* y=30: shortened from x=128→66 */}
    <path
      d="M 28 30 C 40 22 54 20 66 18"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* Bottom-vine branches */}
    <path
      d="M 64 172 C 54 148 58 122 46 106"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 150 174 C 144 150 152 120 162 104"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* ── Leaves ── */}

    {/* tip (68,152) — near bottom vine, leaf opens right-down */}
    <path
      d="M 68 152 C 86 136 108 144 94 166 C 80 188 62 172 68 152"
      fill="#3d7244"
    />
    <path
      d="M 68 152 L 94 166"
      stroke="#2a5030"
      strokeWidth="1.3"
      fill="none"
      opacity={0.65}
    />
    <path
      d="M 74 150 C 82 142 90 144 92 150"
      stroke="#2a5030"
      strokeWidth="0.9"
      fill="none"
      opacity={0.45}
    />

    {/* tip (66,80) — curves up, medium leaf */}
    <path
      d="M 66 80 C 84 62 108 72 94 94 C 80 116 60 96 66 80"
      fill="#4e8a54"
    />
    <path
      d="M 66 80 L 94 94"
      stroke="#2a5030"
      strokeWidth="1.3"
      fill="none"
      opacity={0.65}
    />

    {/* tip (64,46) — steep up, medium leaf */}
    <path
      d="M 64 46 C 82 30 106 40 90 62 C 74 84 56 64 64 46"
      fill="#3d7244"
    />
    <path
      d="M 64 46 L 90 62"
      stroke="#2a5030"
      strokeWidth="1.2"
      fill="none"
      opacity={0.65}
    />

    {/* tip (66,18) — high up inside parchment, leaf opens upper-right */}
    <path
      d="M 66 18 C 84 0 108 10 92 32 C 76 54 58 34 66 18"
      fill="#4e8a54"
    />
    <path
      d="M 66 18 L 92 32"
      stroke="#2a5030"
      strokeWidth="1.2"
      fill="none"
      opacity={0.65}
    />

    {/* tip (46,106) — near left edge, leaf opens up-left (outside) */}
    <path
      d="M 46 106 C 28 92 30 70 48 82 C 66 94 62 112 46 106"
      fill="#3d7244"
    />
    <path
      d="M 46 106 L 48 82"
      stroke="#2a5030"
      strokeWidth="1.1"
      fill="none"
      opacity={0.65}
    />

    {/* tip (162,104) — bottom vine arcs right, compact leaf */}
    <path
      d="M 162 104 C 178 88 192 68 178 80 C 164 92 156 108 162 104"
      fill="#4e8a54"
    />

    {/* ── Outer accent leaves — ENLARGED (x<28 or y>172) ── */}
    <path
      d="M 52 168 C 44 156 32 160 38 174 C 44 188 58 180 52 168"
      fill="#60a464"
      opacity={0.9}
    />
    <path
      d="M 20 150 C 6 140 8 124 22 132 C 36 140 30 154 20 150"
      fill="#60a464"
      opacity={0.9}
    />
    <path
      d="M 20 106 C 6 96 8 80 22 88 C 36 96 30 110 20 106"
      fill="#60a464"
      opacity={0.85}
    />
    <path
      d="M 20 66 C 6 56 8 40 22 48 C 36 56 30 70 20 66"
      fill="#60a464"
      opacity={0.85}
    />
    <path
      d="M 88 178 C 80 164 64 168 72 184 C 80 200 94 190 88 178"
      fill="#60a464"
      opacity={0.8}
    />
    <path
      d="M 126 177 C 118 163 102 167 110 183 C 118 199 132 189 126 177"
      fill="#60a464"
      opacity={0.75}
    />

    {/* Curly tendrils */}
    <path
      d="M 28 8 C 22 2 16 6 20 13 C 24 20 32 17 28 10"
      stroke="#2d5c32"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 40 168 C 34 162 28 166 32 173 C 36 180 44 177 40 168"
      stroke="#2d5c32"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 162 175 C 169 169 175 173 171 180 C 167 187 159 184 162 175"
      stroke="#2d5c32"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 26 8 C 22 -3 27 -11 23 -22"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity={0.65}
    />
    <path
      d="M 192 174 C 203 170 211 175 222 171"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity={0.65}
    />

    {/* Moss cluster */}
    <circle
      cx="14"
      cy="186"
      r="22"
      fill="#3a683a"
      opacity={0.55}
    />
    <circle
      cx="26"
      cy="192"
      r="16"
      fill="#3a683a"
      opacity={0.6}
    />
    <circle
      cx="8"
      cy="174"
      r="15"
      fill="#3a683a"
      opacity={0.58}
    />
    <circle
      cx="34"
      cy="182"
      r="13"
      fill="#4e824e"
      opacity={0.64}
    />
    <circle
      cx="18"
      cy="167"
      r="11"
      fill="#4e824e"
      opacity={0.62}
    />
    <circle
      cx="42"
      cy="192"
      r="10"
      fill="#4e824e"
      opacity={0.6}
    />
    <circle
      cx="8"
      cy="160"
      r="9"
      fill="#4e824e"
      opacity={0.58}
    />
    <circle
      cx="24"
      cy="176"
      r="12"
      fill="#2a4e2a"
      opacity={0.7}
    />
    <circle
      cx="38"
      cy="168"
      r="7"
      fill="#659865"
      opacity={0.62}
    />
    <circle
      cx="28"
      cy="162"
      r="7"
      fill="#659865"
      opacity={0.6}
    />
    <circle
      cx="44"
      cy="180"
      r="6"
      fill="#78ae78"
      opacity={0.54}
    />
    <circle
      cx="12"
      cy="154"
      r="6"
      fill="#78ae78"
      opacity={0.52}
    />
    <circle
      cx="48"
      cy="168"
      r="5"
      fill="#659865"
      opacity={0.5}
    />
    <circle
      cx="36"
      cy="156"
      r="5"
      fill="#659865"
      opacity={0.5}
    />
    <circle
      cx="50"
      cy="182"
      r="4"
      fill="#78ae78"
      opacity={0.46}
    />
    <circle
      cx="16"
      cy="148"
      r="4"
      fill="#78ae78"
      opacity={0.45}
    />
    <circle
      cx="52"
      cy="195"
      r="4"
      fill="#659865"
      opacity={0.48}
    />
  </svg>
);

// ── BOTTOM-RIGHT ──────────────────────────────────────────────────────────────
const BottomRightFoliage = ({ className }: { className: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    overflow="visible"
  >
    <path
      d="M 172 205 C 167 172 178 140 171 105 C 164 70 178 40 172 8"
      stroke="#1e3d22"
      strokeWidth="4.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 205 172 C 172 167 140 178 105 171 C 70 164 40 178 8 172"
      stroke="#1e3d22"
      strokeWidth="4.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* Right-vine branches — tips ≤55px inside from right (x≥117) */}
    {/* y=155: near outside bottom, drapes down-left */}
    <path
      d="M 171 155 C 150 162 130 160 116 170"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* y=96: shortened from x=88→118 */}
    <path
      d="M 172 96 C 150 80 132 74 118 66"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* y=48: short steep left-up */}
    <path
      d="M 171 48 C 154 36 138 30 122 22"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />

    {/* Bottom-vine branches — tips ≤55px inside from bottom (y≥117) */}
    {/* x=155: leans back right */}
    <path
      d="M 155 172 C 162 150 158 120 166 106"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    {/* x=108: shortened from y=88→106 and x=78→120 */}
    <path
      d="M 108 172 C 100 148 104 120 120 106"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* x=60: shortened from y=82→110 and x=82→116 */}
    <path
      d="M 60 171 C 56 148 64 120 116 110"
      stroke="#2d5c32"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* ── Leaves ── */}

    {/* tip (116,170) — drapes outside bottom edge (y=170≈172), large leaf */}
    <path
      d="M 116 170 C 96 156 76 164 92 186 C 108 208 126 188 116 170"
      fill="#3d7244"
    />
    <path
      d="M 116 170 L 92 186"
      stroke="#2a5030"
      strokeWidth="1.4"
      fill="none"
      opacity={0.65}
    />
    <path
      d="M 112 174 C 104 168 96 170 94 176"
      stroke="#2a5030"
      strokeWidth="0.9"
      fill="none"
      opacity={0.5}
    />

    {/* tip (118,66) — swept up from right vine, medium leaf */}
    <path
      d="M 118 66 C 100 50 78 60 94 82 C 110 104 128 82 118 66"
      fill="#4e8a54"
    />
    <path
      d="M 118 66 L 94 82"
      stroke="#2a5030"
      strokeWidth="1.2"
      fill="none"
      opacity={0.65}
    />

    {/* tip (122,22) — short steep, compact leaf */}
    <path
      d="M 122 22 C 106 8 86 14 98 32 C 110 50 128 36 122 22"
      fill="#3d7244"
    />
    <path
      d="M 122 22 L 98 32"
      stroke="#2a5030"
      strokeWidth="1"
      fill="none"
      opacity={0.65}
    />

    {/* tip (166,106) — leans back right, compact leaf opens right */}
    <path
      d="M 166 106 C 180 90 190 68 178 82 C 166 96 158 112 166 106"
      fill="#4e8a54"
    />

    {/* tip (120,106) — bottom vine steep, medium leaf */}
    <path
      d="M 120 106 C 102 90 80 100 96 122 C 112 144 130 122 120 106"
      fill="#3d7244"
    />
    <path
      d="M 120 106 L 96 122"
      stroke="#2a5030"
      strokeWidth="1.2"
      fill="none"
      opacity={0.65}
    />

    {/* tip (116,110) — dramatic arc, medium leaf */}
    <path
      d="M 116 110 C 100 94 80 104 96 124 C 112 144 126 124 116 110"
      fill="#4e8a54"
    />
    <path
      d="M 116 110 L 96 124"
      stroke="#2a5030"
      strokeWidth="1.1"
      fill="none"
      opacity={0.65}
    />

    {/* ── Outer accent leaves — ENLARGED (x>172 or y>172) ── */}
    <path
      d="M 152 165 C 160 151 174 157 168 173 C 162 189 148 181 152 165"
      fill="#60a464"
      opacity={0.92}
    />
    <path
      d="M 128 167 C 136 153 150 159 144 175 C 138 191 124 183 128 167"
      fill="#60a464"
      opacity={0.88}
    />
    <path
      d="M 178 148 C 192 136 206 144 198 162 C 190 180 176 170 178 148"
      fill="#60a464"
      opacity={0.9}
    />
    <path
      d="M 178 104 C 192 92 206 100 198 118 C 190 136 176 126 178 104"
      fill="#60a464"
      opacity={0.85}
    />
    <path
      d="M 178 60 C 192 48 206 56 198 74 C 190 92 176 82 178 60"
      fill="#60a464"
      opacity={0.8}
    />
    <path
      d="M 162 26 C 176 14 190 22 182 40 C 174 58 160 48 162 26"
      fill="#60a464"
      opacity={0.75}
    />

    {/* Curly tendril at corner */}
    <path
      d="M 162 180 C 168 175 175 179 172 186 C 169 193 161 190 162 182"
      stroke="#2d5c32"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 172 8 C 168 -4 174 -15 170 -28"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity={0.65}
    />
    <path
      d="M 8 172 C -4 168 -15 174 -28 170"
      stroke="#2d5c32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity={0.65}
    />

    {/* Sparse moss cluster */}
    <circle
      cx="186"
      cy="186"
      r="16"
      fill="#3a683a"
      opacity={0.48}
    />
    <circle
      cx="174"
      cy="192"
      r="11"
      fill="#3a683a"
      opacity={0.54}
    />
    <circle
      cx="192"
      cy="174"
      r="11"
      fill="#3a683a"
      opacity={0.52}
    />
    <circle
      cx="180"
      cy="180"
      r="10"
      fill="#2a4e2a"
      opacity={0.62}
    />
    <circle
      cx="190"
      cy="168"
      r="7"
      fill="#4e824e"
      opacity={0.56}
    />
    <circle
      cx="168"
      cy="190"
      r="7"
      fill="#4e824e"
      opacity={0.54}
    />
    <circle
      cx="186"
      cy="196"
      r="6"
      fill="#659865"
      opacity={0.5}
    />
    <circle
      cx="196"
      cy="186"
      r="5"
      fill="#78ae78"
      opacity={0.46}
    />
    <circle
      cx="174"
      cy="182"
      r="5"
      fill="#659865"
      opacity={0.48}
    />
    <circle
      cx="184"
      cy="175"
      r="4"
      fill="#78ae78"
      opacity={0.43}
    />
  </svg>
);

// ─── Main component ──────────────────────────────────────────────────────────

interface GameContentBodyProps {
  children: ReactNode;
}

const GameContentBody = ({ children }: GameContentBodyProps) => (
  <div className={styles.wrapper}>
    <div className={styles.parchment}>
      <TopLeftFoliage className={`${styles.foliage} ${styles.foliageTopLeft}`} />
      <TopRightFoliage className={`${styles.foliage} ${styles.foliageTopRight}`} />
      <BottomLeftFoliage className={`${styles.foliage} ${styles.foliageBottomLeft}`} />
      <BottomRightFoliage className={`${styles.foliage} ${styles.foliageBottomRight}`} />
      <div className={styles.content}>{children}</div>
    </div>
  </div>
);

export default GameContentBody;
