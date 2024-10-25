

const Container = ({ children, stil="" }) => {
   return (
      <div className={`px-5 pd:mx-20 lg:px-40 ${stil}`}>
         {children}
      </div>
   )
}

export default Container
