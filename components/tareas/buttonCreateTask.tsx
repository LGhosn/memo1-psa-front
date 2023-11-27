import React from 'react';
import { useState } from 'react';
import { TaskCreationForm } from './taskForm';

type Props = {
  title: string;
  projectId: string;
};

export const TaskCreationButton = ( {title,projectId }: Props) => {
  const [open, setOpen] = useState(false);

  const openForm = () => {
    setOpen(!open);
  };

  return (
      <>
        <button onClick={openForm}>
          <div
              className={`flex items-center w-full p-2 transition duration-75 rounded-lg group bg-blue-400 hover:bg-amber-100 dark:text-white dark:hover:bg-blue-700`}
          >
          <span className={`flex-1 ml-2 text-left whitespace-nowrap "font-bold"`}>
            {title}
          </span>
          </div>
        </button>
        {open && (
            <>
              <TaskCreationForm openForm={open} setOpenForm={setOpen} title={title} projectId={projectId} />
            </>
        )}
      </>
  )
}