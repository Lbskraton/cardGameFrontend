import React, { useEffect } from "react";

interface SelectFormMultiProps {
  name: string;
  text: string;
  value: string;
  options: { value: string ; label: string }[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SelectFormSingle: React.FC<SelectFormMultiProps> = ({
  name,
  text,
  value,
  options,
  handleChange,
  error,
}) => {


  //Si no cuando solo hay una opcion disponible me salta un fallo, ya que no cambia no la selecciona
  useEffect(() => {
    if (options.length === 1 && value === "") {
      // Simula un evento de cambio para el padre
      handleChange({
        target: {
          name,
          value: options[0].value,
        }
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  }, [options]);

  return (
    <div className="mb-4">
    <label className="block mb-1 font-bold" htmlFor={name}>
      {text}
    </label>
    <select
      id={name}
      name={name}
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
  </div>)};




export default SelectFormSingle;