

const Container = ({ children, className }) => {
   
   return (
      <div className={`p-10 max-sm:px-4 md:px-20 flex-grow ${className}`}>
         {children}
      </div>
   )
}

export default Container
