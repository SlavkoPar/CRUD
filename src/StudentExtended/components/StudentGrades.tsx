import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

import { useStudent } from '../useStudent';
import { StudentActions } from '../actions';
import { Select } from '../../Common/Select';
import { IGrade } from '../../Grades/types';

import { Option } from '../../Common/Select'
import { useApp } from '../../AppData/useApp';

interface IProps {
}

const StudentGrades: React.FC<IProps> = (props: IProps) => {
	const { state: appState } = useApp();
	const { gradesAll } = appState;

	const { state, dispatch } = useStudent();
	const { entity: student, formMode, canEdit } = state;
	const { grades } = student!;

	let options: Option<number>[] = [];

	if (canEdit) {
		const already = student!.grades.map(g => g.gradeId);
		const gradesUnassigned: IGrade[] =Object.values(gradesAll).filter(grade => !already.includes(grade.id))
		options= gradesUnassigned.map(grade => ({value: grade.id, label: grade.name}))
		options.unshift({value: 0, label: 'select'})
	}

   return (
      <div className="name-container">
			{ grades.length === 0 && 
				<div>
					No grades yet
				</div>
			}
			{
				<>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Grade</th>
							{ canEdit && formMode !== 'display' && <th></th> }
						</tr>
					</thead>
					<tbody>
						{ grades.length > 0 && grades.map(grade => 
							<tr key={grade.gradeId}>
								<td className="name">
									{grade.name}
								</td>
								<td className="name">
									{grade.gradeId}
								</td>
								{ canEdit && formMode !== 'display' &&
									<td>
										<button className="button-remove" title="Remove Grade" 
											onClick={(e) => { 
												// e.stopPropagation();
												e.preventDefault();
												dispatch(StudentActions.removeGrade({studentId: student!.id, gradeId: grade.gradeId}))
											}}>
											<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
										</button>
									</td>
								}
							</tr>
						)}
						{canEdit && formMode !== 'display' && 
							<tr>
								<td>
									<Select
										options={options}
										value={0}
										onChange={(gradeId: number) => 
											dispatch(StudentActions.assignGrade({
												studentId: student!.id,
												gradeId: gradeId,
												gradeName: gradesAll[gradeId].name
											}))
										} 
									/>
								</td>
								<td></td>
							</tr>}
					</tbody>
				</table>
				</>
			}
      </div>
   );
  }

export default StudentGrades

