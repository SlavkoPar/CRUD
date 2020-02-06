import { IStudentState, IStudent } from "./types";
import { entityReducer } from "../Entity/entityReducer";
import { StudentActionTypes, StudentAcceptedActions } from "./actions";
import { EntityAcceptedActions } from "../Entity/actions";

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
		entityReducer: React.Reducer<IStudentState, EntityAcceptedActions>, 
		studentReducer: React.Reducer<IStudentState, StudentAcceptedActions>) => 
			React.Reducer<
				IStudentState, 
				EntityAcceptedActions & StudentAcceptedActions
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

			case StudentActionTypes.GET_ENTITIES:  {
				const { entities, pageCount } = action.payload;
				return {
					...state,
					entities,
					pageCount
				}
			}

			case StudentActionTypes.STUDENT_ASSIGN_GRADE: {
				const { studentId, gradeId, gradeName } = action.studentGradeIds
				const students = state.entities.map(student => 
					student.id !== studentId ?
						{...student} :
						{...student, grades: [...student.grades, { 
								name: gradeName,
								gradeId,
								grade: 0
							}]
						}
				)
				return {
					...state,
					entities: students,
					entity: { ...students.find(student => student.id === studentId)! }
				}				
			}
	
			case StudentActionTypes.STUDENT_REMOVE_GRADE: {
				const { studentId, gradeId } = action.studentGradeIds
				const students = state.entities.map(student => 
					student.id !== studentId ?
						{...student} :
						{...student, grades: student.grades.filter(grade=>grade.gradeId !== gradeId)}
				)
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
