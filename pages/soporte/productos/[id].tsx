import Loading from "@/components/loading";
import { MainButton } from "@/components/mainButton";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setElementInnerHtml } from "@/utils/utils";
import HeaderItem from "@/components/headerItem";
import TicketGridRow from "@/components/ticketGridRow";
import ButtonForCreation from "../ButtonForCreation";
import { ActionButton } from "@/components/actionButton";
import StandardTicketTable from "@/components/soporte/standardTicketTable";
import StandardButton from "@/components/standardButton";


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
    <div className="container max-w-7xl mx-auto mt-8 space-y-50">
    <div className="mb-4">
        <h1 className="text-2xl text-black font-bold decoration-black text-center" id="product"></h1>
      </div>
      <div className="mb-4">
        <h1 className="text-2xl text-black font-bold decoration-black">Tickets del producto:</h1>
      </div>
      {
      loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
      <>
      <StandardTicketTable list={ticketsProduct} />
      <div className="flex justify-between mt-5">
        <StandardButton title="Volver" onClick={() => router.back()} back/>
        {/* @ts-ignore */}
        <ButtonForCreation title="Crear ticket" />
      </div>
      </>
      }
    </div>
  </div>
  )
}