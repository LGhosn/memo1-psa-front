import {useEffect, useState} from "react";
import { SideBar } from "@/components/sideBar";
import { projectSideBarItems } from "@/utils/routes";
import Loading from "@/components/loading";
import ProjectTable from "@/components/proyectos/projectTable";

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

    return (
        <>
        
    <div className="flex flex-row" >
        <SideBar items={projectSideBarItems}></SideBar>
        <div className="container max-w-7xl mx-auto mt-8 space-y-50">
          <div className="mb-4">
            <h1 className=" text-5xl font-bold decoration-gray-400">Listado de proyectos</h1>
          </div>
          
          {
          loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
          <>
          <ProjectTable list={list} />
          </>
          }
        </div>
      </div>
        </>
    )
}
