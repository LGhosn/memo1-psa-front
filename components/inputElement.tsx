type Props = {
  title: string;
  id: string;
  type: string;
  readonly: boolean;
}

export default function InputElement( { title, id, type, readonly}: Props) {
  return (
    <div className="p-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{title}</label>
      <div className="mt-1">
        {type === "textarea" ? <textarea name={id} id={id} className="shadow-sm p-1 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border border-gray-500 rounded-md text-gray-900 w-full h-20" readOnly={readonly}></textarea> : 
        <input type={type} id={id} className="shadow-sm p-1 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border border-gray-500 rounded-md text-gray-900 w-full" readOnly={readonly}>
        </input>
        }
      </div>
    </div>
  )
}
