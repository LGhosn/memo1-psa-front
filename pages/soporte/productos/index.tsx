import HeaderItem from "@/components/headerItem";
import Loading from "@/components/loading";
import ProductGridRow from "@/components/productGridRow";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { useEffect, useState } from "react";
import ButtonForCreation from "../ButtonForCreation";

export default function Productos() {
    const [products, setProducts] = useState([])
    const [versions, setVersions] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://psa-support-management.onrender.com/products/")
            .then((res) => {
                return res.json()
            }).then((res) => {
            setProducts(res)
        })
        
    }, [])
   
    useEffect(() => {
        if (products.length> 0) {
            products.forEach((p) => {
                //@ts-ignore
                fetch(`https://psa-support-management.onrender.com/products/${p.id}/availableVersions`)
                .then((res) => {
                    return res.json()
                }).then((res) => {
                    //@ts-ignore
                    versions[p.id] = res;
                })
            })
            setLoading(false)
        }
    }, [products, versions])


    return (
        <div className="flex flex-row">
            <SideBar items={supportSideBarItems}></SideBar>
            <div className="container max-w-7xl mx-auto mt-8">
                {
                loading ? <div className="flex flex-row justify-center"> <Loading /> </div> :
                <>
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-black decoration-gray-400">Productos y Versiones</h1>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="Id" />
                                    <HeaderItem title="Nombre" />
                                </tr>
                                </thead>

                                <tbody>
                                {products.map((product) => (
                                    <ProductGridRow key={product['id']} product={product}/>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </>
                }
            </div>
        </div>
    )
}

