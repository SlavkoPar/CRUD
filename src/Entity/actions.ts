import { IEntity } from "./types";

export enum EntityActionTypes {
	GET_ENTITIES = 'GET_ENTITIES',
	SET_LOADING = 'SET_LOADING',
	FAIL = 'FAIL',
	ADD = 'ADD',
	DISPLAY = 'DISPLAY',
	CLOSE_FORM = 'CLOSE_FORM',
	EDIT = 'EDIT',
	REMOVE = 'REMOVE',
  	STORE = 'STORE',
	CANCEL = 'CANCEL',
	GO_TO_PAGE = 'GO_TO_PAGE'
}


export interface IEntitySetLoading { 
	type: EntityActionTypes.SET_LOADING, 
	loading: boolean
}

export interface IEntityGetEntities {
	type: EntityActionTypes.GET_ENTITIES;
	payload: {
		entities: IEntity[]; 
		pageCount: number;
	}
}

export interface IEntityAdd { 
	type: EntityActionTypes.ADD 
}

export interface IEntityDisplay {
	type: EntityActionTypes.DISPLAY;
	entity: IEntity; 
}

export interface IEntityEdit {
	type: EntityActionTypes.EDIT;
	entity: IEntity; 
}

export interface IEntityRemove {
	type: EntityActionTypes.REMOVE;
	id: number;
}

export interface IEntityCancel { 
	type: EntityActionTypes.CANCEL 
}

export interface IEntityCloseForm { 
	type: EntityActionTypes.CLOSE_FORM 
}

export interface IEntityStore { 
	type: EntityActionTypes.STORE,
	entity: IEntity
}

export interface IEntityGoToPage {
	type: EntityActionTypes.GO_TO_PAGE;
	page: number; 
}

export interface IEntityFail {
	type: EntityActionTypes.FAIL;
	error: any; 
}


export type EntityAcceptedActions = IEntitySetLoading | IEntityGetEntities |
	IEntityAdd | IEntityFail |
	IEntityDisplay | IEntityEdit | IEntityRemove |	IEntityStore | IEntityCancel |
	IEntityCloseForm | IEntityGoToPage;
