import React from 'react';
import { useStudent } from '../useStudent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

import { EntityActions} from '../../Entity/actions'
import { MyForm } from './MyForm';
import StudentGrades from './StudentGrades';

interface IProps {
	saveStorage: (s: string) => void,
	// assignStudentGrade: (entityId: number, gradeId: number) => void; 	
	// removeStudentGrade: (entityId: number, gradeId: number) => void;
}

export const StudentForm: React.FC<IProps> = (props: IProps) => {
	const { state, dispatch } = useStudent();
	const { entities, entity, formMode, canEdit, gradesAll } = state;

	const { saveStorage } = props;

	let title: string = ''
	switch (state.formMode) {
		case 'display':
			title = 'Student';
			break;
		case 'edit':
			title = 'Edit Student';
			break;
		case 'add':
			title = 'New Student';
			break;
		default:
			break;
	}

	return (
		<div className="formik-example formik-example--blue">
		{ entity && 
			<div style={{border: '1px solid silver', borderRadius: '5px', padding: '10px'}}>
				<h4 style={{marginTop: 0}}>{title}</h4>
				<button 
					style={{float:'right'}}
					className="button-remove"
					title="Close"
					onClick={() => { dispatch(EntityActions.close())}}
				>
					<FontAwesomeIcon icon={faWindowClose} size="2x" color='lightblue' />
				</button>				
				<MyForm {...props}
					entity={entity!} 
					formMode={formMode}
					canEdit={canEdit}
					cancel = {() => dispatch(EntityActions.cancel())}
					saveForm = { (student) => dispatch(EntityActions.store({ saveStorage, entity: student }))}
					edit = {() => dispatch(EntityActions.edit(entity!.entityId))}
					remove = {() => dispatch(EntityActions.remove({ saveStorage, entityId: entity!.entityId }))}
				/>
				<br />
				<StudentGrades	/>
			</div>
		}
		</div>
	)
}