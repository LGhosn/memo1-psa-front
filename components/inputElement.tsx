type Props = {
  title: string;
  id: string;
  type: string;
}

export default function InputElement( { title, id, type}: Props) {
  return (
    <div className="p-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{title}</label>
      <div className="mt-1">
        {type === "textarea" ? <textarea name={id} id={id} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border border-gray-500 rounded-md text-gray-900" readOnly></textarea> : 
        <input type={type} id={id} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border border-gray-500 rounded-md text-gray-900" readOnly>
        </input>
        }
      </div>
    </div>
  )
}
