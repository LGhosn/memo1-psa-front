import {MainButton} from "./mainButton" 
export default function TareaGridRow({tarea}: {tarea: any}) {
    return (
        <tr key={`${tarea['Nombre']}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`nom${tarea['Nombre']}`}>
                <div className="flex items-center text-gray-900">{tarea['Nombre']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${tarea['Nombre']}`}>
                <div className="flex items-center text-gray-900">{tarea['Estado']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${tarea['Nombre']}`}>
                <MainButton href= {`/proyectos/${tarea['Nombre']}`} title= "Ver tarea"
                    height = "50px"
                    width = "120px"
                    fontSize='1rem'/>
            </td>

    
        </tr>
    )
}
