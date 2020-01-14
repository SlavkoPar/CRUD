import { IGrade, IStudent } from "./types";
import { ActionsUnion, createActionPayload } from "../Entity/actionsAccepted";

export enum StudentActionTypes {
	GET_ALL = 'GET_ALL',
	STUDENT_ADD_GRADE = 'STUDENT_ADD_GRADE',
	STUDENT_REMOVE_GRADE = 'STUDENT_REMOVE_GRADE'
}
  
export const StudentActions = {
	getAll: createActionPayload<typeof StudentActionTypes.GET_ALL, { entities: IStudent[]; pageSize: number; }>(StudentActionTypes.GET_ALL),
	addGrade: createActionPayload<typeof StudentActionTypes.STUDENT_ADD_GRADE, { grade: IGrade }>(StudentActionTypes.STUDENT_ADD_GRADE),
	removeGrade: createActionPayload<typeof StudentActionTypes.STUDENT_REMOVE_GRADE, { grade: IGrade }>(StudentActionTypes.STUDENT_REMOVE_GRADE),
 };

export type StudentAcceptedActions = ActionsUnion<typeof StudentActions>;


