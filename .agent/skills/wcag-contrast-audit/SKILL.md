---
name: wcag-contrast-audit
description: >
  Performs a professional WCAG 2.1 AA/AAA visual accessibility audit on UI code.
  Analyzes HTML, CSS, Tailwind classes, and design tokens to calculate contrast ratios,
  identify violations, and propose exact compliant color values — without applying
  any changes until the user gives explicit confirmation.
triggers:
  - "audit accessibility"
  - "check contrast"
  - "review UI accessibility"
  - "WCAG compliance"
  - "legibility review"
  - "color contrast"
  - "check readability"
  - "accessibility review"
---

# WCAG 2.1 Contrast Audit — Skill Instructions

## Activation
Activate this skill whenever the user requests any of the following:
UI review, contrast check, accessibility audit, legibility analysis, WCAG compliance,
color token review, or design system accessibility check.

---

## Phase 1 — Inventory & Extraction

Scan the provided files (HTML, JSX/TSX, Astro, CSS, Tailwind config, design tokens) and extract **every foreground/background color pair** in use:

1. **Tailwind classes** → resolve via `tailwind.config` and the Tailwind default palette.
2. **CSS custom properties** → trace `var(--token)` back to its `:root` or `@theme` definition.
3. **Inline styles** → extract `color`, `background-color`, `background` values.
4. **Opacity modifiers** → account for `text-white/60`, `bg-black/40`, etc. by blending against the actual background.
5. **Gradient backgrounds** → flag as "complex background — manual check required."

For each pair, record:
```
ID       | Element / Selector          | Foreground  | Background  | Context
-------- | --------------------------- | ----------- | ----------- | -------
CP-001   | <p class="text-white/60">   | #ffffff @ 60% opacity | #000000 | Body text
CP-002   | .btn-primary (text-white)   | #ffffff     | #2563eb     | UI Component
```

---

## Phase 2 — Contrast Ratio Calculation

Use the **WCAG relative luminance formula**:

```
L = 0.2126 × R_lin + 0.7152 × G_lin + 0.0722 × B_lin

where:
  C_lin = C_sRGB / 255
  if C_lin <= 0.04045 → C_lin / 12.92
  else               → ((C_lin + 0.055) / 1.055) ^ 2.4

Contrast Ratio = (L_lighter + 0.05) / (L_darker + 0.05)
```

For **opacity-blended colors**, compute the effective hex by blending foreground over background before calculating luminance:
```
R_eff = α × R_fg + (1 − α) × R_bg   (repeat for G, B)
```

---

## Phase 3 — WCAG 2.1 Classification

Apply the following thresholds to every color pair:

### Text Categories
| Category           | Definition                          | AA minimum | AAA minimum |
| ------------------ | ----------------------------------- | ---------- | ----------- |
| Normal text        | < 18pt (24px) or < 14pt bold (18.67px bold) | **4.5:1** | **7:1** |
| Large text         | ≥ 18pt (24px) OR ≥ 14pt bold (18.67px bold) | **3:1**   | **4.5:1** |
| UI components      | Buttons, inputs, focus indicators, icons with meaning | **3:1** | — |
| Decorative         | Icons/graphics with no informational value | exempt | exempt |
| Disabled elements  | Visually disabled states            | exempt     | exempt |

### Status Flags
- `PASS-AAA` — meets 7:1 (text) or above
- `PASS-AA` — meets minimum AA threshold
- `FAIL-AA` — below AA minimum (critical)
- `FAIL-AAA` — meets AA but not AAA (advisory)
- `MANUAL` — gradient, image, or complex background; requires human verification

---

## Phase 4 — Violation Report

For every `FAIL-AA` or `FAIL-AAA`, output a structured violation block:

```
┌─────────────────────────────────────────────────────────┐
│ VIOLATION — CP-001                                       │
├─────────────────────────────────────────────────────────┤
│ Element:    <p class="text-white/60 font-sans">          │
│ Context:    Body text (normal size)                      │
│ WCAG Rule:  1.4.3 Contrast (Minimum) — Level AA         │
│                                                          │
│ Foreground: rgba(255,255,255,0.60) → effective #999999  │
│ Background: #000000                                      │
│ Ratio:      3.95:1  ✗  (required ≥ 4.5:1)              │
├─────────────────────────────────────────────────────────┤
│ WCAG Criterion:  1.4.3 (AA) — FAIL                      │
│                  1.4.6 (AAA) — FAIL                      │
├─────────────────────────────────────────────────────────┤
│ FIX OPTIONS (choose one):                                │
│  A) Raise opacity:  text-white/70  → #b3b3b3 → 7.0:1  ✓ AAA │
│  B) Use solid color: text-[#a3a3a3] → 4.6:1            ✓ AA  │
│  C) Use solid color: text-[#8a8a8a] → 4.5:1            ✓ AA (minimum) │
│                                                          │
│ Recommended: Option A — keeps opacity pattern, hits AAA  │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 5 — Additional WCAG Checks

Beyond contrast, flag the following if found in the provided code:

| Check | WCAG Criterion | Look for |
| ----- | -------------- | -------- |
| Focus indicator | 2.4.7 (AA) / 2.4.11 (AA 2.2) | `outline:none` or `focus:outline-none` without custom replacement |
| Text resize | 1.4.4 (AA) | Font sizes in `px` that would not scale with user settings |
| Non-text contrast | 1.4.11 (AA) | Icon-only buttons, form borders, custom checkboxes < 3:1 |
| Color as only differentiator | 1.4.1 (A) | Links distinguished only by color, status indicators with no icon/label |
| Text spacing override | 1.4.12 (AA) | Hardcoded `line-height`, `letter-spacing`, or `word-spacing` that may break layout |

---

## Phase 6 — Final Compliance Checklist

After the full analysis, output this checklist:

```
WCAG 2.1 COMPLIANCE CHECKLIST
══════════════════════════════════════════════════════
[ ] 1.4.1  Use of Color (A)          — color not sole differentiator
[ ] 1.4.3  Contrast Minimum (AA)     — all normal text ≥ 4.5:1
[ ] 1.4.4  Resize Text (AA)          — text scalable to 200%
[ ] 1.4.6  Contrast Enhanced (AAA)   — all normal text ≥ 7:1
[ ] 1.4.11 Non-text Contrast (AA)    — UI components ≥ 3:1
[ ] 1.4.12 Text Spacing (AA)         — no layout break on spacing override
[ ] 2.4.7  Focus Visible (AA)        — keyboard focus indicator visible
[ ] 2.4.11 Focus Appearance (AA 2.2) — focus indicator ≥ 3:1 contrast

SUMMARY:  X passed · Y failed (AA) · Z advisory (AAA)
OVERALL:  [ ] AA COMPLIANT   [ ] AAA COMPLIANT
══════════════════════════════════════════════════════
```

---

## Phase 7 — Confirmation Gate

**NEVER apply any code changes automatically.**

After delivering the full report, end with:

```
──────────────────────────────────────────────────────────
AUDIT COMPLETE — NO CHANGES APPLIED YET

Found: [N] AA violations · [M] AAA advisories · [K] manual checks

To apply fixes, reply with one of:
  • "apply all AA fixes"       → fix all FAIL-AA violations
  • "apply fix CP-001"         → fix a single violation
  • "apply AAA fixes too"      → fix both AA and AAA
  • "show me the diff first"   → preview changes before applying
──────────────────────────────────────────────────────────
```

---

## Scope Handling

| Input type | How to handle |
| ---------- | ------------- |
| Single component file | Audit that file only |
| Full page (`index.astro`, etc.) | Audit all visible text + interactive elements |
| Design token file (`global.css`, `tokens.json`) | Audit all token pairs; flag unused tokens as advisory |
| Tailwind config only | Extract all color scales and report theoretical contrast pairs |
| "check everything" | Audit all files in `src/` recursively |

---

## Restrictions
- Do not assume `white` means `#ffffff` without verifying the actual computed value (opacity, blending).
- Do not mark any element `PASS` without computing the actual effective color after opacity and blending.
- Do not apply fixes in batch silently — always present the violation report first.
- When gradients are present, flag as `MANUAL` and provide the darkest/lightest stops as a worst-case estimate.
- Maintain the existing design language when proposing fixes (e.g., prefer opacity adjustments over new hex values when the codebase uses opacity utilities).
