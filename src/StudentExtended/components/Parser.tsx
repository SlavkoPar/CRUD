import React, { useRef, useEffect } from 'react';

interface IProps {
}

// https://medium.com/@stoopidguy1992/how-to-write-a-math-expression-parser-in-javascript-b5147bc9466b

// split expression by operator considering parentheses
const split = (expression: string, operator: string) => {
	const result = [];
	let braces = 0;
	let currentChunk = "";
	for (let i = 0; i < expression.length; ++i) {
		const curCh = expression[i];
		if (curCh === '(') {
			braces++;
		} else if (curCh === ')') {
			braces--;
		}
		if (braces === 0 && operator === curCh) {
			result.push(currentChunk);
			currentChunk = "";
		} 
		else {
			currentChunk += curCh;
		}
	}
	if (currentChunk !== "") {
		result.push(currentChunk);
	}
	return result;
};


const parseDivision = (expression: string) => {
	const numbersString = split(expression, '/');
	const numbers = numbersString.map(noStr => {
		const str = noStr.trim()
		if (str[0] === '(') {
			const expr = noStr.substr(1, str.length - 2);
			// recursive call to the main function
			return parsePlus(expr);
		}
		return +noStr;
	});
	const initialValue = numbers[0];
	const result = numbers.slice(1).reduce((acc, no) => acc / no, initialValue);
	return result;
};



// this will only take strings containing * operator [ no + ]
const parseMultiplication = (expression: string) => {
	const numbersString = split(expression, '*');
	const numbers = numbersString.map(noStr => {
		const str = noStr.trim()
		if (str[0] === '(') {
			const expr = noStr.substr(1, str.length - 2);
			// recursive call to the main function
			return parseDivision(expr);
		}
		//return +noStr;
		return parseDivision(str)
	});
	const initialValue = 1.0;
	const result = numbers.reduce((acc, no) => acc * no, initialValue);
	return result;
};



// both * -
const parseMinus = (expression: string) => {
	const numbersString = split(expression, '-');
	const numbers = numbersString.map(noStr => parseMultiplication(noStr));
	const initialValue = numbers[0];
	const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
	return result;
};

// * - + 
const parsePlus = (expression: string): number => {
	const numbersString = split(expression, '+');
	const numbers = numbersString.map(noStr => parseMinus(noStr));
	const initialValue = 0.0;
	const result = numbers.reduce((acc, no) => acc + no, initialValue);
	return result;
};


export const Parser: React.FC<IProps> = (props: IProps) => {

	const inputElem = useRef<HTMLInputElement>(null);
	const resultElem = useRef<HTMLDivElement>(null);

	const parse = (s: String) => {
		resultElem.current!.innerHTML = parsePlus(inputElem.current!.value).toString()
	}

	useEffect(()=>{
		inputElem.current!.value = "12 / 4"; //"12 * 5-(5 * (32 + 4)) + 3";
		parse(inputElem.current!.value)
	}, [])

	return (
		<div >
			<input ref={inputElem} name="groupTitle" type="text" 
				onChange={(e) => parse(e.target.value)}
			/>
			<div ref={resultElem}></div>
		</div>
	)
}