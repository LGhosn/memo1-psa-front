import { useState } from "react";
import Link from "next/link";

type PropsForm = {
  title: string;
  projectId: string;
  openForm: boolean;
  setOpenForm: (value: boolean) => void
};

export function ModalDeleteProject({ title, projectId, openForm, setOpenForm }: PropsForm) {
  function closeForm() {
    setOpenForm(false);
  }
  const [error, setError] = useState(null)
  function deleteProject() {
   
    const data = {
      // @ts-ignore
      "id": projectId
    }
    console.log(data)
    // @ts-ignore
    fetch(`https://psa-project-managment.onrender.com/api/v1/projects/project/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        })
        // @ts-ignore
        .catch((error) => setError("No se pudo crear el ticket"))
  }


  return (
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
                    <p>¿Está seguro de querer eliminar?</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={closeForm}>
                  Cancelar
                </button>
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={deleteProject}>
                    Borrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}