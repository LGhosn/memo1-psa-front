import {useEffect, useState} from "react";


type PropsForm = {
  title: string;
  openForm: boolean
  setOpenForm: (value: boolean) => void
};

export function TicketCreationForm({ title, openForm, setOpenForm }: PropsForm) {

  const [response , setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    setLoading(true)
    fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes")
        .then(response => response.json())
        .then(data => {
          setResponse(data);
          let select = document.getElementById('selectToLoad');
          // @ts-ignore
          let opts = document.getElementById('selectToLoad').length;
          if (opts < 3) {
            // @ts-ignore
            data?.map(e => {
              let opt = document.createElement('option');
              opt.innerText = e['razon social'];
              // @ts-ignore
              select.appendChild(opt);
            });
          }
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false))
  }, []);

  function toggleForm() { setOpenForm(!openForm); }

  function closeForm() { setOpenForm(false); }

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
                    <div className="mt-2">
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:black">Cliente</label>
                        <select id="selectToLoad" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          { error && <option>Error al obtener clientes..</option>}
                          { loading && <option>Cargando clientes..</option>}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                          Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <div className="mt-1">
                          <textarea name="description" id="description" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900"></textarea>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                        <div className="mt-1">
                          <input type="date" name="date" id="date" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={closeForm}>
                  Cancel
                </button>
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Crear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}