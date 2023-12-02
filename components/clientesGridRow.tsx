import { useRouter } from "next/router"

export default function ClienteGridRow({ cliente }: {cliente: any}) {
    const router = useRouter()

    function openTicket() {
      //guardo en localStorage el nombre y apellido
      window.localStorage.setItem('cliente', `${cliente['CUIT']}, ${cliente['razon social']}`)
      router.push(`/soporte/clientes/${cliente['id']}`)
    }
    
  return (
      <tr key={`${cliente['id']}`} onClick={openTicket} className="dark:hover:bg-gray-300 cursor-pointer">
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`l${cliente['id']}`}>
              <div className="flex items-center text-gray-900">{cliente['id']}</div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`ln${cliente['id']}`}>
              <div className="text-sm leading-5 text-gray-900">{cliente['CUIT']}</div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`f${cliente['id']}`}>
              <div className="flex items-center text-gray-900">{cliente['razon social']}</div>
          </td>

      </tr>
  )
}
