# AGENTS.md

## Scope
Applies to the entire repository.

## Mission
Produce accurate, evidence-based career materials (CV, LinkedIn, GitHub content, application answers) without hallucination or overselling.

## Context and Source Files
Use these paths as first-line source material for current career work:

- `/Users/fabiencampana/Desktop/cv-fabien-campana.md` (master draft input)
- `/Users/fabiencampana/Desktop/cv-fabien-campana-fr-1page.md` (current FR output)
- `/Users/fabiencampana/Desktop/cv-fabien-campana-en-1page.md` (current EN output)
- `/Users/fabiencampana/Desktop/linkedin-optimization-checklist.md` (LinkedIn edit script)
- `/Users/fabiencampana/Desktop/github-optimization-checklist.md` (GitHub edit script)
- `/Users/fabiencampana/Desktop/cv-linkedin-github-validation-report.md` (cross-check status)
- `/Users/fabiencampana/Desktop/Alan Offers - Data` (target-company job analysis inputs)
- `/Users/fabiencampana/Desktop/France Travail - Profil` (public profile alignment source)
- `/Users/fabiencampana/Desktop/LinkedIn 17-02` (LinkedIn reference snapshot)

When any statement depends on these sources, cite the exact file path used.

## Non-Negotiable Rules
1. Never invent facts, metrics, dates, achievements, tools, responsibilities, or credentials.
2. Never inflate impact claims beyond available evidence.
3. If a fact is uncertain, mark it as uncertain and ask for clarification or verification.
4. Separate `verified facts` from `inferences` explicitly in analyses.
5. Prefer conservative wording over persuasive exaggeration.
6. Do not claim direct experience with technologies unless shown in source material.
7. Keep outputs ATS-friendly when creating resumes (plain text structure, no decorative formatting requirements).

## Evidence Policy
Use this order of trust:
1. User-provided primary sources (CV drafts, job descriptions, profile exports, repository metadata).
2. Public profile/API data that can be verified directly.
3. Inference based on explicit evidence.

If a source file is missing, moved, or unreadable:
- Report the exact missing path.
- Do not substitute with memory.

If sources conflict:
- Surface the conflict.
- Do not silently choose the most flattering interpretation.

## Job Fit Assessment Standard
When assessing role fit:
1. Provide fit rating (`strong`, `moderate`, `stretch`).
2. Cite concrete requirement-to-evidence matches.
3. List explicit gaps (not hidden).
4. Recommend only roles where the candidate can defend claims in interview.

## Application Writing Standard
1. Mirror the target role language, but keep claims factual.
2. Keep one claim per bullet, with clear action and outcome.
3. Avoid generic superlatives (`world-class`, `expert`, `best-in-class`) unless externally validated.
4. Prefer measurable statements only when measurement source is known.

## Interaction Standard
1. If a user asks to "step back", prioritize reasoning and verification before drafting.
2. If unsure, ask concise clarifying questions instead of guessing.
3. Be direct about risks (eligibility, years-of-experience mismatch, stack gaps).

## Practical Note
`AGENTS.md` is the primary instruction file for Codex. If additional guidance exists in `SOUL.md`, treat it as complementary values guidance, not a replacement for operational rules.
