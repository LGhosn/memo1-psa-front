import Loading from "@/components/loading";
import { MainButton } from "@/components/mainButton";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setElementInnerHtml } from "@/utils/utils";
import HeaderItem from "@/components/headerItem";
import TicketGridRow from "@/components/ticketGridRow";


export default function Producto() {
  const [loading, setLoading] = useState(true)
  const [ticketsProduct, setTicketsProduct] = useState([])
  const [product, setProduct] = useState([]) 
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // @ts-ignore
    if (product && product.name && product.version) {
      // @ts-ignore
      setElementInnerHtml("product", product.name + " " + product.version);
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  useEffect(() => {
    if (id) {
      fetch(`https://psa-support-management.onrender.com/products/${id}`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        setProduct(res)
      })

      fetch(`https://psa-support-management.onrender.com/products/${id}/tickets`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        console.log(res)
        setTicketsProduct(res)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [id])

  return (
    <div className="flex flex-row">
    <SideBar items={supportSideBarItems}></SideBar>
    <div className="container max-w-2xl mx-auto mt-8">
      {
      loading ? <div className="flex flex-row justify-center"> <Loading /> </div> :
     <>
      <h1 className="text-4xl mb-5 font-bold text-black text-center p-5" id="product" ></h1>
      <span className="text-xl font-bold text-black text-left p-3">Tickets del producto:</span>
      <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 p-2">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <HeaderItem title="Titulo" />
                <HeaderItem title="Severidad" />
                <HeaderItem title="Prioridad" />
                <HeaderItem title="Estado" />
                <HeaderItem title="Tipo" />
              </tr>
            </thead>
            <tbody>
              {ticketsProduct.map((tarea) => (
                <TicketGridRow key={tarea['id']} task={tarea} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-10 p-2">
        <MainButton href={"/soporte/productos"} title="Volver" />
      </div>
      </>
    }
    </div>
   </div>
  )
}