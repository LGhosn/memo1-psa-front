type Props = {
  title: string;
  id: string;
  options: Array<any>;
  multiple: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectElement( { title, id, options, multiple, onChange}: Props) {
  return (
    <div className="p-2">
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:black">{title}</label>
    <select id={id} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" multiple={multiple} onChange={onChange}>
      <option value="-1" disabled selected>Seleccionar...</option>
      {options.map((item) => (
        <option key={item.value} value={item.value}>{item.label}</option>
      ))}
    </select>
  </div>
  )
}