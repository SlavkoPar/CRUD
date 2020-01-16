import { IStudent, IStudentGradeIds } from "./types";
import { ActionsUnion, createActionPayload } from "../Entity/actionsAccepted";

export enum StudentActionTypes {
	GET_ALL = 'GET_ALL',
	STUDENT_ASSIGN_GRADE = 'STUDENT_ASSIGN_GRADE',
	STUDENT_REMOVE_GRADE = 'STUDENT_REMOVE_GRADE'
}
  
export const StudentActions = {
	getAll: createActionPayload<typeof StudentActionTypes.GET_ALL, { entities: IStudent[]; pageSize: number; }>
		(StudentActionTypes.GET_ALL),

	assignGrade: createActionPayload<typeof StudentActionTypes.STUDENT_ASSIGN_GRADE, IStudentGradeIds>
		(StudentActionTypes.STUDENT_ASSIGN_GRADE),
		
	removeGrade: createActionPayload<typeof StudentActionTypes.STUDENT_REMOVE_GRADE, IStudentGradeIds>
		(StudentActionTypes.STUDENT_REMOVE_GRADE),
 };

export type StudentAcceptedActions = ActionsUnion<typeof StudentActions>;



/*
In real app you are going to have something like this:

export const getAll: ActionCreator<
  ThunkAction<Promise<any>, IQuestionState, null, IGetAll>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
		const response = await axios.get('https://swapi.co/api/people/');
      dispatch({
        type: GET_ALL,
        entities: JSON.parse(JSON.stringify(response.data.results)),
      });
    } catch (err) {
      console.error(err);
    }
  }
}
*/