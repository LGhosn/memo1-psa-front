export default function TaskGridRow({ task }: {task: any}) {

  return (
      <tr key={`${task['id']}`}>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`id${task['id']}`}>
              <div className="flex items-center text-gray-900">{task['id']}</div>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`rs${task['id']}`}>
              <div className="flex items-center text-gray-900">{task['nombre']}</div>
          </td>
      </tr>
  )
}
