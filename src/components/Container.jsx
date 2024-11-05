

const Container = ({ children, className }) => {
   return (
      <div className={`px-10 max-sm:px-0 md:px-20 flex-grow mt-32 py-10 ${className}`}>
         {children}
      </div>
   )
}

export default Container
