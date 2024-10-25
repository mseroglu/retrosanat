

const CarouselImage = ({ path, text }) => {

  return (      
         <img src={path} alt={text} className="w-full h-[600px] object-contain rounded-md bg-slate-800"/>
      
  )
}

export default CarouselImage
