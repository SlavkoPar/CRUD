import React from "react";
import ReactPaginate from 'react-paginate';

import { EntityActionTypes } from "./actions";
import { EntityRow } from "./EntityRow";
import { IEntity } from "./types";


interface IProps<T extends IEntity> {
	entities: T[],
	dispatch: React.Dispatch<any>,
	displayEntity: (id: number) => void,
	editEntity: (id: number) => void,
	removeEntity: (id: number) => void,
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

	return (
   	<div style={{border: '0px solid lightblue'}}>
			<ul className="entity-list">
				{entities.map(entity => (
					<li key={entity.id}>
						<EntityRow
							entity={entity}
							renderColumns={renderColumns}
							display={displayEntity}
							edit={editEntity}
							remove={removeEntity}
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