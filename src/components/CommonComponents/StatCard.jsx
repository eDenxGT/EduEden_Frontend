/* eslint-disable react/prop-types */
import Card  from "./Card";

const StatCard = ({ icon, title, value, subtitle, isDarkMode , color}) => (
   <Card className={`p-6 ${color} ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
     <div className="flex items-center space-x-4">
       <div className={`p-3 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
         {icon}
       </div>
       <div>
         <p className="text-sm text-gray-500">{title}</p>
         <p className="text-2xl font-bold">{value}</p>
         {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
       </div>
     </div>
   </Card>
 );

 export default StatCard;