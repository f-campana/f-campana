import type { SubmitResult, TaxResidenceInput } from "./types";

export const submitTaxResidence = async (
  input: TaxResidenceInput,
): Promise<SubmitResult> => {
  await new Promise(resolve => setTimeout(resolve, 600));

  if (input.taxIdentificationNumber.trim().toUpperCase() === "FAIL") {
    return { ok: false, message: "Submission failed. Please try again." };
  }

  return { ok: true };
};

