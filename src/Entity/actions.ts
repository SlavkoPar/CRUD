import { IEntity } from "./types";
import { createAction, createActionPayload, ActionsUnion } from "./actionsAccepted";

export enum ActionTypes {
	GET_ALL = 'GET_ALL',
	SET_LOADING = 'SET_LOADING',
	ADD = 'ADD',
	GET = 'GET',
	DISPLAY = 'DISPLAY',
	CLOSE_FORM = 'CLOSE_FORM',
	EDIT = 'EDIT',
	REMOVE = 'REMOVE',
  	STORE = 'STORE',
	CANCEL = 'CANCEL',
	GO_TO_PAGE = 'GO_TO_PAGE'
}

/*
export type IEntityActions<T extends IEntity> = {
	closeForm: () => ActionsWithoutPayload<ActionTypes.CLOSE_FORM>;
	 
	cancel: () => ActionsWithoutPayload<ActionTypes.CANCEL>;
	setLoading: (b: boolean) => 
				ActionsWithPayload<typeof ActionTypes.SET_LOADING, boolean>;
	getAll: (payload: {entities: T[]; pageSize: number; }) => 
				ActionsWithPayload<typeof ActionTypes.GET_ALL, {entities: T[]; pageSize: number; }>;
	get: (payload: number) => 
				ActionsWithPayload<typeof ActionTypes.GET, number>;
	add: () => ActionsWithoutPayload<typeof ActionTypes.ADD>;
	display: (payload: number) => 
				ActionsWithPayload<typeof ActionTypes.DISPLAY, number>;
	edit: (payload: number) => 
				ActionsWithPayload<typeof ActionTypes.EDIT, number>;
	store: (payload: { saveStorage: (s: string) => void, entity: T }) => 
				ActionsWithPayload<typeof ActionTypes.STORE, { saveStorage: (s: string) => void, entity: IEntity }>;
	remove: (payload: { saveStorage: (s: string) => void, id: number }) => 
				ActionsWithPayload<typeof ActionTypes.REMOVE, { saveStorage: (s: string) => void, id: number }>;
				
	goToPage: (payload: number) => 
				ActionsWithPayload<typeof ActionTypes.GO_TO_PAGE, number>;
 };
*/

/*
createActionPayload<ActionTypes.GET_ALL, {
	entities: IEntity[];
	pageSize: number;
}>(actionType: ActionTypes.GET_ALL): (payload: {
	entities: IEntity[];
	pageSize: number;
}) => ActionsWithPayload<ActionTypes.GET_ALL, {
	...;
}>
*/

export const EntityActions = {  // : IEntityActions<IEntity>
	closeForm: createAction<typeof ActionTypes.CLOSE_FORM>(ActionTypes.CLOSE_FORM),
	cancel: createAction<typeof ActionTypes.CANCEL>(ActionTypes.CANCEL),
	setLoading: createActionPayload<typeof ActionTypes.SET_LOADING, boolean>(ActionTypes.SET_LOADING),
	getAll: createActionPayload<typeof ActionTypes.GET_ALL, { entities: IEntity[]; pageSize: number; }>(ActionTypes.GET_ALL),
	get: createActionPayload<typeof ActionTypes.GET, number>(ActionTypes.GET),
	add: createAction<typeof ActionTypes.ADD>(ActionTypes.ADD),
	display: createActionPayload<typeof ActionTypes.DISPLAY, number>(ActionTypes.DISPLAY),
	edit: createActionPayload<typeof ActionTypes.EDIT, number>(ActionTypes.EDIT),
	store: createActionPayload<typeof ActionTypes.STORE, { saveStorage: (s: string) => void, entity: IEntity }>(ActionTypes.STORE),
	remove: createActionPayload<typeof ActionTypes.REMOVE, { saveStorage: (s: string) => void, id: number }>(ActionTypes.REMOVE),
	goToPage: createActionPayload<typeof ActionTypes.GO_TO_PAGE, number>(ActionTypes.GO_TO_PAGE),
 };

 export type AcceptedActions = ActionsUnion<typeof EntityActions>;
