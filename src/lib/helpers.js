const saveToLocalStorage = (key, value) => localStorage.setItem(key, value);
const removeFromLocalStorage = (key) => localStorage.removeItem(key);
const getFromLocalStorage = (key) => localStorage.getItem(key);

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "success":
    case "approved":
      return "bg-green-500";
    case "rejected":
      return "bg-red-500";
    case "pending":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};

export {
  saveToLocalStorage,
  removeFromLocalStorage,
  getFromLocalStorage,
  getStatusColor,
};
