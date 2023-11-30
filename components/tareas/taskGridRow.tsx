import { Status } from "@/types/types"
import { useRouter } from "next/router"

export default function TaskGridRow({task}: {task: any}) {
    //@ts-ignore
    const status = Status[task ['status']];
    const router = useRouter()
    function openTask() {
        router.push(`/tareas/${task['id']}`)
    }
    

    return (
        <tr key={`/tareas/${task['id']}`} onClick={openTask} className="dark:hover:bg-gray-300 cursor-pointer hover:bg-gray-100 ">

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`id${task['Nombre']}`}>
                <div className="flex items-center text-gray-900">{task['id']}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`nom${task['Nombre']}`}>
                <div className="flex items-center text-gray-900">{task['name']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${task['Nombre']}`}>
                <div className="flex items-center text-gray-900"> {status}</div>
            </td>

           

    
        </tr>
    )
}
