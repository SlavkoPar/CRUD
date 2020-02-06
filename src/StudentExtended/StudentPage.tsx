import React, { useEffect } from "react";

import { useApp } from '../AppData/useApp'

import { useStudent, StudentProvider } from "./useStudent";

import { EntityList } from "../Entity/EntityList";
import { StudentForm } from "./components/StudentForm";

import { IStudent, IStudentGrade } from "./types";
import { IGrade } from "../Grades/types";

interface IPageProps {
	query: string;
}

const studentJoinGrades = (student: IStudent, gradesAll: Record<number, IGrade>) : IStudentGrade[]=> {
	if (student === undefined || student.grades.length === 0)
		return [];
	return student.grades.map(sg => ({ ...sg, name: gradesAll[sg.gradeId].name }))
}

export const Page: React.FC<IPageProps> = (props: IProps) => {
	const { state: appState } = useApp();
	const { gradesAll } = appState;

	const { state, dispatch, getEntites, displayEntity, editEntity, removeEntity } = useStudent();
	const { entities, currentPage, pageCount } = state;
	
	useEffect(() => {
		getEntites(props.query, currentPage);
		console.log("getEntites", currentPage)
		// per page
		entities.map(student => student.grades = studentJoinGrades(student, gradesAll));
	}, [getEntites, props.query, currentPage, entities, gradesAll]);

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
	query: string
}

export const StudentPageExtended: React.FC<IProps> = (props: IProps) => {
	return (
		<StudentProvider>
			<Page query={props.query} />
		</StudentProvider>
  );
}




