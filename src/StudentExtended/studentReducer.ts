import { AcceptedActions } from '../Entity/actions';
import { IStudentState, IStudent } from "./types";
import { entityReducer } from "../Entity/entityReducer";
import { StudentActionTypes, StudentAcceptedActions } from "./actions";

export const initialStudent: IStudent = { 
	entityId: 0, 
	name: '',
	url: '',
	code: '',
	email: '',
	avatar: 'https://img.pokemondb.net/artwork/diglett.jpg',
	types: [],
	grades: []
};

export const combineReducers: (
		entityReducer: React.Reducer<IStudentState, AcceptedActions>, 
		studentReducer: React.Reducer<IStudentState, StudentAcceptedActions>) => 
					React.Reducer<IStudentState, AcceptedActions & StudentAcceptedActions> = (entityReducer, studentReducer) => {
	return (prevState, action) => {
		
		// when overriden in Student, no need to call entityReducer
		if (action.type in StudentActionTypes)
			return studentReducer(prevState, action)

		const state = entityReducer(prevState, action);
		return studentReducer(state, action)
	 };	
}


export const studentReducer: (initialEntity: IStudent) => 
					React.Reducer<IStudentState, StudentAcceptedActions> = (initialEntity) => {
	return (state, action) =>  {
		switch(action.type) {

			case StudentActionTypes.GET_ALL:
				return {
					...state,
					entities: action.payload.entities,
					pageCount: Math.ceil(action.payload.entities.length / action.payload.pageSize)
				}

			case StudentActionTypes.STUDENT_ADD_GRADE:
				return {...state}
				
			case StudentActionTypes.STUDENT_REMOVE_GRADE:
				return {...state}
		
			default:
				//	throw new Error(`Unhandled action type: ${action!.type}`);
				// when combine reducers 
				return state
		}		
	}
}

export const Reducer = combineReducers(entityReducer(initialStudent), studentReducer(initialStudent));
