"use client";

import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  options: { id: string; nameCompany: string }[];
  selected: string;
  onSelect: (value: string) => void;
}

const Dropdown = ({ options, selected, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative w-52"
      ref={dropdownRef}
    >
      <div
        className="w-40  border-b relative cursor-pointer pb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
      </div>
      {isOpen && (
        <ul className="absolute w-52 bg-blue-100 rounded-xl">
          <li
            className="cursor-pointer  text-center hover:bg-blue-300 rounded-xl"
            onClick={() => {
              onSelect("All Companies");
              setIsOpen(false);
            }}
          >
            All Companies
          </li>
          {options.map((comp) => (
            <li
              key={comp.id}
              className="cursor-pointer mt-2 text-center hover:bg-blue-300 rounded-xl"
              onClick={() => {
                onSelect(comp.nameCompany);
                setIsOpen(false);
              }}
            >
              {comp.nameCompany}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
