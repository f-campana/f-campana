import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TaxResidenceStep } from "./TaxResidenceStep";

describe("TaxResidenceStep", () => {
  test("renders the starter fields", () => {
    render(<TaxResidenceStep />);

    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText(/Tax identification number/)).toBeInTheDocument();
    expect(screen.getByLabelText("I accept the terms")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });

  test.todo("submits successfully with valid data");
  test.todo("shows required field validation when the form is incomplete");
  test.todo("updates tax identification number validation when the country changes");
  test.todo("disables submit during the async request");
  test.todo("shows a top-level error when submission fails");
});

