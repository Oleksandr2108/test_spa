import { useState } from "react";

interface DropdownProps {
  options: { id: string; nameCompany: string }[];
  selected: string;
  onSelect: (value: string) => void;
}

const Dropdown = ({ options, selected, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-96">
      <div
        className="w-40 h-5 border-b relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
      </div>
      {isOpen && (
        <ul className="absolute w-52 bg-gray-300">
          <li
            className="cursor-pointer mt-2"
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
              className="cursor-pointer mt-2"
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
