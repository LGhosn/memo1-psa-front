import React from 'react';
import { useState } from "react";
import { ModalDelete } from '../modalDelete';
import { ModifyStatus } from '../modifyStatus';
import { TaskCreationForm } from './taskForm';

type Props = {
 title: string;
 taskId: string | any;
 projectId: string | any;
 actionType: string ;
 style: any;
};

export const ButtonActionTask = ( {title, taskId, projectId, actionType, style}: Props) => {
 const [open, setOpen] = useState(false);
 let urlTaskStatus =`https://psa-project-managment.onrender.com/api/v1/tasks/task/${taskId}/status/`;
 let urlBackPage =`/proyectos/${projectId}/tareas`
 let urlTask=`https://psa-project-managment.onrender.com/api/v1/tasks/task/${taskId}`
 const openForm = () => {
    setOpen(!open);
 };

 const getActionComponent = () => {
    switch (actionType) {
      case 'deleteTask':
        return (
          <ModalDelete setOpenForm={setOpen} elementType='tarea' urlBackPage={urlBackPage} url={urlTask} />
        );
      case 'modifyTask':
        return (
          
          <ModifyStatus setOpenStatus={setOpen} title='tarea' url= {urlTaskStatus} />
        );
      case 'createTask':
          return (
            <TaskCreationForm  setOpenForm={setOpen} title={title} projectId={projectId} />
          );
      default:
        return null;
    }
 };

 return (
      <>
        <button onClick={openForm} className={`${style} focus:ring-2 focus:outline-none focus:ring-blue-300`}>
          <div
              className={`flex items-center w-full p-2 transition duration-75 rounded-lg-xl group  dark:text-white`}
          >
          <span className={`flex-1 ml-2 text-left whitespace-nowrap "font-bold"`}>
            {title}
          </span>
          </div>
        </button>
        {open && getActionComponent()}
      </>
 )
}