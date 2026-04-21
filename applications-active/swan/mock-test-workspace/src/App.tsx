import { TaxResidenceStep } from "./TaxResidenceStep";

export const App = () => {
  return (
    <main className="app-shell">
      <section className="intro-card">
        <p className="eyebrow">Swan Mock Technical Test</p>
        <h1>Tax Residence Step</h1>
        <p className="intro-copy">
          This workspace is intentionally light but realistic: React, strict TypeScript, Vitest,
          React Testing Library, and starter files for the onboarding exercise.
        </p>
      </section>

      <TaxResidenceStep />
    </main>
  );
};

