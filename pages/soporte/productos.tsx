import { Button } from "@/components/button";
import HeaderItem from "@/components/headerItem";
import ProductGridRow from "@/components/productGridRow";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";

export default function Productos() {
    const list = [
        {
            'nombre': 'Producto 1',
            'version': '2.0',
            'id': '1'
        },
        {
            'nombre': 'Producto 2',
            'version': '1.4',
            'id': '2'
        },
        {
            'nombre': 'Producto 3',
            'version': '0.7',
            'id': '3'
        },
    ]

    return (
        <div className="flex flex-row">
            <SideBar items={supportSideBarItems}></SideBar>
            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold decoration-gray-400">Productos</h1>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="ID" />
                                    <HeaderItem title="Nombre" />
                                    <HeaderItem title="Versión" />
                                </tr>
                                </thead>

                                <tbody>
                                {list.map((product) => (
                                    <ProductGridRow key={product['id']} product={product} />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Button title="Crear Producto" />
            </div>
        </div>
    )
}

