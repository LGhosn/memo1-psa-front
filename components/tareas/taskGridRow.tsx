import { Status } from "@/types/types"
import { useRouter } from "next/router"
import TareaAsignadaTicket from "../tareaAsignadaTicket";
import { useState } from "react";

type Props ={
    task: any,
    asociadaATicket? :boolean,
    onClick?: (taskId: string) => void
}

export default function TaskGridRow({task, asociadaATicket, onClick}: Props) {
    //@ts-ignore
    const status = Status[task ['status']];
    const router = useRouter()
    const [isAsociadaHovered, setIsAsociadaHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsAsociadaHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsAsociadaHovered(false);
    };
    
    function openTask() {
        router.push(`/tareas/${task['id']}`)
    }
    

    return (
        <tr key={`/tareas/${task['id']}`} onClick={openTask} className={`dark:hover:bg-gray-300 cursor-pointer ${isAsociadaHovered ? "" : "hover:bg-gray-100"}`}>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`id${task['Nombre']}`}>
                <div className="flex items-center text-gray-900">{task['id']}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`nom${task['Nombre']}`}>
                <div className="flex items-center text-gray-900">{task['name']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${task['Nombre']}`}>
                <div className="flex items-center text-gray-900"> {status}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${task['Nombre']}`}>
                <div className="flex items-center text-gray-900"> {task['assignedTo']}</div>
            </td>

           {
            asociadaATicket != undefined  && asociadaATicket == true?
            <td 
            className={`px-6 py-4 whitespace-no-wrap border-b border-gray-200`} 
            key={`ok${task['Nombre']}`} 
            >
                <div className="flex items-center text-gray-900"> <TareaAsignadaTicket asignada hover={isAsociadaHovered}/></div>       
            </td>
            : asociadaATicket != undefined  && asociadaATicket == false ?
            <td
            className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" 
            key={`add${task['Nombre']}`}
            onClick={(e) => {
                e.stopPropagation();
                if (onClick)
                    onClick(task['id'])
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center text-gray-900"> <TareaAsignadaTicket asignada={false} hover={isAsociadaHovered}/></div>       
            </td> : <></>
           }    
        </tr>
    )
}
