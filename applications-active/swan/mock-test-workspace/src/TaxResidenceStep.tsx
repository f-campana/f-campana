import { type SubmitEvent, useState } from "react";
import { submitTaxResidence } from "./api";
import { countries, type FieldErrors, type SubmitResult, type TaxResidenceInput } from "./types";
import { isTaxIdentificationNumberRequired, validateTaxResidenceInput } from "./validation";

const initialValues: TaxResidenceInput = {
  country: "",
  taxIdentificationNumber: "",
  acceptedTerms: false,
};

type TaxResidenceStepProps = {
  submit?: (input: TaxResidenceInput) => Promise<SubmitResult>;
};

export const TaxResidenceStep = ({ submit = submitTaxResidence }: TaxResidenceStepProps) => {
  const [values, setValues] = useState<TaxResidenceInput>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Implement touched-field tracking and feedback timing.
    const nextErrors = validateTaxResidenceInput(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submit(values);

      if (result.ok) {
        setIsSubmitted(true);
      } else {
        setSubmitError(result.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const requiredTaxId = isTaxIdentificationNumberRequired(values.country);

  return (
    <section className="form-card" aria-labelledby="tax-residence-title">
      <div className="card-header">
        <p className="eyebrow">Exercise Starter</p>
        <h2 id="tax-residence-title">Tax residence details</h2>
        <p className="helper-copy">
          Starter structure only. The core validation and feedback behavior are left for you to
          implement under timed conditions.
        </p>
      </div>

      {submitError == null ? null : (
        <div className="banner banner-error" role="alert">
          {submitError}
        </div>
      )}

      {isSubmitted ? (
        <div className="banner banner-success" role="status">
          Submission succeeded.
        </div>
      ) : null}

      <form className="stack" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={values.country}
            aria-invalid={errors.country != null}
            aria-describedby={errors.country != null ? "country-error" : undefined}
            onChange={event => {
              setValues(current => ({ ...current, country: event.currentTarget.value as TaxResidenceInput["country"] }));
            }}
          >
            <option value="">Select a country</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country == null ? null : (
            <p id="country-error" className="error-text">
              {errors.country}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="taxIdentificationNumber">
            Tax identification number
            {requiredTaxId ? <span aria-hidden="true"> *</span> : null}
          </label>
          <input
            id="taxIdentificationNumber"
            name="taxIdentificationNumber"
            type="text"
            value={values.taxIdentificationNumber}
            aria-invalid={errors.taxIdentificationNumber != null}
            aria-describedby={
              errors.taxIdentificationNumber != null ? "taxIdentificationNumber-error" : undefined
            }
            onChange={event => {
              setValues(current => ({
                ...current,
                taxIdentificationNumber: event.currentTarget.value,
              }));
            }}
          />
          <p className="hint">
            Required for FRA, DEU, ESP, and ITA. Optional for BEL and NLD.
          </p>
          {errors.taxIdentificationNumber == null ? null : (
            <p id="taxIdentificationNumber-error" className="error-text">
              {errors.taxIdentificationNumber}
            </p>
          )}
        </div>

        <div className="field checkbox-row">
          <label htmlFor="acceptedTerms" className="checkbox-label">
            <input
              id="acceptedTerms"
              name="acceptedTerms"
              type="checkbox"
              checked={values.acceptedTerms}
              aria-invalid={errors.acceptedTerms != null}
              onChange={event => {
                setValues(current => ({ ...current, acceptedTerms: event.currentTarget.checked }));
              }}
            />
            <span>I accept the terms</span>
          </label>
          {errors.acceptedTerms == null ? null : (
            <p className="error-text">{errors.acceptedTerms}</p>
          )}
        </div>

        <div className="actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Continue"}
          </button>
        </div>
      </form>
    </section>
  );
};
