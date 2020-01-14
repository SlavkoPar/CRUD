import { IEntity, IEntityState } from "../Entity/types";

export interface IStudent extends IEntity {
	code: string;
	email: string;
	types: string[];
	avatar: string;
	grades: IGrade[]
}

export interface IStudentState extends IEntityState<IStudent> {
	something: number[],
}

export interface  IGrade {
	studentId: number,
	gradeId: number,
	grade: number
}