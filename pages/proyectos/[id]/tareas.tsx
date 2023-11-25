import {useEffect, useState} from "react";
import TareaGridRow from "@/components/tareasGridRow";
import { MainButton } from "@/components/mainButton";
import { Button } from "@/components/button"
import { useRouter } from 'next/router';




function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Tareas() {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const taskId = router?.query?.id as string;
    useEffect(() => {
        fetch(`https://psa-project-managment.onrender.com/api/v1/tasks/project/${taskId}`)
        .then((res) => {
        return res.json()
        }).then((res) => {
            setList(res)
            setLoading(false)
            })
    }, [])

    return (
        <>
            <div className="container max-w-2xl mx-auto mt-8"
                style={{margin: "20px 0 0 50px"}}>
                <div className="mb-4">
                    <h1 className="text-3xl font-bold decoration-gray-400">Tareas de *insertar nombre proyecto*
                    </h1>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="Nombre" />
                                    <HeaderItem title="Estado" />
                                    <HeaderItem title=""/>
                                </tr>
                                </thead>

                                <tbody>
                                {list.map((tarea) => (
                                    
                                    <TareaGridRow key={tarea['id']} tarea={tarea} />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex" ,flexDirection: "row", gap:'20rem', margin: "30px 0 0 80px"}}>
            <Button 
                title="Nueva tarea" 
                height = "50px"
                width = "150px"
                fontSize='1rem'/>
            <MainButton
                title="Volver" 
                href="/"
                height = "50px"
                width = "150px"
                fontSize='1.2rem'/>
      </div>
        </>
    )
}
