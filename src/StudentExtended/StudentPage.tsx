import React, { useEffect, useState } from "react";
import jsonStudents from "./Students.json"

import { StudentProvider } from "./useStudent";
import { useStudent } from "./useStudent";

import { EntityList } from "../Entity/EntityList";
import { StudentForm } from "./components/StudentForm";

import { IStudent, IStudentGrade } from "./types";
import { EntityActions } from "../Entity/actions";
import { StudentActions } from "./actions";
import { IGrade } from "../Grades/types";

interface IPageProps {
	query: string;
}

const studentJoinGrades = (student: IStudent, gradesAll: Record<number, IGrade>) : IStudentGrade[]=> {
	if (student === undefined || student.grades.length === 0)
		return [];
	return student.grades.map(sg => { 
		return { ...sg, name: gradesAll[sg.gradeId].name }
	})
}

export const Page: React.FC<IPageProps> = (props: IProps) => {
	const { state, dispatch } = useStudent();
	const { entities, currentPage, pageCount, gradesAll } = state;

	const [currentData, setCurrentData] = useState<IStudent[]>([]);
	const pageSize = 9;
	
	useEffect(() => {
		dispatch(EntityActions.setLoading(true))
		localStorageStudents = [...jsonStudents]
		const entities: IStudent[] = localStorageStudents
		dispatch(StudentActions.getAll({ entities, pageSize }))
		dispatch(EntityActions.setLoading(false))
	}, [dispatch, props.query]);

	useEffect(() => {
		const offset = currentPage * pageSize
		const currData = entities.slice(offset, offset + pageSize);
		setCurrentData(currData);
		// per page
		currData.map(student => student.grades = studentJoinGrades(student, gradesAll));
	}, [entities, currentPage, gradesAll]);



  	return (
		<div className="two-columns">
			<div className="a">
				<h3>Students</h3>
				<EntityList 
					entities={currentData}
					dispatch={dispatch}
					saveStorage={saveStorage}
					currentPage={currentPage}
					pageCount={pageCount}
					renderColumns = {(entity: IStudent) => [
						<li key="types" style={{minWidth: '60%'}}>{entity.types.join(', ')}</li>,
						<li key="img"><img src={entity.avatar} style={{height: '30px'}} alt="Slika"></img></li>,
						<li key="grades" style={{fontSize: 'small'}}>
							{entity.grades.length > 0 &&
								<span>
									Grades:&nbsp;
									{entity.grades.map(g => { return `${g.name}:${g.grade}`}).join(', ')}
								</span>
							}
						</li>,
					]}
				 />
			</div>
			<div className="b">
				<StudentForm saveStorage={saveStorage}	/>
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

let localStorageStudents: IStudent[] = []

export const saveStorage = (s: string) => {
	localStorageStudents = JSON.parse(s)
}


