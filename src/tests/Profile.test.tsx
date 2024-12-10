import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Profile from "../components/Profile";  
import { MockedProvider } from "@apollo/client/testing";
import { GET_USER_PROFILE } from "../components/Queries";
import '@testing-library/jest-dom';

const mocks = [
  {
    request: {
      query: GET_USER_PROFILE,
      variables: { id: 1 },
    },
    result: {
      data: {
        user: {
          id: "1",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            geo: {
              lat: -37.3159,
              lng: 81.1496,
            },
          },
        },
      },
    },
  },
];

describe("Profile component", () => {
  it("renders user profile data when fetched", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Profile userId={1} />
      </MockedProvider>
    );

    // Wait for the data to be fetched and rendered
    await waitFor(() => screen.getByText("Username: Bret"));
    await waitFor(() => screen.getByText("Email: Sincere@april.biz"));
    await waitFor(() => screen.getByText("Address Lat: -37.3159"));
    await waitFor(() => screen.getByText("Address Lng: 81.1496"));

    // Check that the expected content is in the document
    expect(screen.getByText("Username: Bret")).toBeInTheDocument();
    expect(screen.getByText("Email: Sincere@april.biz")).toBeInTheDocument();
    expect(screen.getByText("Address Lat: -37.3159")).toBeInTheDocument();
    expect(screen.getByText("Address Lng: 81.1496")).toBeInTheDocument();
  });
});
