import { useRouter } from 'next/router'

export default function TicketGridRow({ task }: {task: any}) {
    const router = useRouter()

    function openTicket() {
        router.push(`/soporte/tickets/${task['id']}`)
    }

  return (
      <tr key={`${task['id']}`} onClick={openTicket} className="dark:hover:bg-gray-300 cursor-pointer">
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`title${task['id']}`}>
            <div className="flex items-center text-gray-900">{task['title']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`severity${task['id']}`}>
            <div className="flex items-center text-gray-900">{task['severity']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`priority${task['id']}`}>
            <div className="flex items-center text-gray-900">{task['priority']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`state${task['id']}`}>
            <div className="flex items-center text-gray-900">{task['state']}</div>
        </td>
    
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`type${task['id']}`}>
            <div className="flex items-center text-gray-900">{task['type']}</div>
        </td>
      </tr>
  )
}
