import React from 'react';
import { useState } from "react";
import { ModalDelete } from '../modalDelete';
import { ModiftProject } from './modifyProject';
import { ProjectCreationForm } from './projectForm';

type Props = {
 proyecto?: any;
 id: string | any;
 actionType: string ;
 style: any;
 icon?:any;
 title?: string;
};

export const ButtonActionProject = ( {title,proyecto, id, actionType, style, icon}: Props) => {
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
          <ModiftProject elemento={proyecto} setOpenStatus={setOpen} title='proyecto' url= {urlProjectStatus} />
        ); 
      case 'createProject':
        return (
          <ProjectCreationForm setOpenForm={setOpen}/>
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