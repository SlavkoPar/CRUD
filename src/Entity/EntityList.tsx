import React, { Dispatch } from "react";
import ReactPaginate from 'react-paginate';

import { EntityActionTypes } from "./actions";
import { EntityRow } from "./EntityRow";
import { IEntity } from "./types";


interface IProps<T extends IEntity> {
	entities: T[],
	dispatch: Dispatch<any>,
	displayEntity: (dispatch: Dispatch<any>, id: number) => void,
	editEntity: (dispatch: Dispatch<any>, id: number) => void,
	removeEntity: (dispatch: Dispatch<any>, id: number) => void,
	renderColumns: (item: T) => JSX.Element[],
	currentPage: number,
	pageCount: number,
	// pageRangeDisplayed: number;
	// marginPagesDisplayed: number;
}

export const EntityList: <T extends IEntity>
					(props: IProps<T>) => React.ReactElement<IProps<T>> = (props) => {
	const { 
		entities, 
		displayEntity, editEntity, removeEntity,
		dispatch, renderColumns,
		pageCount //, pageRangeDisplayed, marginPagesDisplayed, 
	} = props;

	const display = (id: number) => displayEntity(dispatch, id);
	const edit = (id: number) => editEntity(dispatch, id);
	const remove = (id: number) => removeEntity(dispatch, id);

	return (
   	<div style={{border: '1px solid lightblue'}}>
			<ul className="entity-list">
				{entities.map(entity => (
					<li key={entity.id}>
						<EntityRow
							entity={entity}
							renderColumns={renderColumns}
							display={display}
							edit={edit}
							remove={remove}
						/>	
					</li>
				))}
			</ul>

			<div id="react-paginate">
				<ReactPaginate
					previousLabel={"← Previous"}
					nextLabel={"Next →"}
					breakLabel={<span className="gap">...</span>}
					pageCount={pageCount}
					onPageChange={(selectedItem: { selected: number }) => 
						dispatch({
							type: EntityActionTypes.GO_TO_PAGE,
							page: selectedItem.selected
						})
					}
					// forcePage={currentPage}
					containerClassName={"pagination"}
					previousLinkClassName={"previous_page"}
					nextLinkClassName={"next_page"}
					disabledClassName={"disabled"}
					activeClassName={"active"}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
				/>
			</div>

			<button onClick={() => dispatch({ type: EntityActionTypes.ADD })}>Add new</button>			
		</div>
  )
}