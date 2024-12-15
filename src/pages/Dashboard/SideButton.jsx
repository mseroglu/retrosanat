import { AiOutlineProduct } from "react-icons/ai"
import { MdOutlineAddAlert, MdOutlineCampaign } from "react-icons/md"
import { TiDocumentAdd } from "react-icons/ti"

const SideButton = ({ text, selectedPage, setSelectedPage, icon }) => {

   const ICONS = [
   <AiOutlineProduct className="text-xl" />,
   <TiDocumentAdd className="text-xl" />,
   <MdOutlineAddAlert className="text-xl" />,
   <MdOutlineCampaign className="text-xl" />,
   ]

   return (
      <button
         className={`flex items-center gap-2 text-left border-b border-s-4 hover:border-yellow-300 p-2 ${selectedPage == text && "bg-yellow-400"}`}
         onClick={() => setSelectedPage(text)}>
             {ICONS[icon]}
         <span className="max-md:hidden text-sm">{text}</span>
      </button>
   )
}

export default SideButton
