import { IEntity } from "./types";
import { Dispatch } from "react";
import { EntityAcceptedActions, EntityActionTypes } from "./actions";
import axios from 'axios';
import { EntityService } from "./EntityService";
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
	entityService: EntityService;

	constructor(obj: IProps) {
		this.pageSize = obj.pageSize;

		this.API = axios.create({
			baseURL: obj.baseURL,
			timeout: 1000,
  			headers: {'X-Custom-Header': 'foobar'}
		 });

		this.entityService = new EntityService(obj.storageName, obj.getFromJSON)
	}

	async getEntites(dispatch: Dispatch<EntityAcceptedActions>, query: string, currentPage: number, appState: IAppState) {
		dispatch({ type: EntityActionTypes.SET_LOADING, loading: true })
		try {
			// const response = await API.get(`page=${this.page}&page_size=${this.pageSize}`);
			const response = await this.entityService.getPageEntites(query, this.pageSize, currentPage)
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

	async displayEntity(dispatch: Dispatch<EntityAcceptedActions>, id: number) {
		dispatch({ type: EntityActionTypes.SET_LOADING, loading: true })
		try {
			// const response = await API.get(`${id}`);
			const response = await this.entityService.getEntity(id)
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

	async editEntity(dispatch: Dispatch<EntityAcceptedActions>, id: number) {
		dispatch({ type: EntityActionTypes.SET_LOADING, loading: true })
		try {
			// const response = await API.get(`${id}`);
			const response = await this.entityService.getEntity(id)
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

	async removeEntity(dispatch: Dispatch<EntityAcceptedActions>, id: number) {
		dispatch({ type: EntityActionTypes.SET_LOADING, loading: true })
		try {
			// const response = await this.API.delete(`${id}`);
			// const response = 
			await this.entityService.removeEntity(id)
			dispatch({ type: EntityActionTypes.REMOVE, id })
			dispatch({ type: EntityActionTypes.SET_LOADING, loading: false })
		}
		catch(error) {
			dispatch({ type: EntityActionTypes.FAIL, error })
		}
	}

	async storeEntity(dispatch: Dispatch<EntityAcceptedActions>, entity: IEntity, formMode: string) {
		dispatch({ type: EntityActionTypes.SET_LOADING, loading: true })
		try {
			if (formMode === 'add') {
				// const response = this.API.post({ entity })
			}
			else {
				// const response = this.API.put({ entity })
			}
			const response = await this.entityService.storeEntity(formMode, entity)
			dispatch({ type: EntityActionTypes.STORE, entity: response.data.results })
			dispatch({ type: EntityActionTypes.SET_LOADING, loading: false })
		}
		catch(error) {
			dispatch({ type: EntityActionTypes.FAIL, error })
		}
	}

}