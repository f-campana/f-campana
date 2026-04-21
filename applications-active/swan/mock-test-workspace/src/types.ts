export const countries = ["FRA", "DEU", "ESP", "ITA", "BEL", "NLD"] as const;

export type Country = (typeof countries)[number];

export type TaxResidenceInput = {
  country: Country | "";
  taxIdentificationNumber: string;
  acceptedTerms: boolean;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; message: string };

export type FieldErrors = Partial<Record<keyof TaxResidenceInput, string>>;

