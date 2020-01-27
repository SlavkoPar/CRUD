import React, { createContext, useContext } from 'react';
import jsonGrades from "../Grades/Grades.json"
import { IAppState } from './types';

const initialState: IAppState = { 
	gradesAll: []
};

export interface IAppContext {
	state: IAppState;
}

let AppContext: React.Context<IAppContext>;

interface IProps {
	children: React.ReactNode
}


export const AppProvider: React.FC<IProps> = ({ children }) => {
	const state = initialState

	const addGrades = () => {
		const { gradesAll } = state;
		jsonGrades.map(grade => 
			gradesAll[grade.id] = { ...grade, words: grade.name.split(',')}
		)
	}
	
	if (AppContext === undefined) {
		addGrades();
		AppContext = createContext<IAppContext>({ state })
	}

  	return (
   	<AppContext.Provider value={{ state }}>
   		{children}
   	</AppContext.Provider>
  	)
}

export const useApp = () => useContext(AppContext);