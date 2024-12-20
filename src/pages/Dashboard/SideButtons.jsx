import { AiOutlineProduct } from "react-icons/ai"
import { MdOutlineAddAlert, MdOutlineCampaign } from "react-icons/md"
import { TiDocumentAdd } from "react-icons/ti"
import { DASHBOARD_PAGES } from "../../constants/DashboardPages"


const SideButtons = ({ selectedPage, setSelectedPage }) => {

   const ICONS = [
      <AiOutlineProduct className="text-xl" />,
      <TiDocumentAdd className="text-xl" />,
      <MdOutlineAddAlert className="text-xl" />,
      <MdOutlineCampaign className="text-xl" />,
   ]

   return (
      <>
         {DASHBOARD_PAGES.map((item, i) => (
            <button
               key={item.page}
               className={`flex items-center gap-2 text-left border-b border-s-4 hover:border-yellow-300 p-2 ${selectedPage == item.page && "bg-yellow-400"}`}
               onClick={() => setSelectedPage(item.page)}>
               {ICONS[i]}
               <span className="max-md:hidden text-sm">{item.page}</span>
            </button>
         ))}
      </>
   )
}

export default SideButtons
