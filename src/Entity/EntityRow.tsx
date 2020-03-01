import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { useHover } from "../Common/useHover";
import { IEntity } from "./types";

interface IRowProps<T> {
	entity: T,
	renderColumns: (item: T) => JSX.Element[],
	display: (id: number) => void,
	edit: (id: number) => void,
	remove: (id: number) => void,
}

export const EntityRow: <T extends IEntity> 
					(props: IRowProps<T>) => React.ReactElement<IRowProps<T>> = (props) => {
	const { entity, renderColumns, display, edit, remove } = props;
	const { id, name } = entity; // , url 
	const [hoverRef, hoverProps] = useHover();

	return (
		<ul className="entity-columns" ref={hoverRef}>
			{/* <li>{id}</li> */}
			<li key={id}>
				<a href="#/" onClick={(e) => { e.preventDefault(); display(id)  }}>
					{name}
				</a>
			</li>

			
			{ renderColumns(entity) }

			<li key="buttons">
			{/* {hoverProps.isHovered && */}
				<button style={{visibility:hoverProps.isHovered?'visible':'hidden'}} className="button-edit" title="Edit" onClick={() => edit(id)}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			{/* } */}
			{/* {hoverProps.isHovered && */}
				<button style={{visibility:hoverProps.isHovered?'visible':'hidden'}} className="button-remove" title="Remove" onClick={() => { remove(id) }}>
					<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
				</button>
			{/* } */}
			</li>

		</ul>
	)
};
