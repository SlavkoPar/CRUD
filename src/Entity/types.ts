
export interface IEntity {
	id: number; 
	name: string;
	url: string;
}

export interface IEntityState<T> {
	readonly entities: T[];
	readonly entity?: T;
	loading: boolean;
	formMode: string;
	canEdit: boolean;
	// list
	pageCount: number;
	currentPage: number;
}
