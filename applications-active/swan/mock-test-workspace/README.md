# Swan Mock Test Workspace

Minimal local workspace for the Swan-style frontend mock test.

## Commands

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm test
pnpm build
```

## Files

- `src/TaxResidenceStep.tsx`
  Starter component with form structure and submit wiring.
- `src/validation.ts`
  Country rules and validation entry point.
- `src/TaxResidenceStep.test.tsx`
  One passing smoke test plus `todo` cases for the actual exercise.
- `src/api.ts`
  Fake async submission API.

## Prompt

Use this alongside:

- `/Users/fabiencampana/Documents/f-campana/applications-active/swan/swan-mock-technical-test.md`

## Suggested workflow

1. Start with `validation.ts`
2. Implement touched/blur behavior in `TaxResidenceStep.tsx`
3. Turn the `todo` tests into real tests
4. Run `pnpm test && pnpm typecheck && pnpm build`
