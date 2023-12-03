
type Props = {
  title: string;
  back: boolean
  onClick?: () => void
}

export default function StandardButton( {title, back, onClick}:Props) {
  return(
    <button  type="button" onClick={onClick} className="flex flex-row text-gray-700 bg-white hover:bg-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg  text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
    { back ? 
      <>
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5 mt-1 bi bi-arrow-left-circle mr-2" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
      </svg>
      <div className="text-base">{title}</div>
      </>

      :
      <>
      <div className="text-base">{title}</div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5  bi bi-arrow-left-circle ml-2 mt-1" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
      </svg>
      </>
    }
  </button>
  )
}