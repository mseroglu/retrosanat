

const Container = ({ children, stil="" }) => {
   return (
      <div className={`px-10 md:px-20 ${stil}`}>
         {children}
      </div>
   )
}

export default Container
