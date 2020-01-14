import React from "react";


interface IProps {
	query: string
}


interface KeyPair<T, U> {
	key: T;
	value: U;
}

class Person {
	firstName: string;
	lastName: string;

	constructor(fname:string,  lname:string) { 
		 this.firstName = fname;
		 this.lastName = lname;
	}
}

interface IExample {
	fullName: string | null, 
	age : number
}
export const Example: React.FC<IExample> = ({fullName, age}) => {
	const [state] = React.useState<IExample>({fullName: fullName, age:age});
	return <div>Hello {state.fullName} {state.age}</div>;
};


export const Generics: React.FC<IProps> = (props: IProps) => {

	function displayNames<T>(names: T[]): string { 

		interface s {
			entities: T[];
			entity: T
		}
	
		return names.join(", ")
  }

	function displayPerson<T extends Person>(per: T): string {
		return `${ per.firstName} ${per.lastName}`;
	}
  
	// 1
	const res = displayNames<string>(["Steve", "Bill"]);
	const res2 = displayNames<number>([111, 222]);

	// 2
	const per = new Person("Bill", "Gates");
	const pers = displayPerson(per);

	// 3
	type kpNumStr = KeyPair<number, string>;
	type kpNumNum = KeyPair<number, number>;
  	let kv1: kpNumStr = { key:1, value:"Steve" }; // OK
	let kv2: kpNumNum = { key:2, value:12345 }; // OK

	interface zeka {
		kv1: kpNumStr;
		kv2: kpNumNum;
	}

	const ssss : zeka = {
		kv1:  { key:1, value:"Steve" },
		kv2:  { key:2, value:12345 }
	}

	// 4 Generic Interface as Function Type
	interface KeyValueProcessor<T, U> {
   	(key: T, val: U): string;
	};

	//function processStringKeyPairs(key: number, value:string): string { 
   //	return 'processStringKeyPairs: key = '+ key + ', value = ' + value
	//}
	function processStringKeyPairs<T, U>(key:T, value:U): string { 
		return `processKeyPairs: key = ${key}, value = ${value}`
  }

	let strKVProcessor: KeyValueProcessor<number, string> = processStringKeyPairs;
	const kvProcessor = strKVProcessor(1, "Bill");

	// 5 class implement interface
	interface IKeyValueProcessor<T, U>
	{
		 process(key: T, val: U): string;
	};
	
	class kvProcessor2 implements IKeyValueProcessor<number, string>
	{ 
		 process(key:number, val:string): string { 
			  return `Zaga Key = ${key}, val = ${val}`
		 }
	}
	
	let proc: IKeyValueProcessor<number, string> = new kvProcessor2();
	const zaga = proc.process(1, 'Bill'); 

	//  6  middleElement !!!!!!!!!!!!!!!!!!!!
	type numArr = Array<number>;

	const middleElement: <T>(arr: Array<T>) => T = (arr) => {
		return arr[Math.floor(arr.length / 2)];
	};

	let numberArray: numArr = [1, 2, 3, 4, 5];
	let middle1 = middleElement(numberArray);

	// 7

	interface IZaba {
		firstName: string;
		lastName: string;
		age: number;
	}
	
	// const makeICardDetail = (obj: IZaba) => {
	// 	return {
	// 	  ...obj, //Copy other contents of Object as it is.
	// 	  ICard: obj.firstName + " " + obj.lastName + ", " + obj.age
	// 	};
	// };
	const makeICardDetail = <T extends IZaba>(obj: T) => {
		return {
			...obj,
			ICard: obj.firstName + " " + obj.lastName + ", " + obj.age
		};
	};

	const obj = {
		firstName: "Vinod",
		lastName: "Chauhan",
		age: 27,
		location: "India"
	}
	let makeNewDetail = makeICardDetail(obj);
	const makeNewD = JSON.stringify(makeNewDetail.ICard);

	return (
		<div>
			<div>
				res str:{res} 
				<br />
				res num:{res2}
			</div>
			<div>
				pers: {pers}
			</div>
			<div>
				KeyPair {JSON.stringify(kv1)} : {JSON.stringify(kv2)}
				<br />
				{JSON.stringify(ssss)}
			</div>
			<div>
				Generic Interface as Function Type => {kvProcessor}
			</div>
			<div>
				{zaga}
			</div>
			<div>
				Middle is: {middle1}
			</div>
			<div>
				makeNewD: {makeNewD}
			</div>
			<div>
				<Example	fullName="Pera" age={65} />
			</div>
		</div>
	);
}

