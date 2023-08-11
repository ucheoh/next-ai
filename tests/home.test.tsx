import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Home from "../app/page";

vi.mock("@clerk/nextjs", () => {
  const mockedFunctions = {
    auth: () => new Promise((resolve) => resolve({ userId: "asdlfjalsdkfj" })),
    ClerkProvider: ({children}) => <div>{children}</div>,
    SignOutButton: (props) => <button onClick={props.onClick} {...props}>Sign Out</button>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
        fullName: 'Charles Harris',
      }
    })
  };

  return mockedFunctions
});

vi.mock("next/font/google", () => {
  return {
    Inter: () => ({
      className: "inter"
    })
  }
})

test(`Home`, async () => {
  render(await Home())
  expect(screen.getByText("The best journal app, period.")).toBeInTheDocument();
})
