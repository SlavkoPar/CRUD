import { IEntity } from "./types";
import { Dispatch } from "react";
import { EntityAcceptedActions, EntityActionTypes } from "./actions";
import axios from 'axios';
import { StorageService } from "./StorageService";
import { IAppState } from "../AppData/types";

interface IProps {
	storageName: string,
	getFromJSON: () => IEntity[],
	pageSize: number,
	baseURL: string
}

export class EntityActions {
	pageSize = 10;
	API: any;
	storageService: StorageService;

	constructor(obj: IProps) {
		this.pageSize = obj.pageSize;

		this.API = axios.create({
			baseURL: obj.baseURL,
			timeout: 1000,
  			headers: {'X-Custom-Header': 'foobar'}
		 });

		this.storageService = new StorageService(obj.storageName, obj.getFromJSON)
	}

	get namesALL() { return this.storageService.namesALL }

	getEntites = async (dispatch: Dispatch<EntityAcceptedActions>, query: string, currentPage: number, appState: IAppState) => {
		dispatch({ type: EntityActionTypes.SET_LOADING, loading: true })
		try {
			// const response = await API.get(`page=${this.page}&page_size=${this.pageSize}`);
			const response = await this.storageService.getPageEntites(query, this.pageSize, currentPage)
			const { pageEntities, pageCount } = response.data.results
			dispatch({
				type: EntityActionTypes.GET_ENTITIES,
				payload: { 
					entities: pageEntities, // .map(ent => ({id: ent.id, name: ent.name, only list row columns})), 
					pageCount,
					appState 
				}
			})
			dispatch({ type: EntityActionTypes.SET_LOADING, loading: false })
		}
		catch(error) {
			dispatch({ type: EntityActionTypes.FAIL, error })
		}
	}

	displayEntity = async (dispatch: Dispatch<EntityAcceptedActions>, id: number) => {
		dispatch({ type: EntityActionTypes.SET_LOADING, loading: true })
		try {
			// const response = await API.get(`${id}`);
			const response = await this.storageService.getEntity(id)
			dispatch({
				type: EntityActionTypes.DISPLAY,
				entity: response.data.results
			})
			dispatch({ type: EntityActionTypes.SET_LOADING, loading: false })
		}
		catch(error) {
			dispatch({ type: EntityActionTypes.FAIL, error })
		}
	}

	editEntity = async (dispatch: Dispatch<EntityAcceptedActions>, id: number) => {
		dispatch({ type: EntityActionTypes.SET_LOADING, loading: true })
		try {
			// const response = await API.get(`${id}`);
			const response = await this.storageService.getEntity(id)
			dispatch({
				type: EntityActionTypes.EDIT,
				entity: response.data.results
			})
			dispatch({ type: EntityActionTypes.SET_LOADING, loading: false })
		}
		catch(error) {
			dispatch({ type: EntityActionTypes.FAIL, error })
		}
	}

	removeEntity = async (dispatch: Dispatch<EntityAcceptedActions>, id: number) => {
		dispatch({ type: EntityActionTypes.SET_LOADING, loading: true })
		try {
			// const response = await this.API.delete(`${id}`);
			// const response = 
			await this.storageService.removeEntity(id)
			dispatch({ type: EntityActionTypes.REMOVE, id })
			dispatch({ type: EntityActionTypes.SET_LOADING, loading: false })
		}
		catch(error) {
			dispatch({ type: EntityActionTypes.FAIL, error })
		}
	}

	storeEntity = async (dispatch: Dispatch<EntityAcceptedActions>, entity: IEntity, formMode: string) => {
		dispatch({ type: EntityActionTypes.SET_LOADING, loading: true })
		try {
			if (formMode === 'add') {
				// const response = this.API.post({ entity })
			}
			else {
				// const response = this.API.put({ entity })
			}
			const response = await this.storageService.storeEntity(formMode, entity)
			dispatch({ type: EntityActionTypes.STORE, entity: response.data.results })
			dispatch({ type: EntityActionTypes.SET_LOADING, loading: false })
		}
		catch(error) {
			dispatch({ type: EntityActionTypes.FAIL, error })
		}

}


	/*
	 * if you want to override these methods in useStudent
	 *

	const getEntites = useCallback(
		(dispatch: Dispatch<any>, query: string, currentPage: number, appState: IAppState) => { 
			return entityActions.getEntites(dispatch, query, currentPage, appState) 
		}, []
	)
	
	const displayEntity = useCallback(
		(dispatch: Dispatch<any>, id: number) => { return entityActions.displayEntity(dispatch, id) }
		, []
	)

	const editEntity = useCallback(
		(dispatch: Dispatch<any>, id: number) => { return entityActions.editEntity(dispatch, id) }
		, []
	)

	const removeEntity = useCallback(
		(dispatch: Dispatch<any>, id: number) => { return entityActions.removeEntity(dispatch, id) }
		, []
	)

	const storeEntity = useCallback(
		(dispatch: Dispatch<any>, entity: IEntity) => { 
			return entityActions.storeEntity(dispatch, entity, state.formMode) 
		}, [state.formMode]
	)

	*/

}