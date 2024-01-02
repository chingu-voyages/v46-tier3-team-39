import { render, screen } from "@testing-library/react";
import Team from "@/app/about/components/Team"

describe("Team", () => {
    beforeEach(() => {
        render(Team());
    })

    describe("Render", () => {
        it("should render a heading", () => {
            const header = screen.getByText("Meet Our Team");
            expect(header).toBeInTheDocument();
        })

        it("should render Contact button", () => {
            const button = screen.getByText("Contact Us");
            expect(button).toBeInTheDocument();
        })
        it("should render an avatar image for each developer", () => {
            const developers = screen.queryAllByTestId("team-member");
            developers.forEach((developer) => {
                const image = developer.childNodes[0] as HTMLImageElement;
                expect(image.src).toBeDefined();
            })
        })
        it("should render a name for each developer", () => {
            const developers = screen.queryAllByTestId("team-member");
            developers.forEach((developer) => {
                const name = developer.querySelector("h1") as HTMLHeadingElement;
                expect(name.textContent).toBeDefined();
            })
        })
        it("should render LinkedIn link for each team member", () => {
            const developers = screen.queryAllByTestId("team-member");
            developers.forEach((developer) => {
                const link = developer.querySelector("a") as HTMLAnchorElement;
                expect(link.href).toBeDefined();
            })
        })
        it("should render a role for each team member", () => {
            const developers = screen.queryAllByTestId("team-member");
            developers.forEach((developer) => {
                const role = developer.querySelector("h2") as HTMLHeadingElement;
                expect(role.textContent).toBeDefined();
            })
        })
    })
})