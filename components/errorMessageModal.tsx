import {useState} from "react";

type Props = {
    action: () => void
    value?: string
  };
  
  export default function ErrorModal( {  action, value }: Props) {
    const [showModal, setShowModal] = useState(true);

    const handleClose = () => {
       setShowModal(false);
    };
    return (
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg  border border-red-500 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div
              className="flex bg-gray-50 dark:bg-gray-900 items-center px-6 py-4 text-sm  rounded-b shadow-sm">
              <svg viewBox="0 0 24 24" className="w-20 h-20 text-red-500 stroke-current" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12V8ZM12 16H12.01H12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <div className="ml-6">
                  <div className="text-xl font-bold text-left text-black dark:text-gray-50 mt-5">Error</div>
                  <div className="text-lg w-full text-gray-900 dark:text-gray-300 mt-1">¡Ups! Algo salió mal. {value ? value : " Revise los datos ingresados e inténtelo nuevamente."}</div>
              </div>
            </ div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" onClick={action} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                    Aceptar
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
  