
import { IEntityState, IEntity } from './types';
import { EntityActionTypes, EntityAcceptedActions } from './actions';

export const entityReducer: <
	TS extends IEntityState<IEntity>,
	T extends IEntity
>(initialEntity: T) => React.Reducer<TS, EntityAcceptedActions> = (initialEntity) => {
	return (state, action) =>  {
		switch(action.type) {

			case EntityActionTypes.GET_ENTITIES: {
				const { entities, pageCount } = action.payload;
				return {
					...state,
					entities,
					pageCount
				}
			}

			case EntityActionTypes.SET_LOADING:
				return {
					...state,
					loading: action.loading
				}

			case EntityActionTypes.SET_QUERY:
				return {
					...state,
					query: action.query
				}				
	
			case EntityActionTypes.ADD: {
				return {
					...state,
					formMode: 'add',
					entity: { 
						...initialEntity, 
						id: -1
					}
				};
			}    	
	
			case EntityActionTypes.DISPLAY: {
				return {
					...state,
					formMode: 'display',
					entity: { ...action.entity },			
				}
			}
	
			case EntityActionTypes.EDIT: {
				return {
					...state,
					formMode: 'edit',
					entity: { ...action.entity }				
				}
			}

			case EntityActionTypes.CLOSE_FORM: 
				return {
					...state,
					formMode: 'none',
					entity: undefined			
				}

			case EntityActionTypes.REMOVE: {
				const  id = action.id
				return {
					...state,
					formMode: 'display',
					entity: undefined,
					entities: state.entities.filter(e => e.id !== id)
				}
			}
			
			case EntityActionTypes.STORE: {
				const entity = action.entity
				let entities: IEntity[]  = state.entities;
				if (state.formMode === 'add') {
					entities = [...entities, { ...entity }]
				}
				else {
					entities = entities.map(ent => ent.id === entity.id ? { ...entity } : ent)
				}

				return {
					...state,
					formMode: 'edit',
					entity: entity,
					entities: entities
				};
			}
	
			case EntityActionTypes.CANCEL: {
				return {
					...state,
					formMode: 'display',
				};
			}

			case EntityActionTypes.GO_TO_PAGE: {
				return {
					...state,
					currentPage: action.page
				}
			}
	
			default:
				// throw new Error(`Unhandled action type: ${action!.type}`);
				// when combine reducers 
				return state
		}
	}
}
