import {MainButton} from "../mainButton"
import { useRouter } from "next/router"


export default function ProjectGridRow({ project }: {project: any}) {
    const router = useRouter()

    function openProject() {
        router.push(`/proyectos/${project['name']}`)
    }
    let statusText=''
    if (project['status'] === "NOT_STARTED") {
        statusText = "INICIADO"
       } else if (project['status'] === "IN_PROGRESS") {
        statusText = "EN PROGRESO"
       } else if (project['status'] === "COMPLETED") {
        statusText = "COMPLETADO"
       } else if (project['status'] === "BLOCKED") {
        statusText = "BLOQUEADO"
       }
  return (
      <tr key={`/proyectos/${project['name']}`} onClick={openProject} className="dark:hover:bg-gray-300 cursor-pointer hover:bg-gray-100 ">
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 " key={`nom${project['Nombre']}`}>
            <div className="flex items-center text-gray-900">{project['name']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${project['Nombre']}`}>
            <div className="flex items-center text-gray-900">{statusText}</div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`id${project['Nombre']}`}>
            <div className="flex items-center text-gray-900">{project['id']}</div>
        </td>
      </tr>
  )
}
