export default function TaskGridRow({ task }: {task: any}) {

  return (
      <tr key={`${task['title']}`}>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`title${task['title']}`}>
            <div className="flex items-center text-gray-900">{task['title']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`rs${task['title']}`}>
            <div className="flex items-center text-gray-900">{task['severity']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`rs${task['title']}`}>
            <div className="flex items-center text-gray-900">{task['priority']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`rs${task['title']}`}>
            <div className="flex items-center text-gray-900">{task['state']}</div>
        </td>
    
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`rs${task['title']}`}>
            <div className="flex items-center text-gray-900">{task['type']}</div>
        </td>
      </tr>
  )
}
