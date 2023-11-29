import {useEffect, useState} from "react";
import ProjectGridRow from "@/components/proyectos/projectGridRow";
import HeaderItem from "@/components/headerItem";
import { SideBar } from "@/components/sideBar";
import { projectSideBarItems } from "@/utils/routes";
import Loading from "@/components/loading";
import { ButtonActionProject } from "@/components/proyectos/buttonActionProject";

export default function Proyectos() {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://psa-project-managment.onrender.com/api/v1/projects")
        .then((res) => {
        return res.json()
        }).then((res) => {
            setList(res)
            setLoading(false)
            })
    }, [])

    function createProject() {
      let name = document.getElementById("name")
      let description = document.getElementById("description")
      let leader = document.getElementById("leader")
      let totalHours = document.getElementById("totalHours")
  
      const data = {
        // @ts-ignore
        "name": name.value,
        // @ts-ignore
        "description": description.value,
        // @ts-ignore
        "leader": leader[leader.selectedIndex].text,
        // @ts-ignore
        "totalHours": totalHours.value,
  
        "status": "NOT_STARTED"
      }
      console.log(data)
      // @ts-ignore
      fetch('https://psa-project-managment.onrender.com/api/v1/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
          })
          // @ts-ignore
          .catch((error) => setError("No se pudo crear el proyecto"))
    }

    return (
        <>
        
    <div className="flex flex-row" >
        <SideBar items={projectSideBarItems}></SideBar>
        <div className="container max-w-7xl mx-auto mt-8 space-y-50">
          <div className="mb-4">
            <h1 className="ml-16 text-4xl/5 font-bold decoration-gray-400">Listado de proyectos</h1>
          </div>
          
          {
          loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
          <>
          <div className="sm:flex sm:flex-row-reverse mr-16">
            <ButtonActionProject title="Crear proyecto" id='' actionType="createProject" style={' bg-blue-400 hover:bg-blue-600 '}/> 
          </div>
          <div className="flex flex-col mt-1 ">
            <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-[90%] ml-16 overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                        <HeaderItem title="Nombre" />
                        <HeaderItem title="Estado" />
                        <HeaderItem title="ID" />
                    </tr>
                  </thead>
                  <tbody>
                  {loading ? <Loading /> : 
                        //verifico si la lista está vacía
                        list.length === 0 ? (
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                No hay proyectos creados.
                            </td>
                        </tr>
                            ) :
                    list.map((project) => (
                      <ProjectGridRow key={project['id']} project={project} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div> 
          </>
          }
        </div>
      </div>
        </>
    )
}
