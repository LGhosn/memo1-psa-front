import { useRouter } from "next/router"

type Props = {
    product: any
    onClick?: (productId: string) => void 
}

export default function ProductGridRow({ product, onClick }: Props) {
    const router = useRouter()

    function openProduct() {
        router.push(`/soporte/productos/${product['id']}`)
    }

    function openProductVersion(version:string) {
        router.push(`/soporte/productos/${product['id']}?version=${version}`)
    }
    
  return (
      <tr key={`${product['id']}`} onClick={openProduct} className="dark:hover:bg-gray-300 cursor-pointer">
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`rs${product['id']}`}>
              <div className="flex items-center text-gray-900">{product['id']}</div>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`name${product['id']}`}>
              <div className="text-sm leading-5 text-gray-900">{product['name']}</div>
          </td>
      </tr>
  )
}
