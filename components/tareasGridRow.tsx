import {MainButton} from "./mainButton" 
export default function TareaGridRow({tarea}: {tarea: any}) {
    return (
        <tr key={`${tarea['name']}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`nom${tarea['Nombre']}`}>
                <div className="flex items-center text-gray-900">{tarea['name']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${tarea['Nombre']}`}>
                <div className="flex items-center text-gray-900">{tarea['status']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${tarea['Nombre']}`}>
                <MainButton href= {`/tareas/${tarea['name']}`} title= "Ver tarea"/>
            </td>

    
        </tr>
    )
}
