type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<any>;
  label: string
};

export default function Filter( {label, value, onChange, options }: Props) {
  return(
    <div className="flex items-center">
      <label className="mr-2 text-gray-700">{label}</label>
      <select
      value={value}
      onChange={(onChange)}
      className="p-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring focus:border-indigo-500"
      >
        <option value="">Todos</option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}