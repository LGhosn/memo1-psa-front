export default function ProyectGridRow({ proyecto }: {proyecto: any}) {

    return (
        <tr key={`${proyecto['Nombre']}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`nom${proyecto['Nombre']}`}>
                <div className="flex items-center text-gray-900">{proyecto['Nombre']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`est${proyecto['Nombre']}`}>
                <div className="flex items-center text-gray-900">{proyecto['Estado']}</div>
            </td>

    
        </tr>
    )
}
