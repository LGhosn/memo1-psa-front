import {MainButton} from "./mainButton" 
export default function TaskGridRow({ task }: {task: any}) {

    return (
        <tr key={`${task['title']}`}>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`title${task['title']}`}>
              <div className="flex items-center text-gray-900">{task['name']}</div>
          </td>
  
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`rs${task['title']}`}>
              <div className="flex items-center text-gray-900">{task['status']}</div>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`rs${task['title']}`}>
            <MainButton href= {`/tareas/${task['name']}`} title= "Ver tarea"
                        height = "50px"
                        width = "120px"
                        fontSize='1rem'/>
          </td>
  
        </tr>
    )
  }
  
