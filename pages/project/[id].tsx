import React from 'react';
import { useRouter } from 'next/router';

export default function Page() {
const router = useRouter();
const { id } = router.query;

return (
   <div className="flex  justify-center">
     <div className="border-4 border-blue-500" style={{ width: 900, height: 500, marginTop:"20px" }}>
       <h1 className="text-4xl mb-5 font-bold" style={{textAlign:'center', marginTop:"20px"}}>{id}</h1>
    </div>
   </div>
);
}
