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
						<Link to="/student">Student</Link>
					</li>
					<li>
						<Link to="/" className="push-right">Student Extended</Link>  {/* student-extended */}
					</li>
				</ul>				
			</nav>
			<div>
				<Switch>
					<Route path="/student">
						<StudentPage query="all" />
					</Route>
					<Route path="/">  {/* student-extended */}
						<StudentPageExtended query="all" />
					</Route>						
				</Switch>
			</div>	
		</Router>
  );
}

export default App;
