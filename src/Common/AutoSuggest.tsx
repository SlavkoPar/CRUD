import * as React from 'react';

import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";

import './AutoSuggest.css'


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expression
// s#Using_Special_Characters
function escapeRegexCharacters(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}



const EntityAutosuggestMulti = Autosuggest as { new (): Autosuggest<string> };

interface IProps {
	namesALL: string[],
	onSelectQuery: (query: string) => void 
}

export class AutoSuggestEntity extends React.Component<IProps, any> {

	state: any;

	constructor(props: any) {
		 super(props);

		 this.state = {
			  value: '',
			  suggestions: this.getSuggestions(''),
			  highlighted: ''
		 };
	}
	// endregion region Rendering methods
	render(): JSX.Element {
		 const {value, suggestions} = this.state;

		 return <EntityAutosuggestMulti
		 	  onSuggestionsClearRequested={this.onSuggestionsClearRequested}  // (sl) added
			  multiSection={false}
			  suggestions={suggestions}
			  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
			  onSuggestionSelected={this.onSuggestionSelected.bind(this)}
			  getSuggestionValue={this.getSuggestionValue.bind(this)}
			  renderSuggestion={this.renderSuggestion}
			  // onSuggestionHighlighted={this.onSuggestionHighlighted} (sl)
			  onSuggestionHighlighted={this.onSuggestionHighlighted.bind(this)}  
			  highlightFirstSuggestion={true}
			  // renderInputComponent={this.renderInputComponent}
			  renderSuggestionsContainer={this.renderSuggestionsContainer}
			  inputProps={{
					placeholder: `Type part of name`,
					value,
					onChange: (e, changeEvent) => this.onChange(e, changeEvent),
			  }}/>;
	}

	protected onSuggestionsClearRequested = () => {
		this.setState({
		  suggestions: []
		});
	 };
  
  

	protected onSuggestionSelected(event: React.FormEvent<any>, data: Autosuggest.SuggestionSelectedEventData<string>): void {
		 // const entity: IEntity = data.suggestion;
		 // alert(`Selected student is ${student.gradeId} (${student.text}).`);
		 this.props.onSelectQuery(this.state.value);
	}

	/*
	protected renderSuggestion(suggestion: Student, params: Autosuggest.RenderSuggestionParams): JSX.Element {
		 const className = params.isHighlighted ? "highlighted" : undefined;
		 return <span className={className}>{suggestion.name}</span>;
	}
	*/

	protected renderSuggestion(suggestion: string, params: Autosuggest.RenderSuggestionParams): JSX.Element {
		// const className = params.isHighlighted ? "highlighted" : undefined;
		//return <span className={className}>{suggestion.name}</span>;
		const matches = AutosuggestHighlightMatch(suggestion, params.query);
		const parts = AutosuggestHighlightParse(suggestion, matches);
	 
		return (
		  <span>
			 {parts.map((part, index) => {
				const className = part.highlight ? 'react-autosuggest__suggestion-match' : undefined;
	 
				return (
				  <span className={className} key={index}>
					 {part.text}
				  </span>
				);
			 })}
		  </span>
		);
	}

	protected renderInputComponent(inputProps: Autosuggest.InputProps<string>): JSX.Element {
		 const { onChange, onBlur, ...restInputProps } = inputProps;
		 return (
			  <div>
					<input {...restInputProps} />
			  </div>
		 );
	}

	protected renderSuggestionsContainer({containerProps, children, query}: Autosuggest.RenderSuggestionsContainerParams): JSX.Element {
		 return (
			  <div {...containerProps}>
					<span>{children}</span>
			  </div>
		 );
	}
	// endregion region Event handlers
	protected onChange(event: React.FormEvent<any>, {newValue, method}: Autosuggest.ChangeEvent): void {
		this.setState({value: newValue});
		if (newValue === '')
			this.props.onSelectQuery('');
	}

	protected onSuggestionsFetchRequested({value}: any): void {
		 this.setState({
			  suggestions: this.getSuggestions(value)
		 });
	}

	private anyWord = (valueWordRegex: RegExp[], studentWords: string[]) : boolean => {
		for (let valWordRegex of valueWordRegex)
			for (let studentWord of studentWords)
				if (valWordRegex.test(studentWord))
					return true;
		return false;
	} 
	// endregion region Helper methods
	protected getSuggestions(value: string): string[] {
		const escapedValue = escapeRegexCharacters(value.trim());

		if (escapedValue === '') {
			return [];
		}

		const valueWords = escapedValue.split(' ');
		const valueWordRegex = valueWords.map(word => new RegExp(word, 'i') )
		// const regex = new RegExp('^' + escapedValue, 'i');
		// const regex = new RegExp(escapedValue, 'i');

		return this.props.namesALL.filter(name => this.anyWord(valueWordRegex, name.split(' ')))
	}

	protected getSuggestionValue(suggestion: string) {
		// return suggestion.name;
		return this.state.value 
	}


	protected onSuggestionHighlighted(params: Autosuggest.SuggestionHighlightedParams): void {
		 this.setState({
			  highlighted: params.suggestion
		 });
	}
	// endregion
}

