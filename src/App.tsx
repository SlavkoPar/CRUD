import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch, Link  } from 'react-router-dom'
import { StudentPage } from './Student/StudentPage';
import { StudentPageExtended } from './StudentExtended/StudentPage';
import { AppProvider } from './AppData/useApp';
import LiveQuotes from './LiveQuotes/LiveQuotes';

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
							<Link to="/">Student Extended</Link>  {/* student-extended */}
						</li>
						<li>
							<Link to="/live-quotes" className="push-right">Live Quotes</Link>
						</li>
					</ul>				
				</nav>
				<div>
					<Switch>
						<Route path="/student">
							<StudentPage />
						</Route>
						<Route path="/live-quotes">
							<LiveQuotes />
						</Route>							
						<Route path="/">
							<StudentPageExtended />
						</Route>					
					</Switch>
				</div>	
			</Router>
		</AppProvider>
  );
}

export default App;
