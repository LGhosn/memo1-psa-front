import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SuccessfulNotification from "./successfulNotification";

type PropsForm = {
  elementType: string;
  urlBackPage: string;
  url: string;
  setOpenForm: (value: boolean) => void
};

export function ModalDelete({ elementType, setOpenForm, urlBackPage, url }: PropsForm) {
  const router = useRouter();
  const [modalSuccessful, setModalSuccessful] = useState(false);
  function closeForm() {
    setOpenForm(false);
  }
  function backPage(){
    router.push(urlBackPage)
  }
  const [error, setError] = useState(null)
  function deleteTask() {
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
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
              
           
        
            
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-red-500 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg  text-black font-semibold dark:text-gray-400">
                  ¿Está seguro de querer borrar este {elementType}?</h3>
                <button type="button" onClick={deleteTask} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                    Si, estoy seguro.
                </button>
                <button  type="button" onClick={closeForm} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  No, cancelar.</button>
            </div>
            </div>
          </div>
        </div>
      </div>
      {modalSuccessful && (
        <SuccessfulNotification titleAction="borrado" actionPage={backPage}/>
         )}
      </>
  )
}