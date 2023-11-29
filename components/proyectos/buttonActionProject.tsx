import React from 'react';
import { useState } from "react";
import { ModalDelete } from '../modalDelete';
import { ModifyStatus } from '../modifyStatus';
import { ProjectCreationForm } from './projectForm';

type Props = {
 title: string;
 id: string | any;
 actionType: string ;
};

export const ButtonActionProject = ( {title, id, actionType}: Props) => {
 const [open, setOpen] = useState(false);
 let urlBackPage =`/proyectos`
 let urlProject=`https://psa-project-managment.onrender.com/api/v1/projects/project/${id}`
 let urlProjectStatus=`https://psa-project-managment.onrender.com/api/v1/projects/project/${id}/status/`

 const openForm = () => {
    setOpen(!open);
 };

 const getActionComponent = () => {
    switch (actionType) {
      case 'deleteProject':
          return (
            <ModalDelete setOpenForm={setOpen} title={title} urlBackPage={urlBackPage} url={urlProject} />
        ); 
      case 'modifyProject':
        return (
          <ModifyStatus setOpenStatus={setOpen} title='proyecto' url= {urlProjectStatus} />
        ); 
      case 'createProject':
        return (
          <ProjectCreationForm setOpenForm={setOpen} title={title}/>
        ); 
      default:
        return null;
    }
 };

 return (
      <>
        <button onClick={openForm}>
          <div
              className={`flex items-center w-full p-2 transition duration-75 rounded-lg group bg-blue-200 hover:bg-blue-400 dark:text-white dark:hover:bg-blue-700`}
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