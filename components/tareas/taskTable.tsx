import { SetStateAction, useEffect, useState } from "react";
import HeaderItem from "../headerItem";
import TaskGridRow from "./taskGridRow";
import { stateData } from "@/utils/projectState";
import Filter from "../soporte/filter";
import { ButtonActionTask } from "./buttonActionTask";

type Props = {
  list: Array<any>
  projectId: string
}

export default function TaskTable( { list, projectId }: Props) {
  const [filteredData, setFilteredData] = useState(list);
  const [selectedEstado, setSelectedEstado] = useState('')


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



  const resetFilters = () => {
    // Restablecer valores de los estados de filtro
    //@ts-ignore
    document.getElementById("searchBar").value = ""
    setSelectedEstado('');
    // Actualizar la lista filtrada con la lista original
    setFilteredData(list);
  };

  return(
    <div className="flex flex-col">
        <div className="flex justify-between">
        <div className="flex flex-row justify-start items-center space-x-5 p-2">
       
        <Filter label={"Estado:"} value={selectedEstado} onChange={handleEstadoChange} options={stateData}/>
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