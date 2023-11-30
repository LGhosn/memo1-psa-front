import { Status } from "@/types/types"
import {MainButton} from "../mainButton" 
export default function TaskGridRow({task}: {task: any}) {
    //@ts-ignore
    const status = Status[task ['status']];

    return (
        <tr key={`${task['name']}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`nom${task['Nombre']}`}>
                <div className="flex items-center text-gray-900">{task['name']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${task['Nombre']}`}>
                <div className="flex items-center text-gray-900"> {status
}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`${task['Nombre']}`}>
                <MainButton href= {`/tareas/${task['id']}`} title= "Ver tarea"/>
            </td>

    
        </tr>
    )
}
