import { IEntity, IEntityState } from "../Entity/types";

export interface IStudent extends IEntity {
	code: string;
	email: string;
	types: string[];
	avatar: string;
	grades: IStudentGrade[]
}

export interface IStudentState extends IEntityState<IStudent> {
	something: number[],
}

export interface IStudentGrade {
	gradeId: number,
	grade: number,
	name?: string
}

export type StudentGrade = Record<number, IStudentGrade[]>;
