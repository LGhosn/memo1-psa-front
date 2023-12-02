import Loading from "@/components/loading";
import { SideBar } from "@/components/sideBar";
import { projectSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonActionProject } from "@/components/proyectos/buttonActionProject";
import { Status } from "@/types/types";
import { setElementValue, setElementInnerHtml } from "@/utils/utils";
import ProgressBar from "@/components/progressBar";


export default function Proyecto () {
  const [loading, setLoading] = useState(true)
  const [proyecto, setProyecto] = useState([])
  const [list, setList] = useState([])

  const router = useRouter();
  const { id } = router.query;

  function backPage(){
    router.push(`/proyectos`)
   
  }

  function viewTask(){
     // @ts-ignore
    router.push( `/proyectos/${proyecto['id']}/tareas`)
   
  }
  function setupData() {
    let description = document.getElementById("description")
  

    // @ts-ignore
    let creationDateArray: string[] = (proyecto['creationDate']).split('T');
    
    // @ts-ignore
    setElementInnerHtml("name", proyecto.name);
    // @ts-ignore
    description.innerText = `${proyecto['description']}`
    // @ts-ignore
    setElementValue("status", Status[proyecto.status]);
    setElementValue("creationDate", `${(creationDateArray[0]).split('-').reverse().join("/")}`);
   
    // @ts-ignore
    setElementValue("totalHours", proyecto.totalHours + ' horas');
    // @ts-ignore
    setElementValue("leader", proyecto.leader)
    //@ts-ignore
    setElementValue("id", proyecto.id)
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
    
    let contador = 0
    useEffect(() => {
      if (router.isReady) {
        fetch(`https://psa-project-managment.onrender.com/api/v1/tasks/project/${id}`)
          .then((res) => {
            return res.json()
          }).then((res) => {
            setList(res)
          })
    } 
    }, [router.isReady])

    list.map(project => {
      if(project['status'] === 'COMPLETED'){
        contador+=1;
      }
    }) 
    
    const porcentaje = (contador*100)/list.length;
    
  return (
    <div className="flex flex-row">
    <SideBar items={projectSideBarItems}></SideBar>
      
      <div className="conteiner flex flex-col w-full bg-gray-100 p-6">
        { loading ? <div className="flex justify-center"> <Loading /> </div>:
      <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <div className="w-full flex flex-row justify-between p-4">
          <h1 id='name' className="text-4xl flex font-bold mb-4 mt-2 "></h1>
          <div className="flex flex-row mt-6 ">
          <ButtonActionProject proyecto={proyecto} id={id} actionType="modifyProject" style={' bg-white hover:bg-gray-100 h-10 w-10'} icon={<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>}/>
          <ButtonActionProject id={id} actionType="deleteProject" style={' bg-white hover:bg-gray-100 h-10 w-10'} icon={<svg className="fill-red-600 h-6 w-6"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
}/>
          </div>

          

        </div>
        

        <div className="grid md:grid-cols-2 gap-8 mt-5">
          <div>
            <div className="w-full flex flex-row px-32">
              <svg className="h-6 w-6 mr-2"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
              <div className="flex flex-col w-full">
                <h1 className="text-xl font-bold mb-3">Líder de proyecto</h1>
                <input type="textarea" id="leader" className="flex font-medium  p-2.5 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300   dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
              </div>
            </div>
            <div className="w-full flex flex-row px-32 mt-2">
              <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg>        
              <div className="flex flex-col w-full">
                <h1 className="text-xl font-bold mb-3">Fecha de creación</h1>
                <input type="textarea" id="creationDate" className="flex font-medium p-2.5 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300   dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
              </div>
            </div>

            <div className="w-full flex flex-row px-32 mt-2">
            <svg className="h-6 w-6 mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 160H320V128H448v32zM48 64C21.5 64 0 85.5 0 112v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zM448 352v32H192V352H448zM48 288c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V336c0-26.5-21.5-48-48-48H48z"/></svg>
              <div className="flex flex-col w-full">
                  <h1 className="text-xl font-bold mb-3">Estado del proyecto</h1>
                  <input type="textarea" id="status" className="flex  font-medium p-2.5 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300   dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
              </div>
            </div>



            <div className="w-full flex flex-row px-32 mt-2">
              <svg className="h-6 w-6 mr-2"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>        
              <div className="flex flex-col w-full">
                <h1 className="text-xl font-bold mb-3">Horas estimadas</h1>
                <input type="textarea" id="totalHours" className="flex font-medium p-2.5 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300   dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
              </div>
            </div>
          </div>
         
            <div>
              <div className="w-full flex flex-row ">
                <svg className="h-6 w-6 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>
                <div className="flex flex-col w-full">
                  <h1 className="text-xl font-bold mb-3">ID del proyecto</h1>
                  <input type="textarea" id="id" className="flex font-medium w-1/2 p-2.5 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300   dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                </div>
              </div>

              <div className="w-full flex flex-row mt-4 ">
              <svg className="h-6 w-6 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                <div className="flex flex-col w-full">
                  <h1 className="text-xl font-bold mb-3">Progreso de tareas finalizadas</h1>
                  <ProgressBar percentage={porcentaje}></ProgressBar>
                </div>
              </div>
              
              <div className="w-full flex flex-row mt-5">
                <svg  className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm96 64a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm104 0c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm-72-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM96 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
                <div className="flex flex-col w-full">
                  <h1 className="text-xl font-bold mb-3">Descripción</h1>
                  <textarea id="description" rows={6} className="flex p-2.5  text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300   dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly></textarea>
                </div>
              </div> 
            </div>
        </div>
        <div className="flex justify-between mt-5">
        <button  type="button" onClick={backPage} className="flex flex-row text-gray-700 bg-white hover:bg-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg  text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5 mt-1 bi bi-arrow-left-circle mr-2" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg>
            <div className="text-base">Volver</div>
          
          </button>
              <button  type="button" onClick={viewTask} className="flex flex-row text-gray-700 bg-white hover:bg-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg  text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
              <div className="text-base">Ver tareas</div> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5  bi bi-arrow-left-circle ml-2 mt-1" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
              </svg>
              </button>
          </div>
        </div>
      </>}
    </div>
    
   </div>
  )
}