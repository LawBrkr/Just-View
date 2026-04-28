# MCP & Skills Inventory

**Generated:** April 2, 2026
**Version:** 1.0
**Scope:** Complete reference of active MCP server integrations and Claude skills for future agent use

---

## Overview

This document serves as the authoritative technical reference for the AI tooling layer available across Signalia's Claude-powered workspace. It enumerates all active Model Context Protocol (MCP) servers (sourced from plugin `.mcp.json` configurations) and all locally installed skills. Future agents should treat this as a capability registry.

---

## Part 1: MCP Server Integrations

MCP servers provide live, tool-use-accessible connections to external business systems. Servers below were discovered from the `.remote-plugins/` directory configurations as of the generation date.

### Communication & Collaboration

| Server | Type | Primary Use |
|---|---|---|
| `slack` | HTTP | Team messaging, notifications, channel search |
| `gmail` | HTTP | Email read, search, draft creation, thread management |
| `google-calendar` | HTTP | Calendar events, scheduling, availability |
| `ms365` | HTTP | Microsoft 365 suite (Outlook, Teams, OneDrive) |
| `fireflies` | HTTP | Meeting transcription and AI note retrieval |
| `granola` | HTTP | AI meeting notes and summaries |

### Project & Work Management

| Server | Type | Primary Use |
|---|---|---|
| `notion` | HTTP | Document storage, wiki, project tracking |
| `atlassian` | HTTP | Jira (issue tracking), Confluence (docs) |
| `asana` | HTTP | Task and project management |
| `linear` | HTTP | Engineering issue tracking and sprint management |
| `monday` | HTTP | No-code project board management |
| `clickup` | HTTP | Task management and docs |
| `servicenow` | HTTP | IT service management and ticketing |

### Sales & CRM

| Server | Type | Primary Use |
|---|---|---|
| `hubspot` | HTTP | CRM: contacts, deals, pipeline, sequences |
| `close` | HTTP | CRM: sales pipeline, calling, email sequences |
| `apollo` | HTTP | Prospecting, lead enrichment, sequence enrollment |
| `clay` | HTTP | Data enrichment and outbound workflow automation |
| `zoominfo` | HTTP | B2B contact and company intelligence |
| `outreach` | HTTP | Sales engagement and sequence management |

### Design & Content

| Server | Type | Primary Use |
|---|---|---|
| `figma` | HTTP | Design file access, component inspection |
| `canva` | HTTP | Graphic design and template creation |

### Analytics & Intelligence

| Server | Type | Primary Use |
|---|---|---|
| `amplitude` | HTTP | Product analytics and event tracking |
| `pendo` | HTTP | Product analytics and user guidance |
| `similarweb` | HTTP | Web traffic and competitive intelligence |
| `ahrefs` | HTTP | SEO data: keywords, backlinks, content gaps |
| `intercom` | HTTP | Customer messaging and support data |
| `klaviyo` | HTTP | Email/SMS marketing analytics and automation |

### Data Platforms

| Server | Type | Primary Use |
|---|---|---|
| `snowflake` | HTTP | Cloud data warehouse querying |
| `databricks` | HTTP | Data engineering and ML workflows |
| `bigquery` | HTTP | Google Cloud data warehouse querying |

### Document & Storage

| Server | Type | Primary Use |
|---|---|---|
| `box` | HTTP | File storage and enterprise document management |
| `egnyte` | HTTP | Secure file sharing and storage |
| `microsoft-365` | HTTP | SharePoint, OneDrive, Office document access |

### Legal & Compliance

| Server | Type | Primary Use |
|---|---|---|
| `docusign` | HTTP | Electronic signature workflows |

### Native / Platform Tools

| Server | Type | Primary Use |
|---|---|---|
| `gmail` (native) | MCP | Gmail: search, read, draft, label management |
| `google-drive` | MCP | Drive file search and fetch |
| `vercel` | MCP | Deployments, build logs, runtime logs, project info |
| `Claude in Chrome` | MCP | Browser automation and web interaction |

---

## Part 2: Active Skills Inventory

Skills are locally installed prompt-extension modules under `~/.claude/skills/` (PawsClub-v2 and Signalia workspace). They provide specialized instructions and best practices for specific task types.

### Core Document Creation Skills

| Skill | Trigger | Primary Function |
|---|---|---|
| `docx` | `.docx`, Word document requests | Creates/edits Microsoft Word documents using python-docx; handles formatting, TOC, tables, letterheads |
| `pptx` | `.pptx`, slide deck, presentation | Creates/edits PowerPoint presentations; handles layouts, speaker notes, master slides |
| `xlsx` | `.xlsx`, spreadsheet, budget | Creates/edits Excel files; handles formulas, charts, data tables, conditional formatting |
| `pdf` | `.pdf`, extract, merge, form | PDF creation, text extraction, form filling, merge/split operations |

### Engineering & Quality Skills

| Skill | Trigger | Primary Function |
|---|---|---|
| `i18n-enforcer` | New UI text, component strings, `useTranslations` | Enforces next-intl i18n discipline in Next.js App Router; routes all UI text through translation dictionaries; prevents hardcoded strings |
| `qa-security-validator` | Code review, testing, security | Validates code for functional correctness and security; prevents marking tasks complete without real tests |
| `name-web-auditor-pro` | Audit, Lighthouse, SEO, performance | Expert Next.js/Vercel/SEO/mobile performance auditor; analyzes build outputs and runtime metrics |

### Project & Context Management Skills

| Skill | Trigger | Primary Function |
|---|---|---|
| `context-architect` | Long sessions, context rot, structured notes | Manages Claude's attention budget; maintains structured session notes to prevent context degradation |
| `project-initializer` | New project setup, onboarding | Creates breadcrumb trails for long sessions; prevents one-shot failures by building context incrementally |
| `workspace-sync` | Clone, sync, prepare project | Standardizes how Claude clones and prepares project workspaces for new sessions |
| `universal-doc-sync` | Post-code-change | Automatically identifies and updates README.md and technical docs after code changes to prevent documentation drift |
| `organizador-infraestructuraskill` | Infrastructure audit, workspace cleanup | Curates and organizes the collective workspace "brain"; manages context rot prevention at the infra level |

### Marketing & Brand Skills

| Skill | Trigger | Primary Function |
|---|---|---|
| `marketing-brand-agent` | Marketing strategy, branding, naming, content, social | Full-spectrum marketing and brand agent: strategy, identity, personas, content calendars, campaign planning, SEO/SEM, copy |
| `mcp-efficiency` | MCP interactions, code mode | Reduces token cost of MCP server interactions by ~98% through structured "Code Mode" protocols |

### Scheduling Skills

| Skill | Trigger | Primary Function |
|---|---|---|
| `schedule` | Scheduled task, recurring job, automation trigger | Creates and manages scheduled tasks that run on demand or on defined intervals |

### Skill Development Skills

| Skill | Trigger | Primary Function |
|---|---|---|
| `skill-creator` | Create skill, modify skill, eval skill | Creates new skills from scratch, modifies existing skills, runs evals and benchmarks, optimizes skill descriptions for trigger accuracy |

---

## Part 3: Plugin-Bundled Skills

These skills are delivered via remote plugins and extend Claude's domain expertise.

### Brand Voice Plugin

| Skill | Function |
|---|---|
| `brand-voice:guideline-generation` | Generates brand voice guidelines from source documents, transcripts, and discovery reports |
| `brand-voice:brand-voice-enforcement` | Applies brand guidelines to content creation (emails, proposals, posts, decks) |
| `brand-voice:discover-brand` | Autonomously discovers brand materials across Notion, Confluence, Google Drive, Box, Figma, Gong |

### Sales Plugin

| Skill | Function |
|---|---|
| `sales:account-research` | Web + CRM research on target company or person |
| `sales:call-prep` | Pre-call briefing with account context and agenda |
| `sales:call-summary` | Post-call note processing → action items + follow-up email |
| `sales:draft-outreach` | Personalized cold outreach drafting |
| `sales:competitive-intelligence` | Competitor research → interactive HTML battlecard |
| `sales:pipeline-review` | Pipeline health analysis with risk flags and weekly priorities |
| `sales:forecast` | Weighted sales forecast with best/likely/worst scenarios |
| `sales:daily-briefing` | Morning sales briefing from calendar, CRM, and email |
| `sales:create-an-asset` | Generates tailored sales assets (landing pages, decks, one-pagers) |

### Marketing Plugin

| Skill | Function |
|---|---|
| `marketing:campaign-plan` | Full campaign brief with objectives, audience, channel strategy, and content calendar |
| `marketing:content-creation` | Multi-channel content drafting (blog, social, email, landing page, PR) |
| `marketing:email-sequence` | Multi-email drip sequences with branching logic and timing |
| `marketing:seo-audit` | Keyword research, on-page analysis, competitor comparison, action plan |
| `marketing:competitive-brief` | Positioning and messaging competitive analysis |
| `marketing:brand-review` | Content validation against brand voice and messaging pillars |
| `marketing:performance-report` | Marketing metrics report with trend analysis and recommendations |

### Operations Plugin

| Skill | Function |
|---|---|
| `operations:process-doc` | Business process documentation with flowcharts, RACI, and SOPs |
| `operations:process-optimization` | Bottleneck identification and workflow improvement |
| `operations:risk-assessment` | Risk register creation and mitigation planning |
| `operations:change-request` | Change management request with impact analysis and rollback plan |
| `operations:runbook` | Operational runbook creation for repeatable procedures |
| `operations:status-report` | Status report with KPIs, risks, and action items |
| `operations:capacity-plan` | Resource capacity and utilization forecasting |
| `operations:compliance-tracking` | Compliance requirement tracking and audit readiness |
| `operations:vendor-review` | Vendor evaluation with cost analysis and recommendation |

### Product Management Plugin

| Skill | Function |
|---|---|
| `product-management:write-spec` | Feature spec and PRD from problem statement |
| `product-management:sprint-planning` | Sprint scope, capacity planning, and goal setting |
| `product-management:roadmap-update` | Roadmap prioritization and timeline management |
| `product-management:metrics-review` | Product metrics analysis with insights and recommendations |
| `product-management:stakeholder-update` | Stakeholder status updates tailored to audience |
| `product-management:synthesize-research` | User research synthesis into themes and recommendations |
| `product-management:competitive-brief` | Competitive analysis for product strategy |

### Additional Domain Plugins

| Plugin | Skills |
|---|---|
| **Design** | `design-critique`, `design-handoff`, `design-system`, `accessibility-review`, `user-research`, `research-synthesis`, `ux-copy` |
| **Legal** | `review-contract`, `triage-nda`, `compliance-check`, `legal-risk-assessment`, `brief`, `meeting-briefing`, `legal-response`, `signature-request`, `vendor-check` |
| **Finance** | `financial-statements`, `journal-entry`, `reconciliation`, `variance-analysis`, `close-management`, `sox-testing`, `audit-support` |
| **Apollo** | `prospect`, `enrich-lead`, `sequence-load` |
| **Productivity** | `task-management`, `memory-management`, `start`, `update` |
| **Cowork Plugin Management** | `create-cowork-plugin`, `cowork-plugin-customizer` |

---

## Part 4: Agent Usage Notes

**Skill selection priority:** Always read the skill's `SKILL.md` file before executing any file-creation task. Skills contain tested patterns from prior iterations.

**MCP efficiency:** When making multiple MCP calls in a session, activate `mcp-efficiency` to operate in Code Mode and reduce token consumption.

**Context management:** For sessions exceeding 10 tool calls or 30+ minutes, activate `context-architect` to maintain structured notes and prevent context rot.

**i18n discipline:** Any session touching PawsClub-v2 or Signalia-landing UI components must activate `i18n-enforcer` before writing or modifying `.tsx` files that contain user-facing text.

---

*This document is auto-generated from live plugin configuration. Re-run generation after adding new plugins or skills.*
