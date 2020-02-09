
import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { IStudentState } from './types';
import { entityReducer } from '../Entity/entityReducer';
import { IStudent } from './types';
import { EntityAcceptedActions } from '../Entity/actions';
import { EntityActions } from '../Entity/EntityActions';
import jsonStudents from './Students.json'

export const initialStudent: IStudent = { 
	id: 0, 
	name: '',
	url: '',
	code: '',
	email: '',
	avatar: 'https://img.pokemondb.net/artwork/diglett.jpg',
	types: []
};


const initialState: IStudentState = { 
	entities: [],
	loading: false,
	formMode: 'display',
	canEdit: true,
	pageCount: 0,
	currentPage: 0,
	something: [1, 2, 3]
};

export interface IStudentContext {
	state: IStudentState;
	dispatch: Dispatch<EntityAcceptedActions>;
}

let StudentContext: React.Context<IStudentContext>;

interface IProps {
	children: React.ReactNode
}

let entityActions: EntityActions;

export const StudentProvider: React.FC<IProps> = ({ children }) => {
	const [state, dispatch] = useReducer(entityReducer<IStudentState, IStudent>(initialStudent), initialState)

	if (StudentContext === undefined) {
		entityActions = new EntityActions({
			storageName: 'Students',
			getFromJSON: () => [...jsonStudents],
			pageSize: pageSize,
			baseURL: 'https//abc.com/students/'
		});
		
		StudentContext = createContext<IStudentContext>({ state, dispatch })
	}

  	return (
   	<StudentContext.Provider value={{ state, dispatch }}>
   		{children}
   	</StudentContext.Provider>
  	)
}

const pageSize = 9;

export const useStudent = () => {
	const context = useContext(StudentContext);
	if (!context) {
		throw new Error('useStudent must be used within a StudentProvider')
	}

	const { state, dispatch } = context;

	const { getEntites, displayEntity, editEntity, removeEntity, storeEntity } = entityActions;

	return { state, dispatch, getEntites, displayEntity, editEntity, removeEntity, storeEntity };
}











