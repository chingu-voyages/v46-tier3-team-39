import { render, screen } from "@testing-library/react";
import { mockGetServerSession, mockSession } from "../mock/test-utils";
import Hero from "@/app/about/components/Hero"
import { Session } from "@prisma/client";

const renderHero = async (authenticated: boolean) => {
  let serverSession: Partial<Session> | null;
  authenticated ? serverSession = mockSession : serverSession = null
  jest.unmock("next-auth");
  mockGetServerSession(serverSession);
  const component = await Hero();
  render(component);
}

describe("Hero", () => {

  describe("Render", () => {

    it("should render header/s", async () => {
      await renderHero(true); //Arrange
      const headers = screen.getAllByRole('heading'); //Act
      expect(headers.length).toBeGreaterThan(0); // Assert
    });

    it("should render Learn More button", async () => {
      await renderHero(true); //Arrange
      const button = screen.getByTestId("learn-more-button"); //Act
      expect(button).toBeInTheDocument(); //Assert
    })

    it("should render Sign Up button", async () => {
      await renderHero(true); //Arrange
      const button = screen.getByTestId("sign-up-button"); //Act
      expect(button).toBeInTheDocument(); //Assert
    })
  })

  describe("Behaviour", () => {
    
    it("should redirect to Video on Learn More button", async () => {
      await renderHero(true);
      const button = screen.getByTestId("learn-more-button");
      expect(button).toHaveAttribute('href', '/#video')
    })

    it("should redirect to dashboard on authenticated click of Get Started", async () => {
      await renderHero(true);
      const button = screen.getByTestId("sign-up-button")
      expect(button).toHaveAttribute("href", "/dashboard")
    })

    it("should redirect to sign up page on unauthenticated click of Get Started", async () => {
      await renderHero(false);
      const button = screen.getByTestId("sign-up-button")
      expect(button).toHaveAttribute("href", "/auth/signup")
    })
  })
});
