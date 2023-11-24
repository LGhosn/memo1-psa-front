import React from 'react';
import { useRouter } from 'next/router';
import { MainButton } from '@/components/mainButton';
import { StateButton } from '@/components/stateButton';
import {useEffect, useState} from "react";

export default function Page() {
  const [proyecto, setList] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://psa-project-managment.onrender.com/api/v1/projects/project/name/${id}`)

        .then((res) => {
        return res.json()
        }).then((res) => {
            setList(res)
            setLoading(false)
            })
    }, [])

const router = useRouter();
const { id } = router.query;
/*La idea es usar el id de la pagina para traer el proyecto*/
return (
   <div className="flex  justify-center">
     <div className="border-4 border-blue-500" style={{ width: 900, height: 500, marginTop:"20px" }}>
       <h1 className="text-4xl mb-5 font-bold" style={{textAlign:'center', marginTop:"20px"}}>{id}</h1>
       <div className="flex items-center text-gray-900">Descripcion:{proyecto['description']}</div>
        <div className="flex items-center text-gray-900">Fecha de inicio:{proyecto['creationDate']}</div>
        <div className="flex items-center text-gray-900">Horas estimadas:{proyecto['totalHours']}</div>
        <div className="flex items-center text-gray-900">Estado:{ /*proyecto[status]*/}</div>
        <div className="flex items-center text-gray-900">Lider:{proyecto['leader']}</div>
       <div className='flex justify-center'>
        <MainButton href= {`/proyectos/${proyecto['id']}/tareas`} title= "Ver Tareas"
                    height = "50px"
                    width = "120px"
                    fontSize='1rem'/>
       </div>
       <MainButton href= {`/proyectos`} title= "Volver"
                    height = "50px"
                    width = "120px"
                    fontSize='1rem'/>
      <StateButton 
                title="Modificar" 
                height = "50px"
                width = "150px"
                fontSize='1rem'/>
       
    </div>
   </div>
);
}


