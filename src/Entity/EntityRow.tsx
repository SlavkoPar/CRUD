import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { useHover } from "../Common/useHover";
import { IEntity } from "./types";

interface IRowProps<T> {
	entity: T,
	renderColumns: (item: T) => JSX.Element[],
	display: (entityId: number) => void,
	edit: (entityId: number) => void,
	remove: (entityId: number) => void,
}

export const EntityRow: <T extends IEntity> 
					(props: IRowProps<T>) => React.ReactElement<IRowProps<T>> = (props) => {
	const { entity, renderColumns, display, edit, remove } = props;
	const { entityId, name } = entity; // , url 
	const [hoverRef, hoverProps] = useHover();

	return (
		<ul className="entity-columns" ref={hoverRef}>
			{/* <li>{entityId}</li> */}
			<li key={entityId}>
				<a href="#/" onClick={(e) => { e.preventDefault(); display(entityId)  }}>  {/* dispatch(EntityActions.display(entityId)) */}
					{name}
				</a>
			</li>

			{ renderColumns(entity) }

			<li key="buttons">
			{hoverProps.isHovered &&
				<button className="button-edit" title="Edit" onClick={() => edit(entityId)}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			}
			{hoverProps.isHovered &&
				<button className="button-remove" title="Remove" onClick={() => { remove(entityId) }}>
					<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
				</button>
			}
			</li>
		</ul>
	)
};
