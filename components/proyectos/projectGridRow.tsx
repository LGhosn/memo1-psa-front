import { useRouter } from "next/router"
import { Status } from "@/types/types"



export default function ProjectGridRow({ project }: {project: any}) {
    const router = useRouter()
    //@ts-ignore
    const status =  Status[project ['status']]

    function openProject() {
        router.push(`/proyectos/${project['id']}`)
    }
    
  return (
      <tr key={`/proyectos/${project['name']}`} onClick={openProject} className="dark:hover:bg-gray-300 cursor-pointer hover:bg-gray-100 ">
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 " key={`nom${project['Nombre']}`}>
            <div className="flex items-center text-gray-900">{project['name']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${project['Nombre']}`}>
            <div className="flex items-center text-gray-900">{status}</div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`id${project['Nombre']}`}>
            <div className="flex items-center text-gray-900">{project['id']}</div>
        </td>
      </tr>
  )
}
