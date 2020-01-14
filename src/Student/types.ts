import { IEntity, IEntityState } from "../Entity/types";

export interface IStudent extends IEntity {
	code: string;
	email: string;
	types: string[];
	avatar: string;
}

export interface IStudentState extends IEntityState<IStudent> {
	something: number[]
}

