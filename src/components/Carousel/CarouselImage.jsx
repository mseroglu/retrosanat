

const CarouselImage = ({ path, text }) => {

  return (      
         <img src={path} alt={text} className="w-full max-sm:h-[300px] h-[500px] object-contain rounded-md bg-zinc-600"/>
      
  )
}

export default CarouselImage
