# Swan Mock Technical Test

## Why this mock

### Verified facts

- The Swan frontend role emphasizes React, TypeScript with strict mode and advanced types, Storybook, Vitest, React Testing Library, Playwright, GraphQL collaboration, reusable component APIs, and testing quality. Source: `/Users/fabiencampana/Documents/f-campana/applications-active/swan/job-offer.md`
- Swan's public repos show real onboarding, document-collection, banking, auth, and typed routing flows rather than toy UI work. Sources:
  - `/tmp/swan-partner-frontend/clients/onboarding/src/components/SupportingDocumentCollectionFlow.tsx`
  - `/tmp/swan-partner-frontend/clients/onboarding/src/utils/routes.ts`
  - `/tmp/swan-partner-frontend/server/src/api/oauth2.ts`
- Swan's public frontend stack uses Vitest for focused logic tests and Playwright for end-to-end flows. Sources:
  - `/tmp/swan-partner-frontend/clients/banking/src/utils/spendingLimit.test.ts`
  - `/tmp/swan-partner-frontend/tests/0-individual.onboarding.ts`
  - `/tmp/swan-partner-frontend/playwright.config.ts`
- Swan's `lake` repo uses Storybook and Vitest in its normal component workflow. Sources:
  - `/tmp/swan-org/lake/package.json`
  - `/tmp/swan-org/lake/packages/lake/__stories__/TextInput.stories.tsx`
  - `/tmp/swan-org/lake/packages/shared-business/src/utils/__tests__/validation.test.ts`

### Inference

- A realistic Swan technical test is more likely to be a small React + TypeScript product task with validation and tests than an algorithm screen.
- A strong mock should exercise typed forms, UX feedback timing, async submit handling, accessibility, and tests.

## Timebox

- Target: `45-60 minutes`
- Stretch: `75 minutes` if you add polish or Storybook

## Prompt

Build a React + TypeScript onboarding step called `TaxResidenceStep`.

### Product context

This step is part of a regulated onboarding flow. A user selects their tax residence country, may need to provide a tax identification number depending on the country, and must accept terms before continuing.

### Requirements

#### Fields

- `country` select with these values:
  - `FRA`
  - `DEU`
  - `ESP`
  - `ITA`
  - `BEL`
  - `NLD`
- `taxIdentificationNumber` text input
- `acceptedTerms` checkbox

#### Validation rules

- `country` is required
- `acceptedTerms` must be checked
- `taxIdentificationNumber` is required for:
  - `FRA`
  - `DEU`
  - `ESP`
  - `ITA`
- `taxIdentificationNumber` is optional for:
  - `BEL`
  - `NLD`
- When present, `taxIdentificationNumber` must follow these format rules:
  - `FRA`: exactly 13 digits
  - `DEU`: exactly 11 digits
  - `ESP`: exactly 9 characters
  - `ITA`: exactly 16 characters
  - `BEL`: exactly 11 digits
  - `NLD`: exactly 9 digits

#### UX requirements

- Do not show field errors before the field has been interacted with
- After a field is blurred once, keep its validation feedback updated as the user edits
- If the user changes country, tax ID validation must immediately follow the new country's rules
- Disable submit while the async request is pending
- Show a top-level error message if submission fails
- Preserve entered values when submission fails

#### Accessibility requirements

- Labels must be associated with the correct controls
- Error messages must be exposed accessibly
- The submit button must have a clear accessible name

#### Testing requirements

Add tests for at least:

- valid submission
- required fields
- country-specific tax ID rule changes
- loading state during submit
- failed submission

### Optional stretch

- Add a Storybook story
- Extract country validation rules into a clean config
- Add a small success state

## Suggested File Structure

```text
src/
  api.ts
  types.ts
  validation.ts
  TaxResidenceStep.tsx
  TaxResidenceStep.test.tsx
  TaxResidenceStep.stories.tsx   # optional
```

## Starter Types

Use these exact starter interfaces if you want to simulate a real assignment quickly:

```ts
export type Country = "FRA" | "DEU" | "ESP" | "ITA" | "BEL" | "NLD";

export type TaxResidenceInput = {
  country: Country | "";
  taxIdentificationNumber: string;
  acceptedTerms: boolean;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; message: string };
```

## Starter API

You can use this fake API:

```ts
import type { TaxResidenceInput, SubmitResult } from "./types";

export const submitTaxResidence = async (
  input: TaxResidenceInput,
): Promise<SubmitResult> => {
  await new Promise(resolve => setTimeout(resolve, 600));

  if (input.taxIdentificationNumber.trim().toUpperCase() === "FAIL") {
    return { ok: false, message: "Submission failed. Please try again." };
  }

  return { ok: true };
};
```

## Expected Senior-Level Choices

- Use explicit types for form data and validation
- Keep validation logic readable and separately testable
- Avoid over-abstracting
- Handle async state and errors cleanly
- Write tests that verify behavior, not implementation details

## What I Would Evaluate As Interviewer

### Correctness

- Are the validation rules implemented correctly?
- Does changing country re-evaluate tax ID rules correctly?
- Does loading and failure handling behave correctly?

### Type quality

- Is the code clearly typed?
- Are the data structures easy to understand?
- Is there unnecessary `any` or weak typing?

### UX judgment

- Is feedback timing reasonable?
- Does the form avoid shouting errors too early?
- Are disabled/loading states clear?

### Accessibility

- Can the form be used and understood with accessible labels and error messaging?

### Test quality

- Do tests cover the main business risks?
- Are they resilient and behavior-focused?

### Engineering judgment

- Is the implementation pragmatic?
- Is the code easy to review and extend?

## Likely Follow-Up Questions In A Live Session

- Why did you structure validation that way?
- What would you change with more time?
- Would you extract a reusable field or keep it local for now?
- How would you adapt this if rules were fetched from the backend?
- How would you integrate this into a larger onboarding flow?

## Strong Debrief Answer

```text
I optimized first for correctness, readability, and feedback timing because onboarding flows are sensitive: I’d rather keep the implementation direct and reliable than abstract too early. I kept validation logic separate so the business rules stay testable. With more time, I’d probably extract the country rules into a more declarative configuration and add a Storybook story for state coverage.
```

## Submission Checklist

- Component implemented
- Validation extracted cleanly
- Tests pass
- Loading and failure states handled
- No obvious typing holes
- No premature abstraction

## How to use this with Codex

When you finish your solution, ask:

`Review my solution to the Swan mock technical test like a senior interviewer. Prioritize bugs, regressions, missing tests, weak typing, and poor tradeoffs.`
