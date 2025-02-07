import { render, screen } from "@testing-library/react";
import UserForm from "./UserForm";
import userEvent from "@testing-library/user-event";

describe('UserForm', () => {
  test('it shows two inputs and a button', () => {
    render(<UserForm />);

    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
  });

  test('it calls onUserAdd when the form is submitted', async () => {
    const mock = jest.fn();
    render(<UserForm onUserAdd={mock} />);

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });

    await userEvent.click(nameInput);
    await userEvent.keyboard('jane');

    await userEvent.click(emailInput);
    await userEvent.keyboard('jane@example.com');

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@example.com' });
  });
});
  