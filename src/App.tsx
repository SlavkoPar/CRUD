import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch, Link  } from 'react-router-dom'
import { StudentPage } from './Student/StudentPage';
import { StudentPageExtended } from './StudentExtended/StudentPage';

const App: React.FC = () => {
  return (
		<Router>
			<nav>
				<ul>
					<li>
						<Link to="/">Documentation</Link>
					</li>
					<li>
						<Link to="/student">Student</Link>
					</li>
					<li>
						<Link to="/student-extended" className="push-right">Student Extended</Link>
					</li>
				</ul>				
			</nav>
			<div>
				<Switch>
					<Route exact path="/">
						<ul>
							<li>IStudent extends IEntity</li>
							<li>IStudentState extends IEntityState</li>
						</ul>
					</Route>
					<Route path="/student">
						<StudentPage query="all" />
					</Route>
					<Route path="/student-extended">
						<StudentPageExtended query="all" />
					</Route>						
				</Switch>
			</div>	
		</Router>
  );
}

export default App;
