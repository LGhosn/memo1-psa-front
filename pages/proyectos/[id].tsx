import Loading from "@/components/loading";
import { SideBar } from "@/components/sideBar";
import { projectSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonActionProject } from "@/components/proyectos/buttonActionProject";
import { Status } from "@/types/types";

export default function Proyecto () {
  const [loading, setLoading] = useState(true)
  const [proyecto, setProyecto] = useState([])
  const router = useRouter();
  const { id } = router.query;

  function viewTask(){
     // @ts-ignore
    router.push( `/proyectos/${proyecto['id']}/tareas`)
   
  }
  function setupData() {
    let name = document.getElementById("name")
    let description = document.getElementById("description")
    let status = document.getElementById("status")
    let creationDate = document.getElementById("creationDate")
    let totalHours = document.getElementById("totalHours")
    let leader = document.getElementById("leader")

    // @ts-ignore
    let creationDateArray: string[] = (proyecto['creationDate']).split('T');
    
    // @ts-ignore
    name.innerText = `${proyecto['name']}`
    // @ts-ignore
     description.innerText = `${proyecto['description']}`
    // @ts-ignore
    status.innerText = `${Status[proyecto ['status']]}`
    // @ts-ignore
    creationDate.innerText = `${(creationDateArray[0]).split('-').reverse().join("/")}`
    // @ts-ignore
    totalHours.innerText = `${proyecto['totalHours']}`
    // @ts-ignore
    leader.innerText = `${proyecto['leader']}`
  }


  useEffect(() => {
    if (id) {
      fetch(`https://psa-project-managment.onrender.com/api/v1/projects/project/${id}`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        setProyecto(res)
        setLoading(false)
      })
    }
  }, [id])

    useEffect(() => {
      if (!loading)
        setupData()
    }, [loading])

    

  return (
    <div className="flex flex-row">
    <SideBar items={projectSideBarItems}></SideBar>
    
    <div className="flex flex-col container max-w-xl	mx-auto ">
      {
    loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
    <>
    
        {/* puede ser esto lo que lo haga tan grande */}
     <div className="flex flex-col border-4 border-gray-500 w-full h-11/12 mt-5" >
     
       <h1 className="text-4xl mb-5 font-bold"  id="name"style={{textAlign:'center', marginTop:"20px"}}></h1>

       <div className="ml-10 mt-3 flex flex-row">
          <h2 className="font-bold" style={{fontSize: '1.1rem'}}>ID:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '0.9rem'}}>
          {id}
          </div>
        </div>

        <div className="ml-10 mt-3 flex flex-row">
          <h2 className="font-bold" style={{fontSize: '1.1rem'}}>Fecha de inicio:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '0.9rem'}} id="creationDate"></div>
        </div>
        
        <div className="ml-10 flex flex-row mt-5">
          <h2 className="font-bold" style={{fontSize: '1.1rem'}}>Horas estimadas:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '0.9rem'}} id="totalHours"></div>
          <div className=" mt-1 flex items-center text-gray-900" style={{fontSize: '0.9rem'}}>hrs</div>
        </div>

        <div className="ml-10 flex flex-row mt-5">
          <h2 className="font-bold" style={{fontSize: '1.1rem'}}>Estado del proyecto:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '0.9rem'}} id="status"></div>
        </div>

        <div className="ml-10 flex flex-row mt-5">
          <h2 className="font-bold" style={{fontSize: '1.1rem'}}>Líder del proyecto:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '0.9rem'}} id="leader"></div>
        </div>
       
        <div className="ml-10 mt-5 mb-5">
          <h2 className="font-bold" style={{fontSize: '1.1rem'}}>Descripción:</h2>
          <div className="shadow-sm p-1 block sm:text-sm border border-gray-500 rounded-md text-gray-900" style={{width:400, height:100}}>
            <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '0.9rem'}} id="description"></div>
          </div>
        </div>
    </div> 
          
    <div className="mt-1 flex flex-row  justify-between mb-10">
        <div className="ml-10">
          <ButtonActionProject title="Borrar" id={id} actionType="deleteProject" style={' bg-red-400 hover:bg-red-600 '}/>
        </div>
        <div>
          <ButtonActionProject title="Modificar" id={id} actionType="modifyProject" style={' bg-blue-200 hover:bg-blue-600 '}/>
        </div>
        <div>
        <button  type="button" onClick={viewTask} className="flex flex-row text-gray-700 bg-white hover:bg-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg  text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            <div className="text-base">Ver tareas</div> 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left-circle ml-2 mt-0.5" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
            </svg>
            
        </button>
        </div>
      </div>

    </>
    }
    
     
       
    </div>
   </div>
  )
}