import type { Country, FieldErrors, TaxResidenceInput } from "./types";

type TaxRule = {
  required: boolean;
  length: number;
  digitsOnly: boolean;
};

export const taxRules: Record<Country, TaxRule> = {
  FRA: { required: true, length: 13, digitsOnly: true },
  DEU: { required: true, length: 11, digitsOnly: true },
  ESP: { required: true, length: 9, digitsOnly: false },
  ITA: { required: true, length: 16, digitsOnly: false },
  BEL: { required: false, length: 11, digitsOnly: true },
  NLD: { required: false, length: 9, digitsOnly: true },
};

export const isTaxIdentificationNumberRequired = (country: Country | ""): boolean => {
  if (country === "") {
    return false;
  }

  return taxRules[country].required;
};

export const validateTaxResidenceInput = (input: TaxResidenceInput): FieldErrors => {
  const errors: FieldErrors = {};
  const taxId = input.taxIdentificationNumber.trim();
  const rule = input.country === "" ? null : taxRules[input.country];

  if (input.country === "") {
    errors.country = "Country is required.";
  }

  if (!input.acceptedTerms) {
    errors.acceptedTerms = "You must accept the terms.";
  }

  if (rule == null) {
    return errors;
  }

  if (rule.required && taxId === "") {
    errors.taxIdentificationNumber = "Tax identification number is required.";
    return errors;
  }

  if (taxId === "") {
    return errors;
  }

  if (rule.digitsOnly && !/^\d+$/.test(taxId)) {
    errors.taxIdentificationNumber = "Tax identification number must contain digits only.";
    return errors;
  }

  if (taxId.length !== rule.length) {
    errors.taxIdentificationNumber =
      `Tax identification number must be exactly ${rule.length} characters.`;
  }

  return errors;
};
