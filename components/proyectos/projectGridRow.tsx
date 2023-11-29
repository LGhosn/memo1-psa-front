import {MainButton} from "../mainButton"
import { useRouter } from "next/router"

// export default function ProyectGridRow({ proyecto }: {proyecto: any}) {
//     return (
//         <tr key={`${proyecto['Nombre']}`}>
//             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`nom${proyecto['Nombre']}`}>
//                 <div className="flex items-center text-gray-900">{proyecto['name']}</div>
//             </td>

//             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${proyecto['Nombre']}`}>
//                 <div className="flex items-center text-gray-900">{proyecto['status']}</div>
//             </td>
        

//             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`${proyecto['Nombre']}`}>
//                 <MainButton href= {`/proyectos/${proyecto['name']}`} title= "Ver Proyecto"/>
//             </td>

    
//         </tr>
//     )
// }
export default function ProjectGridRow({ project }: {project: any}) {
    const router = useRouter()

    function openProject() {
        router.push(`/proyectos/${project['name']}`)
    }
    
  return (
      <tr key={`/proyectos/${project['name']}`} onClick={openProject} className="dark:hover:bg-gray-300 cursor-pointer">
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`nom${project['Nombre']}`}>
            <div className="flex items-center text-gray-900">{project['name']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${project['Nombre']}`}>
            <div className="flex items-center text-gray-900">{project['status']}</div>
        </td>
      </tr>
  )
}
