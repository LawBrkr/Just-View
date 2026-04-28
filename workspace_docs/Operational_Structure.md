# Operational Structure

**Generated:** April 2, 2026
**Version:** 1.0
**Scope:** Logging conventions, date standards, and digital presence registry for both Paws Club and Signalia

---

## Part 1: Date & Logging Standards

### Date Format Convention

All logs, file names, commit messages, sprint records, and document headers must follow **ISO 8601** formatting:

```
YYYY-MM-DD
```

Examples:
- `2026-04-02` — correct
- `02/04/26` — not acceptable
- `April 2nd, 2026` — acceptable only in public-facing prose, never in file names or logs

### Timestamp Format (with time)

When time precision is required (logs, agent outputs, automation records):

```
YYYY-MM-DD HH:MM:SS UTC
```

Example: `2026-04-02 14:32:07 UTC`

### File Naming Convention

```
YYYY-MM-DD_[brand]_[document-type]_[version].md
```

Examples:
- `2026-04-02_signalia_sprint-notes_v1.md`
- `2026-04-02_pawsclub_service-update_v2.md`
- `2026-04-02_shared_mcp-inventory_v1.md`

Brand tokens: `signalia` | `pawsclub` | `shared`

### Sprint Logging Structure

Each sprint log file should open with this header block:

```markdown
# Sprint [N] — [Sprint Name]
**Date:** YYYY-MM-DD
**Brand:** [Signalia | Paws Club | Shared]
**Sprint:** [Sprint name or theme]
**Status:** [Planning | Active | Complete | Blocked]
**Owner:** [Lead name or agent]
```

### Log Directory Structure

```
workspace_docs/
├── logs/
│   ├── YYYY-MM-DD_signalia_[type].md
│   ├── YYYY-MM-DD_pawsclub_[type].md
│   └── YYYY-MM-DD_shared_[type].md
├── sprints/
│   ├── signalia/
│   └── pawsclub/
└── decisions/
    ├── signalia/
    └── pawsclub/
```

### Agent Session Logging

When a Claude session produces significant output (new files, system changes, strategy decisions), log the session with:

```markdown
## Session Log
- **Date:** YYYY-MM-DD
- **Model:** claude-sonnet-4-6 (or active model)
- **Session Type:** [Planning | Implementation | Review | Audit]
- **Brand Context:** [Signalia | Paws Club | Both]
- **Key Outputs:** [List of files created/modified]
- **Decisions Made:** [Material choices made during session]
- **Open Questions:** [Items flagged for next session]
```

---

## Part 2: Digital Presence Registry

> **Note to agents:** Social media handles listed below should be verified by the human operator before use in any published content or outreach. Claude does not maintain live social profile data. This registry documents the intended/known handles as of generation date.

---

### Paws Club

| Platform | Handle / URL | Status | Notes |
|---|---|---|---|
| Instagram | `@pawsclub` (intended) | To verify | Primary visual channel; editorial photography focus |
| TikTok | `@pawsclub` (intended) | To verify | Short-form video; Host Dog content, grooming sessions |
| Facebook | Paws Club (Page) | To verify | Secondary; community and parent communication |
| Google Business | Paws Club | To verify | Review management and local SEO priority |
| Website | TBD | In development | Built on Next.js (PawsClub-v2) |
| Cal.com | Embedded booking | Active (dev) | Service scheduling via `@calcom/embed-react` |

**Content Tone for Social (Paws Club):**
Warm, unhurried, visual-first. No urgency language. Serif typography overlays where possible. Earth-tone color grading on all photos. Host Dog appearances should be regular, not promotional — they are story, not marketing.

---

### Signalia

| Platform | Handle / URL | Status | Notes |
|---|---|---|---|
| LinkedIn | Signalia (Company Page) | To verify | Primary B2B channel; case studies, engineering insights |
| X (Twitter) | `@signalia` (intended) | To verify | Technical positioning; automation and AI agent content |
| GitHub | `@signalia` (intended) | To verify | Open source signals, tooling, public repos |
| Website | `signalia-landing` project | Active (dev) | Vercel deployment; dark-mode hero sprint active |
| Vercel | Project: `signalia-landing` | Active | Production deployment pipeline |
| Email | TBD | To configure | Outbound for business development |

**Content Tone for Social (Signalia):**
Expert, terse, signal-dense. No filler content. Every post should contain a real insight, a result, or a demonstration. Think: a short thread that teaches something specific, or a before/after that shows measurable impact. No motivational quotes. No vague "we're growing" updates.

---

## Part 3: Operational Roles & Decision Ownership

### Decision Classification

| Decision Type | Who Decides | Documentation Required |
|---|---|---|
| Brand copy / public messaging | Human operator | Brand review before publish |
| Code architecture | Signalia lead dev (Armando) | Logged in sprint notes |
| Agent configurations | Claude + human sign-off | Logged in session log |
| MCP integrations | Human operator | Logged in MCP inventory |
| Service pricing | Human operator | Not logged by Claude |
| Social media publishing | Human operator | Content approved before post |

### Agent Boundaries

Claude operates as an executor and strategist within sessions. Claude does not:

- Publish content to live channels autonomously
- Send outbound communications without explicit session instruction
- Make pricing or contract decisions
- Retain client or prospect data beyond the session workspace

---

## Part 4: Cross-Brand Separation Rules

Paws Club and Signalia are distinct entities. The following must never be mixed:

**Brand voice:** Never use Signalia's direct/technical register in Paws Club copy. Never use Paws Club's warm/empathetic register in Signalia deliverables.

**File naming:** Always prefix files with the brand token (`pawsclub_` or `signalia_`). Shared infrastructure files use `shared_`.

**Tone audit trigger:** If a draft for either brand uses language that could belong to the other brand, flag it for review before delivery.

| Paws Club signals | Signalia signals |
|---|---|
| "sanctuary", "care", "belonging" | "ROI", "shipped", "measurable" |
| "know your dog's name" | "no retainers by default" |
| Serif, earth tones, silence | Mono font, dark gradient, precision |
| Empathy before information | Information before emotion |
| Long sentences, considered pace | Short sentences, no hedging |

---

*Operational structure is a living document. Update when: new platforms are added, sprint conventions change, or brand handles are confirmed.*
