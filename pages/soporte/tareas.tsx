import HeaderItem from "@/components/headerItem";
import TaskGridRow from "@/components/taskGridRow";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { Button } from "@/components/button";

export default function Tareas() {
    const list = [
        {
            'nombre': 'Tarea 1',
            'id': '1'
        },
        {
            'nombre': 'Tarea 2',
            'id': '2'
        },
        {
            'nombre': 'Tarea 3',
            'id': '3'
        },
    ]

    return (
      <div className="flex flex-row">
        <SideBar items={supportSideBarItems}></SideBar>
        <div className="container max-w-7xl mx-auto mt-8 space-y-50">
          <div className="mb-4">
            <h1 className="text-3xl font-bold decoration-gray-400">Tareas</h1>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                  <tr>
                    <HeaderItem title="ID" />
                    <HeaderItem title="Nombre" />
                  </tr>
                  </thead>
                  <tbody>
                  {list.map((tarea) => (
                    <TaskGridRow key={tarea['id']} task={tarea} />
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Button title="Crear tarea" />
        </div>
      </div>
    )
}

