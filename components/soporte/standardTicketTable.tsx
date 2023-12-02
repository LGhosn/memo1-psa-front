import { SetStateAction, useEffect, useState } from "react";
import HeaderItem from "../headerItem";
import TicketGridRow from "../ticketGridRow";
import { priorityData, severityData, stateData, typeOfProblemData } from "@/utils/ticketInfo";
import Filter from "./filter";

type Props = {
  list: Array<any>
}

export default function StandardTicketTable( { list }: Props) {
  const [filteredData, setFilteredData] = useState(list);
  const [selectedSeveridad, setSelectedSeveridad] = useState('')
  const [selectedPrioridad, setSelectedPrioridad] = useState('')
  const [selectedEstado, setSelectedEstado] = useState('')
  const [selectedTipo, setSelectedTipo] = useState('')


  // Función para aplicar filtros por columna
  const searchByTitulo = (columnIndex: string | number, filterValue: string) => {
    const filtered = filteredData.filter((item: { [x: string]: any; }) => {
      //@ts-ignore
      const cellValue = item[Object.keys(item)[columnIndex]];
      return cellValue.toLowerCase().includes(filterValue.toLowerCase());
    });

    setFilteredData(filtered);
  };


  useEffect(() => {
    if (selectedSeveridad) {
      const filteredBySeveridad = filteredData.filter((item) => item.severity === selectedSeveridad);
      setFilteredData(filteredBySeveridad);
    } else {
      setFilteredData(list);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeveridad])

  const handleSeveridadChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedSeveridad(e.target.value);
  };

  useEffect(() => {
    if (selectedPrioridad) {
      const filteredByPrioridad = filteredData.filter((item) => item.priority === selectedPrioridad);
      setFilteredData(filteredByPrioridad);
    } else {
      setFilteredData(list);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPrioridad])

  const handlePrioridadChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedPrioridad(e.target.value);
  };

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
    if (selectedTipo) {
      const filteredByTipo = filteredData.filter((item) => item.type === selectedTipo);
      setFilteredData(filteredByTipo);
    } else {
      setFilteredData(list);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTipo])

  const handleTipoChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedTipo(e.target.value);
  };

  const resetFilters = () => {
    // Restablecer valores de los estados de filtro
    //@ts-ignore
    document.getElementById("searchBar").value = ""
    setSelectedSeveridad('');
    setSelectedPrioridad('');
    setSelectedEstado('');
    setSelectedTipo('');

    // Actualizar la lista filtrada con la lista original
    setFilteredData(list);
  };

  return(
    <div className="flex flex-col">
      <div className="flex flex-row justify-start items-center space-x-5 p-2">
        <input
          id="searchBar"
          type="text"
          placeholder="Buscar por titulo"
          onChange={(e) => searchByTitulo(1, e.target.value)}
          className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-fit border border-gray-300 rounded-md text-gray-900"
        />
        <Filter label={"Severidad:"} value={selectedSeveridad} onChange={handleSeveridadChange} options={severityData}/>
        <Filter label={"Prioridad:"} value={selectedPrioridad} onChange={handlePrioridadChange} options={priorityData}/>
        <Filter label={"Estado:"} value={selectedEstado} onChange={handleEstadoChange} options={stateData}/>
        <Filter label={"Tipo:"} value={selectedTipo} onChange={handleTipoChange} options={typeOfProblemData}/>
        <button
        onClick={resetFilters}
        className="p-2 border border-gray-300 rounded-md text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring focus:border-indigo-500"
      >
        Restablecer Filtros
      </button>
      </div>
    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full p-2">
          <thead>
            <tr>
              <HeaderItem title="Id" />
              <HeaderItem title="Titulo" />
              <HeaderItem title="Fecha Creación" />
              <HeaderItem title="Severidad" />
              <HeaderItem title="Prioridad" />
              <HeaderItem title="Estado" />
              <HeaderItem title="Tipo" />
            </tr>
          </thead>
          <tbody>
          {filteredData.length === 0 ? (
                <tr className="dark:hover:bg-gray-300 cursor-pointer">
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center text-gray-900">No hay tickets para mostrar </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((tarea) => (
                  <TicketGridRow key={tarea.id} task={tarea} />
                ))
              )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}