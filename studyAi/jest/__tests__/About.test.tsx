import { render, screen } from "@testing-library/react";
import Hero from "@/app/about/components/Hero";
describe("Hero", () => {
  it("should have header", async () => {
    const component = await Hero();
    render(component); //Arrange
    //assert
    const myElem = screen.getAllByText("Preparing You Better"); //Act
    expect(myElem[0]).toBeInTheDocument(); // Assert
  });
});
