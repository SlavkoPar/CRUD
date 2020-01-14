import React, { useEffect, useState } from "react";
import jsonStudents from "./Students.json"
import jsonGrades from "../Grades/Grades.json"

import { StudentProvider } from "./useStudent";
import { useStudent } from "./useStudent";

import { EntityList } from "../Entity/EntityList";
import { StudentForm } from "./components/StudentForm";

import { IStudent, IStudentGrade, StudentGrade } from "./types";
import { EntityActions } from "../Entity/actions";
import { StudentActions } from "./actions";

interface IPageProps {
	query: string;
}

const studentJoinGrades = (student: IStudent | undefined) : IStudentGrade[]=> {
	if (student === undefined || student.grades.length === 0)
		return [];
	return student.grades.map(sg => { 
		return { ...sg, name: jsonGrades.find(grade => grade.entityId === sg.gradeId)?.name }
	})
}

export const Page: React.FC<IPageProps> = (props: IProps) => {
	const { state, dispatch } = useStudent();
	const { entities, currentPage, pageCount } = state;

	const [currentData, setCurrentData] = useState<IStudent[]>([]);
	const pageSize = 9;

	const [studentGrades, setStudentGrades] = useState<StudentGrade>([]);

		
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
		const studentsGrades: StudentGrade = {}
		currData.map(student => studentsGrades[student.entityId] = studentJoinGrades(student));
		setStudentGrades(studentsGrades)
	 }, [entities, currentPage]);



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
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					renderColumns = {(entity: IStudent) => [
						<li key="types" style={{minWidth: '60%'}}>{entity.types.join(', ')}</li>,
						<li key="img"><img src={entity.avatar} style={{height: '30px'}} alt="Slika"></img></li>,
						<li key="grades" style={{fontSize: 'small'}}>
							{studentGrades[entity.entityId].length > 0 &&
								<span>
									Grades:&nbsp;{
									studentGrades[entity.entityId].map(g => {	return `${g.name}:${g.grade}`}).join(', ')
									}
								</span>
							}
						</li>,
					]}
				 />
			</div>
			<div className="b">
				<StudentForm  saveStorage={saveStorage} />
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


