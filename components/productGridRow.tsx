export default function ProductGridRow({ product }: {product: any}) {

  return (
      <tr key={`${product['id']}`}>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`id${product['id']}`}>
              <div className="flex items-center text-gray-900">{product['id']}</div>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`rs${product['id']}`}>
              <div className="flex items-center text-gray-900">{product['nombre']}</div>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`cui${product['id']}`}>
              <div className="text-sm leading-5 text-gray-900">{product['version']}</div>
          </td>
      </tr>
  )
}
