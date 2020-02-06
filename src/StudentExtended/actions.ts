import { IStudentGradeIds, IStudent } from "./types";
import { IAppState } from "../AppData/types";

export enum StudentActionTypes {
	GET_ENTITIES = 'GET_ENTITIES', // override entity
	STUDENT_ASSIGN_GRADE = 'STUDENT_ASSIGN_GRADE',
	STUDENT_REMOVE_GRADE = 'STUDENT_REMOVE_GRADE'
}

export interface IStudentGetEntities {
	type: StudentActionTypes.GET_ENTITIES;
	payload: {
		entities: IStudent[]; 
		pageCount: number;
		appState: IAppState;
	}
}

export interface IAssignGrade {
	type: StudentActionTypes.STUDENT_ASSIGN_GRADE, 
	studentGradeIds: IStudentGradeIds
}

export interface IRemoveGrade {
	type: StudentActionTypes.STUDENT_REMOVE_GRADE, 
	studentGradeIds: IStudentGradeIds
}


export type StudentAcceptedActions = IStudentGetEntities | IAssignGrade | IRemoveGrade
