import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

import { IStudent } from '../types';
import { IGrade } from '../../Grades/types';
import { AutoSuggestGrade } from './AutoSuggestGrade';
import { useStudent } from '../useStudent';
import { StudentActions } from '../actions';

interface IProps {
}

const StudentGrades: React.FC<IProps> = (props: IProps) => {
	const { state, dispatch } = useStudent();
	const { entity: student, formMode, canEdit, gradesAll } = state;
	const { grades } = student!;

	//const { student, gradesAll, canEdit, formMode, removeStudentGrade, assignStudentGrade } = props;  // student, 
	const gradesUnassigned = gradesAll?.filter(grade => student!.grades.map(g => g.gradeId).includes(grade.entityId))
   return (
      <div className="name-container">
			{ grades.length === 0 && 
				<div>
					No grades yet
				</div>
			}
			{ grades.length > 0 && 
				<>
				<table>
					<thead>
						<tr>
							<th>Grades</th>
							{ canEdit && formMode !== 'display' && <th></th> }
						</tr>
					</thead>
					<tbody>
						{ grades.map(grade => 
							<tr key={grade.gradeId}>
								<td className="name">
									{grade.name}
								</td>
								{ canEdit && formMode !== 'display' &&
									<td>
										<button className="button-remove" title="Remove Grade" 
											onClick={(e) => { 
												e.stopPropagation();
												e.preventDefault();
												dispatch(StudentActions.removeGrade({studentId: student!.entityId, gradeId: grade.gradeId}))
											}}>
											<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
										</button>
									</td>
								}
							</tr>
						)}
						{canEdit && formMode !== 'display' && <tr>
							<td>
								{/* <AutoSuggestGrade student={student} gradesUnassigned={gradesUnassigned!} assignStudentGrade={assignStudentGrade!} /> */}
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

