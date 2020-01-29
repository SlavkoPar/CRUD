import { IEntityState, IEntity } from "./types";


// Create Action Constants
 enum ActionTypes {
	GET_ALL = 'GET_ALL',
	EDIT = 'EDIT',
}

interface IGetAll {
	type: ActionTypes.GET_ALL;
	payload: {
		entities: IEntity[]; 
		pageSize: number; 
	}
}

export interface IEdit {
	type: ActionTypes.EDIT;
	payload: number
}

interface INgoro {
	type: 'NGORO';
	payload: {
		entities: IEntity[]; 
		pageSize: number; 
	}
}


// Combine the action types with a union (we assume there are more)
type QuestionActions = IGetAll | IEdit;

type NGoro = QuestionActions | INgoro


export const ngoroReducer: <
	TS extends IEntityState<IEntity>,
	T extends IEntity
	//, TA extends QuestionActions
>(initialEntity: T) => React.Reducer<TS, QuestionActions> = (initialEntity) => {
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

	
			case ActionTypes.EDIT: {
				const id = action.payload
				const entity = state.entities.find(e => e.id === id)!
				return {
					...state,
					formMode: 'edit',
					entity: { ...entity }				
				}
			}
	
			default:
				// throw new Error(`Unhandled action type: ${action!.type}`);
				// when combine reducers 
				return state
		}
	}
}
