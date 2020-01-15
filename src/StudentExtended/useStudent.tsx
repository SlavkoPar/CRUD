
import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { IStudentState } from './types';
import { Reducer } from './studentReducer';
import jsonGrades from "../Grades/Grades.json"
import StudentGrades from './components/StudentGrades';


const initialState: IStudentState = { 
	entities: [],
	loading: false,
	formMode: 'display',
	canEdit: true,
	pageCount: 0,
	currentPage: 0,
	gradesAll: []
};

export interface IStudentContext {
	state: IStudentState;
	dispatch: Dispatch<any>; // AcceptedActions & StudentAcceptedActions>;
}

let StudentContext: React.Context<IStudentContext>;

interface IProps {
	children: React.ReactNode
}

export const StudentProvider: React.FC<IProps> = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState)

	if (StudentContext === undefined) {
		state.gradesAll = jsonGrades.map(grade => { 
			return { ...grade, words: grade.name.split(',')} 
		})
		StudentContext = createContext<IStudentContext>({ state, dispatch })
	}

  	return (
   	<StudentContext.Provider value={{ state, dispatch }}>
   		{children}
   	</StudentContext.Provider>
  	)
}

export const useStudent = () => useContext(StudentContext);