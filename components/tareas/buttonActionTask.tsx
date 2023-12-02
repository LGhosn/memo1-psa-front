import React from 'react';
import { useState } from "react";
import { ModalDelete } from '../modalDelete';
import { ModifyTask } from './modifyTask';
import { TaskCreationForm } from './taskForm';

type Props = {
 title?: string;
 taskId: string | any;
 projectId: string | any;
 actionType: string ;
 style: any;
 icon?: any;
 task?: any;
};

export const ButtonActionTask = ( {title, taskId, projectId, actionType, style, icon, task}: Props) => {
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
          
          <ModifyTask task={task} setOpenStatus={setOpen} title='tarea' url= {urlTaskStatus} />
        );
      case 'createTask':
          return (
            <TaskCreationForm  setOpenForm={setOpen} projectId={projectId} />
          );
      default:
        return null;
    }
 };

 return (
      <>
        <button onClick={openForm} className={`${style} justify-center focus:ring-2 focus:outline-none  dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}>
          <span
          className={`flex-1 ml-2 text-left whitespace-nowrap font-bold text-black justify-center`}>
              {icon}
              {title}
          </span>
        </button>
        {open && getActionComponent()}
      </>
 )
}