import { ChangeEvent, useState } from "react";

type Props = {
  title: string;
  id: string;
  options: Array<any>;
  multiple: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectElement( { title, id, options, multiple, onChange}: Props) {
  const [change, setChange] = useState(false)

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setChange(true)
    if (onChange) {
      onChange(event)
    }
  }  

  return (
    <div className="p-2 relative">
      <label htmlFor={id} className="flex items-center mb-2 text-sm font-medium text-gray-900 dark:black">
        {title}
        
        {change ? 
        <span className="ml-2">
          <span className="relative flex h-3 w-3">
            <span className="ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </span>
        : <></>
        }
      </label>
      
      <select
        id={id}
        className="form-select block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
        multiple={multiple}
        onChange={handleChange}
      >
        <option selected disabled> Seleccionar..</option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}