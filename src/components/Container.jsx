

const Container = ({ children, className }) => {
   
   return (
      <div className={`px-10 max-sm:px-4 md:px-20 flex-grow mt-24 py-10 ${className}`}>
         {children}
      </div>
   )
}

export default Container
