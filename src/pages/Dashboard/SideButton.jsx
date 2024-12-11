

const SideButton = ({ text, selectedPage, setSelectedPage }) => {

   return (
      <button
         className={`text-left border-b border-s-4 hover:border-yellow-300 p-2 ${selectedPage == text && "bg-yellow-400"}`}
         onClick={() => setSelectedPage(text)}>
         {text}
      </button>
   )
}

export default SideButton
