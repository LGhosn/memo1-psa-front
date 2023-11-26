import {useEffect, useState} from "react";
import ProjectGridRow from "@/components/projectGridRow";
import { MainButton } from "@/components/mainButton"
import { Button } from "@/components/button"

import HeaderItem from "@/components/headerItem";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import Loading from "@/components/loading";
import { ProjectCreationButton } from "@/components/proyectos/createProjectButton";

export default function Clientes() {
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

    return (
        <>
        
    <div className="flex flex-row" >
        <SideBar items={supportSideBarItems}></SideBar>
        <div className="container max-w-7xl mx-auto mt-8 space-y-50">
          <div className="mb-4">
            <h1 className="text-3xl font-bold decoration-gray-400">Proyectos</h1>
            <ProjectCreationButton title="Crear proyecto" />
          </div>
          {
          loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
          <>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                        <HeaderItem title="Nombre" />
                        <HeaderItem title="Estado" />
                        <HeaderItem title=""/>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((project) => (
                      <ProjectGridRow key={project['id']} proyecto={project} />
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

            <div style={{ display: "flex" ,flexDirection: "row", gap:'20rem', margin: "30px 0 0 80px"}}>
            <Button 
                title="Nuevo proyecto" 
                height = "50px"
                width = "150px"
                fontSize='1rem'/>
            <MainButton
                title="Volver" 
                href="/"
                height = "50px"
                width = "150px"
                fontSize='1.2rem'/>
      </div>
        </>
    )
}
