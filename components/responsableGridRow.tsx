import { useRouter } from "next/router"

export default function ResponsableGridRow({ responsable }: {responsable: any}) {
    const router = useRouter()

    function openTicket() {
      //guardo en localStorage el nombre y apellido
      window.localStorage.setItem('fullName', `${responsable['lastName']}, ${responsable['firstName']}`)
      router.push(`/soporte/responsables/${responsable['legajo']}`)
    }
    
  return (
      <tr key={`${responsable['legajo']}`} onClick={openTicket} className="dark:hover:bg-gray-300 cursor-pointer">
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`l${responsable['legajo']}`}>
              <div className="flex items-center text-gray-900">{responsable['legajo']}</div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`f${responsable['legajo']}`}>
              <div className="flex items-center text-gray-900">{responsable['firstName']}</div>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`ln${responsable['legajo']}`}>
              <div className="text-sm leading-5 text-gray-900">{responsable['lastName']}</div>
          </td>
      </tr>
  )
}
