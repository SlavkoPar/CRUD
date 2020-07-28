import React, { useState } from 'react'
import setTheme from './setTheme.js'


interface ILine  {
	name: string;
	type: string;
	amount: number;
}

const cart = [
	{name: 'Abc', type:"book", amount: 3.00},
	{name: 'Def', type:"info", amount: 10.50},
	{name: 'Ghi', type:"book", amount: 7.0},
	{name: 'Jkl', type:"info", amount: 4.00},
	{name: 'Mno', type:"book", amount: 5.50}
]


// const f = (line: ILine) => line.type === "book" 
const fByType = (t: string) => { 
	return (line: ILine) => line.type === t 
}

const cartAmount = (line: ILine) => line.amount;

const sum = (acc: number, amount: number) : number => acc + amount

export const ShoppingCart = () => {
	const [theme, changeTheme] = useState('light')
	const arr = cart.filter(fByType("book"))
	const suma = cart
						.filter(fByType("info"))
						.map(cartAmount)
						.reduce(sum, 0)

	return ( 
			<>
				<ul className="shopping">{arr.map( c => <li>{c.name}{' '}{suma}</li>)}</ul>
				<button onClick={() => { 
					const th = theme === 'light' ? 'dark' : 'light'
					changeTheme(th)
					setTheme(th)
				}
				}>change theme</button>
			</>)
}