import React from 'react';
import { useState } from 'react';
import { Form } from './form';

type Props = {
  title: string;
  height: string;
  width: string;
  fontSize: string;
};

export const Button = ( {title,height,width,fontSize }: Props) => {
  const [open, setOpen] = useState(false);

  const openForm = () => {
    setOpen(!open);
  };

  return (
    <>
      <button onClick={openForm}>
        <div
          className={`flex items-center w-full p-2 transition duration-75 rounded-lg group bg-blue-200 hover:bg-blue-400 dark:text-white dark:hover:bg-amber-700`}
          style={{
            height,
            width,
          }}
          >
          <span className={`flex-1 ml-2 text-left whitespace-nowrap "font-bold"`}
          style={{
            fontSize,
            textAlign: "center"
         }}>
            {title}
          </span>
        </div>
      </button>
      {open && (
        <>
        <Form openForm={open} setOpenForm={setOpen} title={title}/>
        
        </>
      )}
    </>
  )
}
"<Card openCard={open} setOpenCard={setOpen} title={title}/>"