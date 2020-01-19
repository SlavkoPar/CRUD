import { AcceptedActions } from '../Entity/actions';
import { IStudentState, IStudent } from "./types";
import { entityReducer } from "../Entity/entityReducer";
import { StudentActionTypes, StudentAcceptedActions } from "./actions";
import { saveStorage } from './StudentPage';

export const initialStudent: IStudent = { 
	id: 0, 
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
			React.Reducer<
				IStudentState, 
				AcceptedActions & StudentAcceptedActions
			> = (entityReducer, studentReducer) => {
	return (prevState, action) => {
		
		// when action is overriden in studentReducer, no need to call entityReducer
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

			case StudentActionTypes.GET_ALL:  {
				return {
					...state,
					entities: action.payload.entities,
					pageCount: Math.ceil(action.payload.entities.length / action.payload.pageSize)
				}
			}

			case StudentActionTypes.STUDENT_ASSIGN_GRADE: {
				const { studentId, gradeId } = action.payload
				const students = state.entities.map(student => 
					student.id !== studentId ?
						{...student} :
						{...student, grades: [...student.grades, { 
								name: state.gradesAll[gradeId].name,
								gradeId,
								grade: 0
							}]
						}
				)
				saveStorage(JSON.stringify(students))
				return {
					...state,
					entities: students,
					entity: { ...students.find(student => student.id === studentId)! }
				}				
			}
	
			case StudentActionTypes.STUDENT_REMOVE_GRADE: {
				const { studentId, gradeId } = action.payload
				const students = state.entities.map(student => 
					student.id !== studentId ?
						{...student} :
						{...student, grades: student.grades.filter(grade=>grade.gradeId !== gradeId)}
				)
				saveStorage(JSON.stringify(students))
				return {
					...state,
					entities: students,
					entity: { ...students.find(student => student.id === studentId)! }
				}				
			}
			
		
			default:
				//	throw new Error(`Unhandled action type: ${action!.type}`);
				// when combine reducers 
				return state
		}		
	}
}

export const Reducer = combineReducers(entityReducer(initialStudent), studentReducer(initialStudent));
