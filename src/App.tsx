import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch, Link  } from 'react-router-dom'
import { StudentPage } from './Student/StudentPage';
// import { StudentPageExtended } from './StudentExtended/StudentPage';
import { AppProvider } from './AppData/useApp';

const App: React.FC = () => {
  return (
		<AppProvider> {/* State shared between different components (features or pages),	
								deeply nested in different branches of DOM tree. */}
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
						<Route path="/">
							<StudentPage query="all" />
						</Route>
						{/* <Route path="/">
							<StudentPageExtended query="all" />
						</Route>						 */}
					</Switch>
				</div>	
			</Router>
		</AppProvider>
  );
}

export default App;
