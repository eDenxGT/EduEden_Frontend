const saveToLocalStorage = (key, value) => localStorage.setItem(key, value);
const removeFromLocalStorage = (key) => localStorage.removeItem(key);
const getFromLocalStorage = (key) => localStorage.getItem(key);

export { saveToLocalStorage, removeFromLocalStorage, getFromLocalStorage };
