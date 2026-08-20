# Typography Rules (STRICT — Do Not Modify)

The project uses **Nunito** (rounded sans-serif) as the single font for all text.

## Font Sizes — Exactly 3 Tiers

| Tier | Size | rem | Usage |
|---|---|---|---|
| **Base / Body** | 16px | `1rem` | All body text, labels, captions, small text, nav links |
| **Subheading** | 20px | `1.25rem` | h3, h4, card titles, section subtitles |
| **Heading** | 25px | `1.5625rem` | h1, h2, hero headlines, large display text |

- **Minimum size:** 16px. No element may be smaller.
- **Maximum size:** 25px. No element may be larger.
- **No intermediate sizes.** All Tailwind text utilities (`text-xs` through `text-7xl`) map to one of these three values.

## Line Heights

| Context | line-height |
|---|---|
| Body text, labels, captions | `1.4` |
| Headings (h1–h6) | `1.2` |

## Font Stack

```
--font-rounded: Nunito, Heebo, system-ui, sans-serif
--font-sans:    Nunito, Heebo, system-ui, sans-serif
--font-serif:   Nunito, Heebo, system-ui, sans-serif  (aliases to same rounded font)
```

All three CSS custom properties point to the same stack. There is **no serif font** in the project.

## Rules

1. **Changing the font family is prohibited.** Only Nunito (+ Heebo for Hebrew) may be used.
2. **Adding new font sizes is prohibited.** Only the three tiers above exist.
3. **Changing line-heights is prohibited.** 1.4 for body, 1.2 for headings.
4. **No responsive font scaling.** All sizes are fixed at their tier value.
5. **No clamp(), no fluid typography.** Sizes are static rem values.
