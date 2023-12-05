import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import Cardform from "./components/Cardform";
import axios from "axios";

jest.mock("axios", () => ({
  post: jest.fn(),
}));

test("renders learn react link", () => {
  render(<App />);
});

test("renders Cardform component", () => {
  render(<Cardform />);
  const creditCardInput = screen.getByPlaceholderText("0000 0000 0000 0000");
  expect(creditCardInput).toBeInTheDocument();
});

test("handles card number input change", () => {
  render(<Cardform />);
  const creditCardInput = screen.getByPlaceholderText("0000 0000 0000 0000");
  fireEvent.change(creditCardInput, { target: { value: "1234567890123456" } });

  expect(creditCardInput.value).toBe("1234 5678 9012 3456");
});

test("formats card number correctly", () => {
  render(<Cardform />);
  const creditCardInput = screen.getByPlaceholderText("0000 0000 0000 0000");
  
  fireEvent.change(creditCardInput, { target: { value: "1234567890123456" } });

  expect(creditCardInput.value).toBe("1234 5678 9012 3456");
});

test("handles reset button click", async () => {
  render(<Cardform />);
  const creditCardInput = screen.getByPlaceholderText("0000 0000 0000 0000");
  fireEvent.change(creditCardInput, { target: { value: "1234567890123456" } });
  const resetButton = screen.getByText("Reset");

  fireEvent.click(resetButton);

  await waitFor(() => {
    expect(creditCardInput.value).toBe("");
  });
});

test("handles continue button click and makes API call", async () => {
  render(<Cardform />);
  const creditCardInput = screen.getByPlaceholderText("0000 0000 0000 0000");
  fireEvent.change(creditCardInput, { target: { value: "1234567890123456" } });

  jest.spyOn(axios, "post").mockResolvedValueOnce({
    data: { message: "Success" },
  });

  const continueButton = screen.getByText("Continue");
  fireEvent.click(continueButton);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining(`${process.env.REACT_APP_API_URL}/submit/`),
      { cardNumber: "1234567890123456" }
    );
  });
});

test("handles continue button click and makes API call with error", async () => {
  render(<Cardform />);
  const creditCardInput = screen.getByPlaceholderText("0000 0000 0000 0000");
  fireEvent.change(creditCardInput, { target: { value: "1234567890123456" } });

  // Mock a failed API call
  jest.spyOn(axios, "post").mockRejectedValueOnce({
    response: { data: { error: "API Error" } },
  });

  const continueButton = screen.getByText("Continue");
  fireEvent.click(continueButton);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining(`${process.env.REACT_APP_API_URL}/submit/`),
      { cardNumber: "1234567890123456" }
    );
  });

  expect(screen.getByText("API Error")).toBeInTheDocument();
});
