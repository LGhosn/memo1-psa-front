import { setFormatDate } from '@/utils/utils'
import { useRouter } from 'next/router'

export default function TicketGridRow({ ticket }: {ticket: any}) {
    const router = useRouter()

    function openTicket() {
        router.push(`/soporte/tickets/${ticket['id']}`)
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
            case "SOLVED":
                return "Resuelto"
            case "IN_PROGRESS":
                return "En progreso"
            case "DEVELOPING":
                return "En progreso"
            case "IMPLEMENTATION":
                return "En implementación"
            case "WAITING_FOR_CLIENT":
                return "Esperando respuesta del cliente"
                case "LOCKED":
                    return "Bloqueado"
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
      <tr key={`${ticket['id']}`} onClick={openTicket} className="dark:hover:bg-gray-300 cursor-pointer">
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`id${ticket['id']}`}>
            <div className="flex items-center text-gray-900">{ticket['id']}</div>
        </td>
        
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`title${ticket['id']}`}>
            <div className="flex items-center text-gray-900">{ticket['title']}</div>
        </td>
        
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`creationDate${ticket['id']}`}>
            <div className="flex items-center text-gray-900">{setFormatDate(ticket['creationDate'])}</div>
        </td>
        
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`closeDate${ticket['id']}`}>
            <div className="flex items-center text-gray-900">{setFormatDate(ticket['closeDate'])}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`severity${ticket['id']}`}>
            <div className="flex items-center text-gray-900">{ticket['severity']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`priority${ticket['id']}`}>
            <div className="flex items-center text-gray-900">{translatePriority(ticket['priority'])}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`state${ticket['id']}`}>
            <div className="flex items-center text-gray-900">{translateState(ticket['state'])}</div>
        </td>
    
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`type${ticket['id']}`}>
            <div className="flex items-center text-gray-900">{transalteType(ticket['type'])}</div>
        </td>
      </tr>
  )
}
