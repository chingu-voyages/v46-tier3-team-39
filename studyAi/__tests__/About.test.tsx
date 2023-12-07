import {render, screen} from '@testing-library/react'
import Hero from '@/app/about/components/Hero'

it('should have header', () => {
    render(<Hero />) //Arrange
    
    const myElem = screen.getAllByText('Perparing You Better') //Act

    expect(myElem).toBeInTheDocument() // Assert
})

