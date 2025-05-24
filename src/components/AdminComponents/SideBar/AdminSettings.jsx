// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { User, Mail, Phone, Eye, EyeOff, Upload } from 'lucide-react';
// import Card from '../../../components/CommonComponents/Card';
// import Header from '../../../components/MainComponents/Header';

// const AdminSettings = () => {
//   const isDarkMode = useSelector(state => state.admin.toggleTheme);
//   const [showPasswords, setShowPasswords] = useState({
//     current: false,
//     new: false,
//     confirm: false
//   });

//   // Form states
//   const [formData, setFormData] = useState({
//     full_name: '',
//     user_name: '',
//     email: '',
//     phone: '',
//     photo: null,
//     photoPreview: '',
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString()
//   });

//   const [passwordData, setPasswordData] = useState({
//     current_password: '',
//     new_password: '',
//     confirm_password: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [passwordErrors, setPasswordErrors] = useState({});


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//       updated_at: new Date().toISOString()
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Clear error when user starts typing
//     if (passwordErrors[name]) {
//       setPasswordErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 1024 * 1024) { 
//         setErrors(prev => ({
//           ...prev,
//           photo: 'Image size must be less than 1MB'
//         }));
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData(prev => ({
//           ...prev,
//           photo: file,
//           photoPreview: reader.result,
//           updated_at: new Date().toISOString()
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const togglePasswordVisibility = (field) => {
//     setShowPasswords(prev => ({
//       ...prev,
//       [field]: !prev[field]
//     }));
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validateForm(formData);
    
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     try {
//       console.log('Profile form submitted:', formData);
//     } catch (error) {
//       setErrors({ submit: 'Failed to update profile. Please try again.' });
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     const passwordFormErrors = validatePasswordForm();

//     if (Object.keys(passwordFormErrors).length > 0) {
//       setPasswordErrors(passwordFormErrors);
//       return;
//     }

//     try {
//       console.log('Password form submitted:', passwordData);
//     } catch (error) {
//       setPasswordErrors({ submit: 'Failed to update password. Please try again.' });
//     }
//   };

//   const inputClassName = `w-full p-2 rounded-md outline-none ${
//     isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
//   } border focus:ring-2 focus:ring-2 ${
//     isDarkMode ? 'focus:ring-blue-500' : 'focus:ring-orange-500'
//   }`;

//   const errorClassName = "text-sm text-red-500 mt-1";

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800'}`}>
//       <Header role="admin" isDarkMode={isDarkMode} />
//       <main className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-6">
//         <h1 className="text-3xl font-bold">Account Settings</h1>
        
//         <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
//           <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-2 space-y-6">
//               <div>
//                 <label className="block text-sm font-medium mb-2">Full name</label>
//                 <input
//                   type="text"
//                   name="full_name"
//                   value={formData.full_name}
//                   onChange={handleInputChange}
//                   className={inputClassName}
//                   placeholder="Enter your full name"
//                 />
//                 {errors.full_name && <p className={errorClassName}>{errors.full_name}</p>}
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-2">Username</label>
//                 <input
//                   type="text"
//                   name="user_name"
//                   value={formData.user_name}
//                   onChange={handleInputChange}
//                   className={inputClassName}
//                   placeholder="Enter your username"
//                 />
//                 {errors.user_name && <p className={errorClassName}>{errors.user_name}</p>}
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-2">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={inputClassName}
//                   placeholder="Enter your email"
//                 />
//                 {errors.email && <p className={errorClassName}>{errors.email}</p>}
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-2">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className={inputClassName}
//                   placeholder="Enter your phone number"
//                 />
//                 {errors.phone && <p className={errorClassName}>{errors.phone}</p>}
//               </div>
              
//               <div className="flex items-center gap-4">
//                 <div className="w-20 h-20 overflow-hidden rounded-full border-2 border-gray-300">
//                   <img src={formData.photoPreview} alt="Profile" className="w-full h-full object-cover" />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="profile-photo"
//                     className="cursor-pointer text-blue-600 font-medium text-sm"
//                   >
//                     Upload new photo
//                   </label>
//                   <input
//                     type="file"
//                     id="profile-photo"
//                     name="photo"
//                     accept="image/*"
//                     onChange={handlePhotoChange}
//                     className="hidden"
//                   />
//                   {errors.photo && <p className={errorClassName}>{errors.photo}</p>}
//                 </div>
//               </div>
//             </div>
//             <div className="space-y-6">
//               <button
//                 type="submit"
//                 className={`w-full md:w-auto px-6 py-2 rounded-md ${isDarkMode ?  "bg-blue-600 hover:bg-blue-700" : "bg-[#FF5722] hover:bg-orange-600" } text-white font-medium`}
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </Card>
        
//         <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
//           <form onSubmit={handlePasswordSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">Current Password</label>
//               <div className="relative">
//                 <input
//                   type={showPasswords.current ? 'text' : 'password'}
//                   name="current_password"
//                   value={passwordData.current_password}
//                   onChange={handlePasswordChange}
//                   className={inputClassName}
//                   placeholder="Enter your current password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => togglePasswordVisibility('current')}
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2"
//                 >
//                   {showPasswords.current ? <EyeOff /> : <Eye />}
//                 </button>
//               </div>
//               {passwordErrors.current_password && <p className={errorClassName}>{passwordErrors.current_password}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">New Password</label>
//               <div className="relative">
//                 <input
//                   type={showPasswords.new ? 'text' : 'password'}
//                   name="new_password"
//                   value={passwordData.new_password}
//                   onChange={handlePasswordChange}
//                   className={inputClassName}
//                   placeholder="Enter your new password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => togglePasswordVisibility('new')}
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2"
//                 >
//                   {showPasswords.new ? <EyeOff /> : <Eye />}
//                 </button>
//               </div>
//               {passwordErrors.new_password && <p className={errorClassName}>{passwordErrors.new_password}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Confirm Password</label>
//               <div className="relative">
//                 <input
//                   type={showPasswords.confirm ? 'text' : 'password'}
//                   name="confirm_password"
//                   value={passwordData.confirm_password}
//                   onChange={handlePasswordChange}
//                   className={inputClassName}
//                   placeholder="Confirm your new password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => togglePasswordVisibility('confirm')}
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2"
//                 >
//                   {showPasswords.confirm ? <EyeOff /> : <Eye />}
//                 </button>
//               </div>
//               {passwordErrors.confirm_password && <p className={errorClassName}>{passwordErrors.confirm_password}</p>}
//             </div>

//             <button
//               type="submit"
//               className={`w-full md:w-auto px-6 py-2 rounded-md ${isDarkMode ?  "bg-blue-600 hover:bg-blue-700" : "bg-[#FF5722] hover:bg-orange-600" } text-white font-medium`}
//             >
//               Update Password
//             </button>
//           </form>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default AdminSettings;
