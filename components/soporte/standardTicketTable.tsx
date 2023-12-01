import HeaderItem from "../headerItem";
import TicketGridRow from "../ticketGridRow";

type Props = {
  list: Array<any>
}

export default function StandardTicketTable( { list }: Props) {
  return(
    <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full">
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
            {list.length == 0 ? 
              <tr className="dark:hover:bg-gray-300 cursor-pointer">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center text-gray-900">No hay tickets para mostrar </div>
                </td>
              </tr> :
              list.map((tarea) => (
                <TicketGridRow key={tarea['id']} task={tarea} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}