import React, { useEffect } from "react";

import { StudentProvider, useStudent } from "./useStudent";

import { EntityList } from "../Entity/EntityList";
import { StudentForm } from "./components/StudentForm";

import { IStudent } from "./types";
import { useApp } from "../AppData/useApp";

interface IPageProps {
}

export const Page: React.FC<IPageProps> = (props: IProps) => {
	const { state: appState } = useApp();
	
	const { state, dispatch, getEntites, displayEntity, editEntity, removeEntity } = useStudent();
	const { query, entities, currentPage, pageCount } = state;
	
	useEffect(() => {
		getEntites(dispatch, query, currentPage, appState);
		console.log("getEntites", currentPage)
	}, [dispatch, getEntites, query, currentPage, appState]);
	

  	return (
		<div className="two-columns">
			<div className="a">
				<h3>Students</h3>
				<EntityList 
					entities={entities}
					dispatch={dispatch}
					displayEntity={displayEntity}
					editEntity={editEntity}
					removeEntity={removeEntity}
					currentPage={currentPage}
					pageCount={pageCount}
					renderColumns = {(entity: IStudent) => [
						<li key="types" style={{minWidth: '60%'}}>{entity.types.join(', ')}</li>,
						<li key="img"><img src={entity.avatar} style={{height: '30px'}} alt="Slika"></img></li>
					]}
				 />
			</div>
			<div className="b">
				<StudentForm />
			</div>
		</div>    		
  );
}


interface IProps {
}

export const StudentPage: React.FC<IProps> = () => {
  return (
    <StudentProvider>
		 <Page />
    </StudentProvider>
  );
}

