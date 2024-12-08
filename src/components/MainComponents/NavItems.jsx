/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const NavItem = ({ item, isActive, onClick }) => (
   <Link to={item?.href || item.link}>
     <div
       onClick={onClick}
       className={`user-select-none flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
         isActive ? "bg-[#FF5722] text-white hover:bg-[#FF5722]/90" : "text-gray-400 hover:bg-gray-800 hover:text-white"
       }`}
     >
       {item?.icon}
       {item?.title}
     </div>
   </Link>
 );
 
 export default NavItem