import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const CustomSelect = ({ options, selectedValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleSelect = (value) => {
      onChange(value);
      setIsOpen(false);
    };
  
    const selectedLabel = options.find(option => option.value === selectedValue)?.label || 'Exclusive(Default)';
  
    return (
      <div className="relative w-[200px]">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center py-2 bg-white text-[#333333] w-full text-left cursor-pointer"
        >
          <span className="flex-1">
            {selectedLabel}
          </span>
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5 text-[#333333]" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-[#333333]" />
          )}
        </button>
  
        {isOpen && (
          <div
            className={`absolute top-full left-0 w-full mt-1 bg-[#081d57] text-white z-10 transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            {options.map((option) => (
              <button
              key={option.value}
              value={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className="block text-center px-4 py-2 w-[200px]"
              >
                <span
                  className={`inline-block ${
                    selectedValue === option.value ? 'border-b-2 border-amber-700' : ''
                  } hover:border-b-2 hover:border-amber-700`}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };
  

export default CustomSelect;
