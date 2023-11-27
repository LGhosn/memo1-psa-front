import { ActionButton } from "./actionButton";

type Props = {
  deleteTicket: () => void;
  cancelDelete: () => void;
  accion: string;
};

export default function Notification( { deleteTicket, cancelDelete, accion }: Props) {
  return (
  <div className="flex flex-row justify-center items-center">
    <div className="dark:bg-gray-800 sm:p-5 p-4 w-full max-w-2xl h-full md:h-auto">
      <h1 className="text-2xl text-center font-bold mb-5">¿Desea {accion} el ticket?</h1>
      <div className="flex flex-row justify-center space-x-10">
        <ActionButton onClick={deleteTicket} title= {accion.charAt(0).toUpperCase() + accion.slice(1)} style="bg-red-400 dark:hover:bg-red-700"/>
        <ActionButton onClick={cancelDelete} title= "Cancelar"/>
      </div>
    </div>
  </div>
  )
}
