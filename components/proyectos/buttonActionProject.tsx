import React from 'react';
import { useState } from "react";
import { ModalDelete } from '../modalDelete';
import { ModifyStatus } from '../modifyStatus';
import { ProjectCreationForm } from './projectForm';

type Props = {
 title: string;
 id: string | any;
 actionType: string ;
 style: any;
};

export const ButtonActionProject = ( {title, id, actionType, style}: Props) => {
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
            <ModalDelete setOpenForm={setOpen} elementType='proyecto' urlBackPage={urlBackPage} url={urlProject} />
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
        <button onClick={openForm} className={`${style} focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}>
          <span
          className={`flex-1 ml-2 text-left whitespace-nowrap font-bold text-black`}>
              {title}
          </span>
        </button>
        {open && getActionComponent()}
      </>
 )
}