/* eslint-disable react/prop-types */
import { X, LogOut, CheckCircle } from 'lucide-react';

const ConfirmationModal = ({
   isOpen,
   onClose,
   onConfirm,
   title,
   description,
   confirmText = "Confirm",
   cancelText = "Cancel",
   isDarkMode,
   icon = "success",
 }) => {
   if (!isOpen) return null;
 
   const Icon = icon === "danger" ? LogOut : CheckCircle;
   const iconColor = icon === "danger" ? "text-red-500" : "text-green-500";
 
   return (
     <div
       className={`fixed z-50 inset-0 ${
         isDarkMode ? "bg-gray-900" : "bg-black"
       } bg-opacity-50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
         isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
       }`}
     >
       <div
         className={`${
           isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
         } rounded-none shadow-xl max-w-md w-full relative transform transition-all duration-300 ${
           isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
         }`}
       >
         <div className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
           <div className="p-6 pb-2 flex items-center mb-4">
             <Icon className={`h-6 w-6 ${iconColor} mr-3`} />
             <h2 className="text-xl font-semibold">{title}</h2>
           </div>
         </div>
         <div className="py-6 px-10">
           <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-6`}>
             {description}
           </p>
         </div>
         <div className={`border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"} p-6 flex justify-between`}>
           <button
             className={`px-4 py-2 rounded-none transition-all duration-200 ${
               isDarkMode
                 ? "bg-gray-700 text-white hover:bg-gray-600"
                 : "bg-gray-200 text-gray-800 hover:bg-gray-300"
             }`}
             onClick={onClose}
           >
             {cancelText}
           </button>
           <button
             className={`px-4 py-2 rounded-none text-white transition-all duration-200 ${
               icon === "success"
                 ? "bg-green-500 hover:bg-green-600"
                 : "bg-red-500 hover:bg-red-600"
             }`}
             onClick={() => {
               onConfirm();
               onClose();
             }}
           >
             {confirmText}
           </button>
         </div>
         <button
           className={`absolute right-4 top-4 ${
             isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
           } transition-colors`}
           onClick={onClose}
         >
           <X className="h-5 w-5" />
           <span className="sr-only">Close</span>
         </button>
       </div>
     </div>
   );
 };
 

export default ConfirmationModal;