---
version: alpha
name: TranscribeFlow
description: Clean dark SaaS for audio transcription — Linear-inspired precision meets productivity tooling.
colors:
  page-bg: "#08090a"
  panel-bg: "#0f1011"
  surface-bg: "#191a1b"
  surface-hover: "#28282c"
  text-primary: "#f7f8f8"
  text-secondary: "#d0d6e0"
  text-tertiary: "#8a8f98"
  text-quaternary: "#62666d"
  brand-accent: "#5e6ad2"
  brand-accent-hover: "#828fff"
  brand-violet: "#7170ff"
  border-default: "rgba(255,255,255,0.08)"
  border-subtle: "rgba(255,255,255,0.05)"
  success-green: "#10b981"
  error-red: "#ef4444"
  warning-amber: "#f59e0b"
typography:
  display:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: 510
    lineHeight: 1.00
    letterSpacing: "-1.056px"
  heading-1:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 510
    lineHeight: 1.13
    letterSpacing: "-0.704px"
  heading-2:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 510
    lineHeight: 1.33
    letterSpacing: "-0.288px"
  heading-3:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 590
    lineHeight: 1.33
    letterSpacing: "-0.24px"
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.50
  body-sm:
    fontFamily: Inter
    fontSize: 0.938rem
    fontWeight: 400
    lineHeight: 1.60
  body-emphasis:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 510
    lineHeight: 1.50
  caption:
    fontFamily: Inter
    fontSize: 0.813rem
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: "-0.13px"
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 510
    lineHeight: 1.40
  mono:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.50
  mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.40
rounded:
  micro: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px
components:
  button-primary:
    backgroundColor: "{colors.brand-accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 8px 16px
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.brand-accent-hover}"
  button-ghost:
    backgroundColor: "rgba(255,255,255,0.02)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    border: "1px solid {components.button-ghost.border}"
    padding: 8px 16px
    typography: "{typography.label}"
  button-ghost-border:
    defaultValue: "{colors.border-default}"
  card:
    backgroundColor: "rgba(255,255,255,0.02)"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border-default}"
  input:
    backgroundColor: "rgba(255,255,255,0.02)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border-default}"
    padding: 12px 14px
    typography: "{typography.body}"
  upload-zone:
    backgroundColor: "rgba(255,255,255,0.02)"
    borderStyle: "dashed"
    borderColor: "{colors.border-default}"
    rounded: "{rounded.xl}"
    padding: 48px
  timestamp-line:
    backgroundColor: "rgba(255,255,255,0.02)"
    rounded: "{rounded.sm}"
    padding: 6px 10px
    typography: "{typography.mono}"
  nav-link:
    typography: "{typography.caption}"
    textColor: "{colors.text-secondary}"
  nav-link-active:
    textColor: "{colors.text-primary}"
  badge:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    border: "1px solid #23252a"
    padding: 0px 10px
    typography: "{typography.label}"
  badge-success:
    backgroundColor: "{colors.success-green}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: 0px 10px
    typography: "{typography.label}"
---

## Overview

**TranscribeFlow** is a free, private audio transcription SaaS app. Users upload audio files and get timestamped transcripts in the `[MM:SS] text` format — completely free, running locally with no data leaving their machine.

The design language is inspired by Linear: a near-black dark canvas where content emerges through precise luminance steps, transparent surfaces, and a single brand accent color (indigo-violet). The interface is clean, tool-focused, and prioritizes legibility of the transcript above all else.

## Colors

- **Page BG (#08090a):** Near-black canvas — the deepest layer. Used for the page body.
- **Panel BG (#0f1011):** Sidebars, nav bars, secondary panels.
- **Surface (#191a1b):** Cards, dropdowns, elevated elements.
- **Primary Text (#f7f8f8):** Near-white — the default for important content.
- **Secondary (#d0d6e0):** Silver-gray for body text and descriptions.
- **Tertiary (#8a8f98):** Muted for metadata, placeholders.
- **Quaternary (#62666d):** Very subdued — timestamps, disabled states.
- **Brand (#5e6ad2):** Indigo — primary CTAs and interactive elements.
- **Brand Hover (#828fff):** Lighter indigo for hover states.
- **Borders:** Always semi-transparent white (`rgba(255,255,255,0.08)` default, `0.05` subtle).

All borders are semi-transparent white, not solid colors. This is key to the dark SaaS look.

## Typography

Inter is the sole UI typeface with JetBrains Mono for timestamp and transcript text.

- **Display (48px/510):** Hero headlines. Tight letter-spacing (-1.056px).
- **H1 (32px/510):** Section titles. -0.704px tracking.
- **H3 (20px/590):** Card headers, feature labels.
- **Body (16px/400):** Standard reading text.
- **Body-sm (15px/400):** Secondary body, descriptions.
- **Caption (13px/400):** Small metadata, sub-labels.
- **Label (12px/510):** Buttons, badge text, small UI labels.
- **Mono (14px/400):** Transcript text, timestamps, code output.
- **Mono-sm (12px/400):** Small mono for micro-timestamps.

## Components

### Upload Zone

The upload area is a dashed-border zone at the center of the app's hero area. On drag-over, the border shifts to brand indigo and the background opacity increases. Accepts MP3, WAV, M4A, FLAC, OGG, MP4.

- BG: `rgba(255,255,255,0.02)`
- Border: `2px dashed rgba(255,255,255,0.08)`
- Radius: 12px
- Padding: 48px
- Drag active: border → `#5e6ad2`, bg → `rgba(94,106,210,0.05)`

### Transcription Result

The output is displayed as a scrollable list of timestamped lines.

- Each line: `[MM:SS] text` in JetBrains Mono 14px
- Line BG: `rgba(255,255,255,0.02)`
- Padding: 6px 10px
- Timestamp color: `#7170ff` (brand violet)
- Text color: `#f7f8f8`

### History Panel

A sidebar showing previous transcriptions with file name, date, and duration.

- List items with hover state
- Click to reload a previous transcription
- Clear history button at the bottom

## Elevation & Depth

On dark backgrounds, elevation is communicated through background luminance stepping (white opacity) rather than drop shadows:

- Level 0: `#08090a` (page)
- Level 1: `#0f1011` (panels)
- Level 2: `rgba(255,255,255,0.02)` (cards)
- Level 3: `#191a1b` (elevated surfaces)
- Overlay: `rgba(0,0,0,0.85)`

## Do's and Don'ts

### Do
- Use Inter for UI, JetBrains Mono for transcript text
- Keep backgrounds near-black with subtle luminance steps
- Use semi-transparent white borders, never solid dark borders
- Reserve brand indigo for CTAs and interactive elements
- Apply negative letter-spacing at display sizes
- Use `#f7f8f8` for primary text (not pure #fff)

### Don't
- Don't use pure white (#fff) as text — it strains eyes on dark backgrounds
- Don't use solid colored button backgrounds — use translucent white
- Don't overuse the brand accent — it's for actions only
- Don't use drop shadows for depth — use background luminance
- Don't use warm colors in the UI chrome — cool gray + indigo only
