import React from 'react';
import { useRouter } from 'next/router';

export default function Page() {
const router = useRouter();
const { id } = router.query;

return (
   <div className="flex  justify-center">
     <div className="border-4 border-blue-500" style={{ width: 900, height: 500, marginTop:"20px" }}>
       <h1 className="text-4xl mb-5 font-bold" style={{textAlign:'center', marginTop:"20px"}}>{id}</h1>
       <div className="flex items-center text-gray-900">Descripcion:{/*tarea[description]*/}</div>
        <div className="flex items-center text-gray-900">Fecha de inicio:{/*tarea[creationDate]*/}</div>
        <div className="flex items-center text-gray-900">Horas estimadas:{/*tarea[totalHours]*/}</div>
        <div className="flex items-center text-gray-900">Estado:{/*tarea[status]*/}</div>
        <div className="flex items-center text-gray-900">Responsable asignado:{/*tarea[assignedTo]*/}</div>
    </div>
   </div>
);
}
