import {useEffect, useState} from "react";
import ProjectGridRow from "@/components/projectGridRow";
import { MainButton } from "@/components/mainButton"
import { Button } from "@/components/button"



function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Clientes() {
    const [list, setList] = useState([])

    useEffect(() => {
        // fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes")
        //     .then((res) => {
        //         console.log("Hola");
        //         return res.json()
        //     })
        //     .then((data) => {
        //         console.log("Chau");
        //         setList(data)
        //         console.log("Error");
        //     }) 
        // El fetch no corre de forma local porque tira un error de CORS (Cross Origin). 
        // Si el dominio ('anypoint.mulesoft...') no se corresponde de donde lo llaman (en este caso 'localhost'), va a tirar ese error. 
        // No se puede solucionar desde el lado del cliente
        setList([ // hice un request a esa direccion y me dio este resultado. lo dejo estatico
            {
                "Nombre": "Proyecto 1",
                "Estado": "Iniciado"  
            },
            {
                "Nombre": "Proyecto 2",
                "Estado": "No iniciado"  
            },
            {
                "Nombre": "Proyecto 3",
                "Estado": "Finalizado" 
            },
            {
                "Nombre": "Proyecto 4",
                "Estado": "Iniciado" 
            }
        ])
    }, [])

    return (
        <>
            {/* ACA EMPIEZA LA GRILLA */}

            <div className="container max-w-2xl mx-auto mt-8"
                style={{margin: "20px 0 0 50px"}}>
                <div className="mb-4">
                    <h1 className="text-3xl font-bold decoration-gray-400">Proyectos</h1>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="Nombre" />
                                    <HeaderItem title="Estado" />
                                </tr>
                                </thead>

                                <tbody>
                                {list.map((proyecto) => (
                                    <ProjectGridRow key={proyecto['Nombre']} proyecto={proyecto} />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex" ,flexDirection: "row", gap:'20rem', margin: "30px 0 0 80px"}}>
            <Button 
                title="Nuevo proyecto" 
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
