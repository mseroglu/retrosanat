import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className='my-2 '>
      <Carousel.Item>
        <CarouselImage path={"art-3.jpg"} text="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage path={"art-4.jpg"} text="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage path={"art-5.jpg"} text="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage path={"art-6.jpg"} text="Forth slide" />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage path={"art-7.jpg"} text="Fifth slide" />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage path={"art-8.jpg"} text="Sixth slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;