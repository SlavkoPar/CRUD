import React, { useEffect } from "react";

import { useApp } from '../AppData/useApp'

import { useStudent, StudentProvider } from "./useStudent";

import { EntityList } from "../Entity/EntityList";
import { StudentForm } from "./components/StudentForm";

import { IStudent } from "./types";
import { AutoSuggestEntity } from "../Common/AutoSuggest";
import { EntityActionTypes } from "../Entity/actions";

interface IPageProps {
}

export const Page: React.FC<IPageProps> = (props: IProps) => {
	const { state: appState } = useApp();

	const { state, dispatch, namesALL, getEntites, displayEntity, editEntity, removeEntity } = useStudent();
	const { query, entities, currentPage, pageCount } = state;
	
	useEffect(() => {
		getEntites(dispatch, query, currentPage, appState);
		console.log("getEntites", currentPage)
	}, [dispatch, getEntites, query, currentPage, appState]);

  	return (
		<div className="two-columns">
			<div className="a">
				<h3>Students</h3>
				<AutoSuggestEntity 
					namesALL={namesALL}
					onSelectQuery={(query) => dispatch({ type: EntityActionTypes.SET_QUERY,	query })} 
				/>
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
						<li key="img"><img src={entity.avatar} style={{height: '30px'}} alt="Slika"></img></li>,
						<li key="grades" style={{fontSize: 'small'}}>
							{entity.grades.length > 0 &&
								<span>
									Grades:&nbsp;
									{entity.grades.map(g => `${g.name}:${g.grade}`).join(', ')}
								</span>
							}
						</li>,
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

export const StudentPageExtended: React.FC<IProps> = (props: IProps) => {
	return (
		<StudentProvider>
			<Page />
		</StudentProvider>
  );
}




