

const Container = ({ children, stil }) => {
   return (
      <div className={`mx-5 md:mx-20 ${stil}`}>
         {children}
      </div>
   )
}

export default Container
