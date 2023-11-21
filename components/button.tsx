import React from 'react';
import { useState } from 'react';
import { Form } from './form';

type Props = {
  title: string;
};

export const Button = ( {title }: Props) => {
  const [open, setOpen] = useState(false);

  const openForm = () => {
    setOpen(!open);
  };

  return (
    <>
      <button onClick={openForm}>
        <div
          className={`flex items-center w-full p-2 transition duration-75 rounded-lg group bg-red-400 hover:bg-amber-100 dark:text-white dark:hover:bg-amber-700`}
          >
          <span className={`flex-1 ml-2 text-left whitespace-nowrap "font-bold"`}>
            {title}
          </span>
        </div>
      </button>
      {open && (
        <>
        <Form openForm={open} setOpenForm={setOpen} title="Nueva Tarea"/>
        </>
      )}
    </>
  )
}
