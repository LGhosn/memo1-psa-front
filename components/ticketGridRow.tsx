import { setFormatDate } from '@/utils/utils'
import { useRouter } from 'next/router'

export default function TicketGridRow({ task }: {task: any}) {
    const router = useRouter()

    function openTicket() {
        router.push(`/soporte/tickets/${task['id']}`)
    }

    function translatePriority(priority: string) {
        switch (priority) {
            case "LOW":
                return "Baja"
            case "MEDIUM":
                return "Media"
            case "HIGH":
                return "Alta"
            default:
                return "Sin prioridad"
        }
    }

    function translateState(state: string) {
        switch (state) {
            case "OPEN":
                return "Abierto"
            case "CLOSED":
                return "Cerrado"
            case "IN_PROGRESS":
                return "En progreso"
            default:
                return "Sin estado"
        }
    }

    function transalteType(type: string) {
        switch (type) {
            case "QUERY":
                return "Consulta"
            case "INCIDENT":
                return "Incidente"
            default:
                return "Sin tipo"
        }
    }

  return (
      <tr key={`${task['id']}`} onClick={openTicket} className="dark:hover:bg-gray-300 cursor-pointer">
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`id${task['id']}`}>
            <div className="flex items-center text-gray-900">{task['id']}</div>
        </td>
        
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`title${task['id']}`}>
            <div className="flex items-center text-gray-900">{task['title']}</div>
        </td>
        
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`creationDate${task['id']}`}>
            <div className="flex items-center text-gray-900">{setFormatDate(task['creationDate'])}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`severity${task['id']}`}>
            <div className="flex items-center text-gray-900">{task['severity']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`priority${task['id']}`}>
            <div className="flex items-center text-gray-900">{translatePriority(task['priority'])}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`state${task['id']}`}>
            <div className="flex items-center text-gray-900">{translateState(task['state'])}</div>
        </td>
    
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`type${task['id']}`}>
            <div className="flex items-center text-gray-900">{transalteType(task['type'])}</div>
        </td>
      </tr>
  )
}
