import React from 'react';
import { useState } from 'react';
import { State } from './state';

type Props = {
  title: string;
};

export const StateButton = ( {title}: Props) => {
  const [open, setOpen] = useState(false);

  const openForm = () => {
    setOpen(!open);
  };

  return (
    <>
      <button onClick={openForm}>
        <div
          className={`flex items-center w-full p-2 transition duration-75 rounded-lg group bg-blue-200 hover:bg-blue-400 dark:text-white dark:hover:bg-amber-700`}
         
          >
          <span className={`flex-1 ml-2 text-left whitespace-nowrap "font-bold"`}
          >
            {title}
          </span>
        </div>
      </button>
      {open && (
        <>
        <State openStates={open} setOpenStates={setOpen} title={title}/>
        
        </>
      )}
    </>
  )
}
