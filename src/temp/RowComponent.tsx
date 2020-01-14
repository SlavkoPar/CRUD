type RenderPropType<InputType, OtherInputType> = { c: number } & InputType & OtherInputType;

type RowComponentPropTypes<InputType, OtherInputType> = {
  input: InputType;
  otherInput: OtherInputType;
  render: (props: RenderPropType<InputType, OtherInputType>) => JSX.Element;
};


export function RowComponent<
	InputType extends { a: number },
	OtherInputType extends { b: number }
> (props: RowComponentPropTypes<InputType, OtherInputType>) {

  	const convert = (input: InputType, output: OtherInputType) => {
   	return { c: input.a + output.b, ...input, ...output };
	};
	  
   return props.render(
   	convert(props.input, props.otherInput)
   );
}

/*
<div>Row Component</div>
			<RowComponent
				input={{ a: 1 }}
				otherInput={{ b: 2 }}
				render={({ a, b, c }) => (
					<div>
						{a} {b} {c}
					</div>
				)}
			/>
*/