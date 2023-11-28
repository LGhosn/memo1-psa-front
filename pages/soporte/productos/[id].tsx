import Loading from "@/components/loading";
import { MainButton } from "@/components/mainButton";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setElementInnerHtml } from "@/utils/utils";


export default function Producto() {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState([])
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!loading) {
      // @ts-ignore
      setElementInnerHtml("product", product.name + " " + product.version);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    if (id) {
      fetch(`https://psa-support-management.onrender.com/products/${id}`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        console.log(res)
        setProduct(res)
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
      <div className="flex flex-col border-4 border-gray-500 w-full h-11/12 p-9 mt-20 mb-10">
        <h1 className="text-4xl mb-5 font-bold text-black text-center" id="product" ></h1>
      </div>
      <div className="flex flex-row justify-center space-x-10">
        <MainButton href={"/soporte/productos"} title="Volver" />
      </div>
      </>
    }
    </div>
   </div>
  )
}