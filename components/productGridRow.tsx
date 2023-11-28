import { useRouter } from "next/router"

export default function ProductGridRow({ product }: {product: any}) {
    const router = useRouter()

    function openTicket() {
        router.push(`/soporte/productos/${product['id']}`)
    }
    
  return (
      <tr key={`${product['id']}`} onClick={openTicket} className="dark:hover:bg-gray-300 cursor-pointer">
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`rs${product['id']}`}>
              <div className="flex items-center text-gray-900">{product['name']}</div>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`cui${product['id']}`}>
              <div className="text-sm leading-5 text-gray-900">{product['version']}</div>
          </td>
      </tr>
  )
}
