import React from "react";

interface SelectFormMultiProps {
  name: string;
  text: string;
  value: string[];
  options: { value: string ; label: string }[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SelectFormMulti: React.FC<SelectFormMultiProps> = ({
  name,
  text,
  value,
  options,
  handleChange,
  error,
}) => (
  <div className="mb-4">
    <label className="block mb-1 font-bold" htmlFor={name}>
      {text}
    </label>
    <select
      id={name}
      name={name}
      multiple
      value={value}
      onChange={handleChange}
      className="w-full border rounded px-2 py-1"
      size={Math.min(10, options.length)} // Viibles muestro solo 10 opciones
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);

export default SelectFormMulti;