type Props = {
  titleAction: string;
  actionPage: () => void;
};

export default function SuccessfulNotification( { titleAction, actionPage }: Props) {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg border border-green-500 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          
        <div className="flex bg-white dark:bg-gray-900 items-center px-6 py-4 text-sm rounded-b shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-green-500 stroke-current" fill="none"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <div className="ml-3">
            <div className="text-xl font-bold text-left text-black dark:text-gray-50 mt-5">Éxito</div>
            <div className="text-lg w-full text-gray-900 dark:text-gray-300 mt-1"> ¡Todo listo! Los datos se han {titleAction} correctamente. </div>
        </div>
    </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" className={`bg-white hover:bg-green-400 text-black font-bold py-2 px-4 border border-grey-700 rounded`} 
            onClick={actionPage}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
