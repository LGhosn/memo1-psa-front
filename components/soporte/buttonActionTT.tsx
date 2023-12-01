import React from 'react';
import { useState } from "react";
import { TaskTicketCreationForm } from './ttCreationForm';
import { useRouter } from 'next/router';


type Props = {
 title: string;
 ticketId: string | any;
 style?: any;
};

export const ButtonActionTaskTicket = ( {title, ticketId, style}: Props) => {
  const router = useRouter()
 const [open, setOpen] = useState(false);
 const openForm = () => {
    setOpen(!open);
 };

 const getActionComponent = () => {
    return (
      <TaskTicketCreationForm  setOpenForm={setOpen} title={title} ticketId={ticketId}/>
    );
 };

 return (
      <>
        <button onClick={openForm} className={`${style} focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}>
          <span className={`flex-1 flex flex-row ml-2 text-left whitespace-nowrap font-bold text-black`}>
            {title}
          </span>
        </button>
        {open && getActionComponent()}
      </>
 )
}