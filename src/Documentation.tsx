import React from 'react';

export const Documentation: React.FC = () => {
  return (
		<div style={{padding: "2% 30%"}}>
			<h2>To CRUD or not to CRUD</h2>
			<div>
				<h3>Introduction</h3>
The CRUD paradigm is common in constructing web applications. The model must be able to Create, Read, Update, and Delete resources. We refer to these functions by the acronym CRUD.
<br/>In a REST environment, CRUD often corresponds to the HTTP methods POST, GET, PUT, and DELETE, respectively. 

<br/>We are going to implement CRUD functionality for the base type Entity.
After that we are going to implement CRUD functionality for Student, reusing functionality of Entity.				
				<h3>Background</h3>
				<div>
				Most of the web applications initally create base framework, which will be applied for all the features of the application. That way any change of application done in the base framework, will be applied to whole application
				<br/>We are going to use the following technologies: React, Hooks and TypeScript.
<br/>You can learn about these technologies from many sources, one of them could be:<br />
<a href="https://react.christmas/2019/7?utm_campaign=React%2BNewsletter&utm_medium=email&utm_source=React_Newsletter_190" target="_blank">
	Manage Global State with Context API and Hooks
</a>
				</div>

				<h3>Basic Idea</h3>
				<div>
We are going to develop component EntityList which uses IEntity interface.

TypeScript enables extension of the interfaces, and we are going to create interface
IStudent which extends IEntity interface.<br />

<pre>{`
export interface IEntity {
  id: number; 
  name: string;
}

export interface IStudent extends IEntity {
  code: string;
  email: string;
  types: string[];
  avatar: string;
  grades: IStudentGrade[]
}
`}</pre>

<br/>
<a href="https://www.typescriptlang.org/docs/handbook/interfaces.html" target="_blank">Read about TypeScript Interfaces</a>

<br/>Now we can reuse EntityList component, because IStudent can be converted to IEntity.
				</div>

				<h3>Student overrides Entity</h3>
				<div>
I implemented CRUD functionality for <b>Student</b>, reusing functionality of <b>Entity</b>. 
<br/>Another example is <b>StudentExtended</b> where I extended <b>Entity</b>, creating <b>StudentActions</b> and <b>studentReducer</b> . That way we override behavior of Entity. 
We process some actions in <b>studentReducer</b>, like GET_ALL, without processing that action in the <b>entityReducer</b>.
			</div>
			</div>
		</div>
  );
}

