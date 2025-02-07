import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserForm from './UserForm';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vitest } from 'vitest';

describe("UserForm", () => {
  it("it shows a input for the name", () => {
    render(<UserForm onUserAdd={() => vitest.fn()} />);
    const input = screen.getByTestId("name-input");
    expect(input).toBeInTheDocument();
  });


  it("it shows a input for the email", () => {
    render(<UserForm onUserAdd={() => vitest.fn()} />);
    const input = screen.getByTestId("email-input");
    expect(input).toBeInTheDocument();
  });

  it("it calls onUserAdd when the form is submitted", () => {
    const mock = vitest.fn();
    render(<UserForm onUserAdd={mock} />);
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    userEvent.type(nameInput, "John Doe"  );
    userEvent.type(emailInput, "john.doe@example.com");
    userEvent.click(screen.getByRole("button", { name: /add user/i }));
    expect(mock).toHaveBeenCalledWith({ name: "John Doe", email: "john.doe@example.com" });
  });
});
