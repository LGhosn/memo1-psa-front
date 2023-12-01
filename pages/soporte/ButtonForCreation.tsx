import React from 'react';
import { useState } from 'react';
import TicketCreationForm from '@/pages/soporte/tickets/TicketCreationForm';

type Props = {
  title: string;
};

export default function ButtonForCreation( {title }: Props) {
  const [open, setOpen] = useState(false);

  const openForm = () => {
    setOpen(!open);
  };

  return (
      <>
        <button onClick={openForm}>
          <div
              className={`flex items-center p-2 transition duration-75 rounded-lg bg-blue-400 dark:hover:bg-blue-700 hover:bg-amber-100 dark:text-white`}
          >
          <span className={`flex-1 ml-2 whitespace-nowrap text-center font-bold`}>
            {title}
          </span>
          </div>
        </button>
        {open && (
            <>
              <TicketCreationForm openForm={open} setOpenForm={setOpen} title={title}/>
            </>
        )}
      </>
  )
}