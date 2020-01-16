import React from "react";
import ReactPaginate from 'react-paginate';

import { EntityActions } from "./actions";
import { EntityRow } from "./EntityRow";
import { IEntity } from "./types";


interface IProps<T extends IEntity> {
	entities: T[],
	dispatch: React.Dispatch<any>,
	renderColumns: (item: T) => JSX.Element[],
	saveStorage: (s: string) => void,
	currentPage: number,
	pageCount: number,
	pageRangeDisplayed: number;
	marginPagesDisplayed: number;
}

export const EntityList: <T extends IEntity>
					(props: IProps<T>) => React.ReactElement<IProps<T>> = (props) => {
	const { 
		entities, dispatch, renderColumns, saveStorage,
		pageCount, pageRangeDisplayed, marginPagesDisplayed, 
	} = props;
	
	const display = (id: number) => dispatch(EntityActions.display(id));
	const edit = (id: number) => dispatch(EntityActions.edit(id));
	const remove = (id: number) => dispatch(EntityActions.remove({saveStorage, id}));

	return (
   	<div style={{border: '1px solid lightblue'}} id="react-paginate">
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
			<ReactPaginate
				previousLabel={"← Previous"}
				nextLabel={"Next →"}
				breakLabel={<span className="gap">...</span>}
				pageCount={pageCount}
				onPageChange={(selectedItem: { selected: number }) => dispatch(EntityActions.goToPage(selectedItem.selected))}
				// forcePage={currentPage}
				containerClassName={"pagination"}
				previousLinkClassName={"previous_page"}
				nextLinkClassName={"next_page"}
				disabledClassName={"disabled"}
				activeClassName={"active"}
				pageRangeDisplayed={pageRangeDisplayed}
				marginPagesDisplayed={marginPagesDisplayed}
			/>
			<button onClick={() => dispatch(EntityActions.add({ entities: entities }))}>Add new</button>			
		</div>
  )
}