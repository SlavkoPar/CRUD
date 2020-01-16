
import { IEntityState, IEntity } from './types';
import { ActionTypes, AcceptedActions } from './actions';

export const entityReducer: <
	TS extends IEntityState<IEntity>,
	T extends IEntity
>(initialEntity: T) => React.Reducer<TS, AcceptedActions> = (initialEntity) => {
	return (state, action) =>  {
		switch(action.type) {

			case ActionTypes.GET_ALL: {
				const { entities, pageSize } = action.payload;
				return {
					...state,
					entities: entities,
					pageCount: Math.ceil(entities.length / pageSize)
				}
			}

			case ActionTypes.SET_LOADING:
				return {
					...state,
					loading: action.payload
				}
	
			case ActionTypes.GET: {
				const id = action.payload;
				return {
					...state,
					entity: state.entities.find(e => e.id === id)!
				};
			}    

			case ActionTypes.ADD: {
				const { entities } = action.payload
				return {
					...state,
					formMode: 'add',
					entity: { 
						...initialEntity, 
						id: entities.length === 0 ? 1 : Math.max(...entities.map(e => e.id)) + 1
					}
				};
			}    	
	
			case ActionTypes.DISPLAY: {
				const id = action.payload
				const entity = state.entities.find(e => e.id === id)!
				return {
					...state,
					formMode: 'display',
					entity: { ...entity },			
					// entity: { ...state.entity, ...{entity } }
				}
			}
	
			case ActionTypes.EDIT: {
				const id = action.payload
				const entity = state.entities.find(e => e.id === id)!
				return {
					...state,
					formMode: 'edit',
					entity: { ...entity }				
				}
			}

			case ActionTypes.CLOSE: 
				return {
					...state,
					formMode: 'none',
					entity: undefined			
				}

			case ActionTypes.REMOVE: {
				const { saveStorage, id } = action.payload
				saveStorage(JSON.stringify(state.entities.filter(e => e.id !== id)))
				return {
					...state,
					formMode: 'display',
					entity: undefined,
					entities: state.entities.filter(e => e.id !== id)
				}
			}
			
			case ActionTypes.STORE: {
				const { saveStorage, entity } = action.payload
				let entities: IEntity[] = [];
				if (state.formMode === 'add') {
					entities = [...state.entities, { ...entity }]
				}
				else {
					entities = state.entities.map(a => a.id === entity.id ? { ...entity } : a)
				}
				saveStorage(JSON.stringify(entities))
				return {
					...state,
					formMode: 'edit',
					entity: { ...entity },
					entities: entities
				};
			}
	
			case ActionTypes.CANCEL: {
				return {
					...state,
					formMode: 'display',
				};
			}

			case ActionTypes.GO_TO_PAGE: {
				return {
					...state,
					currentPage: action.payload
				}
			}
	
			default:
				// throw new Error(`Unhandled action type: ${action!.type}`);
				// when combine reducers 
				return state
		}
	}
}
