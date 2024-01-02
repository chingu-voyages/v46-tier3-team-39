import { render, screen } from "@testing-library/react";
import Video from "@/app/about/components/Video"

describe("Video", () => {
    beforeEach(() => {
        render(Video());
    })

    describe("Render", () => {
        it("should render a heading", () => {
            const header = screen.getAllByRole("heading");
            expect(header.length).toBe(1);
        })
        it("should render a description", () => {
            const description = screen.getByTestId("description");
            expect(description).toBeInTheDocument();
        })
        it("should render a video", () => {
            const video = screen.getByTestId("video");
            expect(video).toBeInTheDocument();
        })
    })
})