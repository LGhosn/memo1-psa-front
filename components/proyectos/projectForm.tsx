import {useEffect, useState} from "react";
import SuccessfulNotification from "../successfulNotification";
import { useRouter } from "next/router";

type PropsForm = {
  title: string;
  setOpenForm: (value: boolean) => void
};

export function ProjectCreationForm({ title, setOpenForm }: PropsForm) {
  const [response , setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalSuccessful, setModalSuccessful] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  function closeForm() { setOpenForm(false); }

  function reloadPage(){
    router.reload() 
  }

  useEffect( () => {
    setLoading(true)
    fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos")
        .then(response => response.json())
        .then(data => {
          setResponse(data);
          let select = document.getElementById('leader');
          // @ts-ignore
          let opts = document.getElementById('leader').length;
          if (opts < 3) {
            // @ts-ignore
            data?.map(e => {
              let opt = document.createElement('option');
              opt.value       = e['legajo'];
              opt.innerText   = e['Apellido'] + ' ' + e['Nombre'];
              // @ts-ignore
              select.appendChild(opt);
            });
          }
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false))
  }, []);


  function createProject() {
    let name = document.getElementById("name")
    let description = document.getElementById("description")
    let leader = document.getElementById("leader")
    let totalHours = document.getElementById("totalHours")

    const data = {
      // @ts-ignore
      "name": name.value,
      // @ts-ignore
      "description": description.value,
      // @ts-ignore
      "leader": leader[leader.selectedIndex].text,
      // @ts-ignore
      "totalHours": totalHours.value
    }

    fetch('https://psa-project-managment.onrender.com/api/v1/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Error en la creación del recurso');
          }
          return res.json();
        })
        .then(() => {
          setModalSuccessful(true);
        })
        // @ts-ignore
        .catch((error) => {
          console.error('Error:', error);
          setErrorMessage('No se pudo crear el proyecto.');
         })
  }


  return (
    <>
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/*el div de abajo modifica el tamaño  sm-*/}
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-2 sm:w-auto sm:max-w-xl">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start justify-center">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-bold leading-6 text-gray-900" id="modal-title">Nuevo proyecto</h3>
                  <div className="mt-2">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Titulo</label>
                      <div className="mt-1">
                        <textarea name="name" id="name" className="flex shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black-600 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900"></textarea>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Descripción</label>
                      <div className="mt-1">
                        <textarea name="description" id="description" className="flex shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black-600 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900"></textarea>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:black">Líder de proyecto</label>
                      <select id="leader" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        { error && <option>Error al obtener los empleados..</option>}
                        { loading && <option>Cargando empleados..</option>}
                      </select>
                    </div>
    

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Horas estimadas</label>
                      <div className="mt-1">
                        <textarea name="totalHours" id="totalHours" className="flex shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black-600 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900"></textarea>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="button" className={`bg-red-200 hover:bg-red-400 text-black font-bold py-2 px-4 rounded`}
                        onClick={closeForm}>Cancel</button>
                      <button type="button" className={`bg-blue-300 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded mr-10 `}
                        onClick={createProject}>Crear</button>
                    </div>

                    {errorMessage &&
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <span className="block sm:inline">{errorMessage}</span>
                      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                      </span>
                    </div>}

                  </div>
                </div>
                
              </div>
              
            </div>
            

          </div>
        </div>
      </div>
    </div>

      {modalSuccessful && (
        <>
        <SuccessfulNotification titleAction="Guardado" actionPage={reloadPage}/>
        </>
       )}  
     
      </>
  )
}