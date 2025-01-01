import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';


function Carousell({ products }) {
  const [index, setIndex] = useState(0);

  const navigate = useNavigate()

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className='my-2 bg-slate-800 rounded-md'>
      {products?.map(item => (
        <Carousel.Item key={item.id} onClick={() => navigate("/product/detail/" + item.id)} className='cursor-pointer '>
          <img src={item.photos && item.photos[+item["indexMainImage"]]} alt="product-image"
            className="w-full max-sm:h-[300px] h-[500px] object-contain rounded-md " />
        </Carousel.Item>
      ))}

    </Carousel>
  );
}

export default Carousell;