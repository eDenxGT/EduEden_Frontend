/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from 'lucide-react';

const SelectInputField = ({
  options,
  value,
  onChange,
  className = "",
  listClassName = "",
  placeholder = "Select...",
  isDarkMode = false,
  label,
  key,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const baseClassName = `w-full px-3 py-2 text-sm border rounded-md flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
  }`;

  const listBaseClassName = `absolute w-full mt-1 border rounded-md shadow-lg z-10 max-h-60 overflow-auto ${
    isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
  }`;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className={`block text-xs font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          {label}
        </label>
      )}
      <div
        className={`${baseClassName} ${className}`}
        onClick={toggleDropdown}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="select-dropdown"
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
          size={18}
        />
      </div>

      {isOpen && (
        <ul
          id="select-dropdown"
          className={`${listBaseClassName} ${listClassName}`}
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-3 py-2 text-sm cursor-pointer ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-200"
                  : "hover:bg-gray-100 text-gray-800"
              } ${
                option === value
                  ? isDarkMode
                    ? "bg-gray-600"
                    : "bg-gray-200"
                  : ""
              }`}
              role="option"
              aria-selected={option === value}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectInputField;

