import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';
import { useSelector } from 'react-redux';


function Carousell({ products }) {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(products)

  useEffect(() => {
    const filtred = products.filter(item => item.isShowMainPage === true)
    console.log(filtred)
    setData(filtred)
  }, [])

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className='my-2'>
      {data?.map(item => (
        <Carousel.Item key={item.id}>

          {/* burdaki if ifadesi düzenlenecek */}
          <CarouselImage path={item.photos ? item.photos[0] : item.foto} text="slide-image" />
        </Carousel.Item>
      ))}
      {/* 
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
      */}
    </Carousel>
  );
}

export default Carousell;