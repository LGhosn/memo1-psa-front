import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SuccessfulNotification from "./successfulNotification";



type PropsForm = {
  title: string;
  setOpenStatus: (value: boolean) => void;
  url: string;
};

export function ModifyStatus({setOpenStatus , title, url}: PropsForm) {
  const router = useRouter();
  const [modalSuccessful, setModalSuccessful] = useState(false);

  function closeForm() {
    setOpenStatus(false);
    }
  
    function reloadPage(){
      router.reload() 
    }
  function updateState() {
    const state = document.getElementById("state");
    // @ts-ignore
    const stateValue=state[state.selectedIndex].value;

    fetch(url+`${stateValue}`, {
    method: 'PATCH'})
    .then((res) => {
      res.json()
      setModalSuccessful(true)
      
    })
}

  return (
    <>
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h1 className="text-xl font-bold leading-6 text-gray-900 mb-4">Modificacion de estados</h1>
                  <div className="mt-2">
                  <div>
                      <label htmlFor="email" className="text-base block font-medium text-gray-700">Estado de {title} </label>
                      <div className="mt-1">
                        <select id="state" name="state" autoComplete="state" className="border border-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-base  rounded-md text-gray-900">
                          <option value={"notStarted"}>No iniciado</option>
                          <option value={"inProgress"}>En progreso</option>
                          <option value={"completed"}>Finalizado</option>
                          <option value={"blocked"}>Bloqueado</option>
                        </select>
                      </div>
                    </div>    
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            
                <button  type="button" onClick={closeForm} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  Cancelar</button>
                  <button type="button" onClick={updateState} className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                   Modificar
                </button>
            </div>
            
            

          </div>
        </div>
      </div>
    </div>
    {modalSuccessful && (
      <SuccessfulNotification titleAction="modificado" actionPage={reloadPage}/>
    )}
    </>
  )
}