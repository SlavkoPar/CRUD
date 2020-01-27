import { IEntity, IEntityState } from "../Entity/types";
import { IGrade } from "../Grades/types";

export interface IStudent extends IEntity {
	code: string;
	email: string;
	types: string[];
	avatar: string;
	grades: IStudentGrade[]
}

export interface IStudentState extends IEntityState<IStudent> {
	gradesAll: Record<number, IGrade>  // will be loaded from AppData
}

export interface IStudentGrade {
	gradeId: number,
	grade: number,
	name?: string
}

export interface IStudentGradeIds {
	studentId: number,
	gradeId: number,
	grade?: number,
	gradeName?: string
}


