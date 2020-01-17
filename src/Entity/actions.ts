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
	close: createAction<typeof ActionTypes.CLOSE_FORM>(ActionTypes.CLOSE_FORM),
	cancel: createAction<typeof ActionTypes.CANCEL>(ActionTypes.CANCEL),
	setLoading: createActionPayload<typeof ActionTypes.SET_LOADING, boolean>(ActionTypes.SET_LOADING),
	getAll: createActionPayload<typeof ActionTypes.GET_ALL, { entities: IEntity[]; pageSize: number; }>(ActionTypes.GET_ALL),
	get: createActionPayload<typeof ActionTypes.GET, number>(ActionTypes.GET),
	add: createActionPayload<typeof ActionTypes.ADD, { entities: IEntity[] }>(ActionTypes.ADD),
	display: createActionPayload<typeof ActionTypes.DISPLAY, number>(ActionTypes.DISPLAY),
	edit: createActionPayload<typeof ActionTypes.EDIT, number>(ActionTypes.EDIT),
	store: createActionPayload<typeof ActionTypes.STORE, { saveStorage: (s: string) => void, entity: IEntity }>(ActionTypes.STORE),
	remove: createActionPayload<typeof ActionTypes.REMOVE, { saveStorage: (s: string) => void, id: number }>(ActionTypes.REMOVE),
	goToPage: createActionPayload<typeof ActionTypes.GO_TO_PAGE, number>(ActionTypes.GO_TO_PAGE),
 };

 export type AcceptedActions = ActionsUnion<typeof EntityActions>;
