import { SetStateAction, useEffect, useState } from "react";
import HeaderItem from "../headerItem";
import TaskGridRow from "./taskGridRow";
import { stateData , leaderData} from "@/utils/projectState";
import Filter from "../soporte/filter";
import { ButtonActionTask } from "./buttonActionTask";
import { useRouter } from "next/router";


type Props = {
  list: Array<any>
  projectId: string
}

export default function TaskTable( { list, projectId }: Props) {
  const [filteredData, setFilteredData] = useState(list);
  const [selectedEstado, setSelectedEstado] = useState('')
  const [selectedResponsable, setSelectedResponsable] = useState('')
  const router = useRouter();


  useEffect(() => {
    if (selectedEstado) {
      const filteredByEstado = filteredData.filter((item) => item.state === selectedEstado);
      setFilteredData(filteredByEstado);
    } else {
      setFilteredData(list);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEstado])

  const handleEstadoChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedEstado(e.target.value);
  };

  useEffect(() => {
    if (selectedResponsable) {
      const filteredByAssignedTo= filteredData.filter((item) => item.assignedTo === selectedResponsable);
      setFilteredData(filteredByAssignedTo);
    } else {
      setFilteredData(list);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResponsable])


  const handleResponsableChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedResponsable(e.target.value);
  };


  const resetFilters = () => {
    // Restablecer valores de los estados de filtro
    setSelectedEstado('');
    // Actualizar la lista filtrada con la lista original
    setFilteredData(list);
    setSelectedResponsable('')
  };
  function backPage(){
    router.push(`/proyectos/${projectId}`)
   
  }
  return(
    <div className="flex flex-col">
        <div className="flex justify-between">
       
        <div className="flex flex-row justify-start items-center space-x-5 p-2">
        <div className="flex justify-between ">
        <button  type="button" onClick={backPage} className="flex flex-row text-gray-700 bg-white hover:bg-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg  text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5 mt-1 bi bi-arrow-left-circle mr-2" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg>
            <div className="sm:text-lg">Volver</div>
          
          </button>
            
          </div>
       
        <Filter label={"Estado:"} value={selectedEstado} onChange={handleEstadoChange} options={stateData}/>
        <Filter label={"Líder:"} value={selectedResponsable} onChange={handleResponsableChange} options={leaderData}/>
        <button
        onClick={resetFilters}
        className="p-2 border border-gray-300 rounded-md text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring focus:border-indigo-500"
      >
        Restablecer Filtros
      </button>
      
      </div>
      <div className="sm:flex sm:flex-row mb-1 ">
      <ButtonActionTask style={' bg-blue-400 hover:bg-blue-600 '} title="Crear tarea" projectId={projectId} actionType="createTask" taskId=''/>
          </div>
        </div>
     
    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full p-2">
          <thead>
            <tr>
            <HeaderItem title="ID" />
            <HeaderItem title="Nombre" />
            <HeaderItem title="Estado" />
            <HeaderItem title="Responsable" /> 
            </tr>
          </thead>
          <tbody>
          {filteredData.length === 0 ? (
                <tr className="dark:hover:bg-gray-300 cursor-pointer">
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center text-gray-900">No hay proyectos para mostrar </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((task) => (
                    <TaskGridRow key={task['id']} task={task} />
                ))
              )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}