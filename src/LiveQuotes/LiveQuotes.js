import React, { Component } from "react";

import "./LiveQuotes.css";
import "./ShoppingCart.css";

import { liveQuotesStore } from "./LiveQuotesStore"
import { ShoppingCart } from './ShoppingCart' 


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }

    render() {
        return (
            <>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.mayorsOnly}
								onChange={this.handleInStockChange}
								style={{ display: 'inline', width: 'auto'}}
                    />
						  {' '}
                    Only show mayors
        			 </p>
            </>
        );
    }
}

class SymbolRow extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
        this.state = {
            symbol: this.props.symbol,
            symbolClone: null,
            inEdit: false
        }
        this.timeoutId = null;
    }


    componentDidMount() {
        const { symbol } = this.state;
        liveQuotesStore.subscribeToSymbol(symbol.symbolId, obj => {
            clearTimeout(this.timeoutId)
            this.setState({
                symbol: { ...symbol, ...obj }
            });
        });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        // TODO unsubscribe
    }

    handleTextChange(fldName, value) {
        const symbol = Object.assign({}, this.state.symbol);
        symbol[fldName] = value;
        this.setState({ symbol: symbol });
    }


    hideArrow() {
        const date = new Date();
        this.setState({
            symbol: { ...this.state.symbol, bidUp: null, askUp: null, epoch: date.getTime(), strEpoch: date.toLocaleTimeString() }
        })
        this.timeoutId = null;
    }

    render() {
        const { symbol } = this.state;
        const name = symbol.group !== "mayor" ?
            symbol.name :
            <span style={{ color: 'gold' }}>
                {symbol.name}
            </span>;
        const bidParts = symbol.bidParts;
        const bidUp = symbol.bidUp;
        const askParts = symbol.askParts;
        const askUp = symbol.askUp;

        //if (this.timeoutId != null)
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(this.hideArrow.bind(this), 2000);

        return (

            <tr>
                <td>{name}</td>
                <td style={{ textAlign: 'right', 'paddingRight': '0' }}>
                    <span>{bidParts.base}</span><span className='last2grid'>{bidParts.last2}</span><sup>{bidParts.fract}</sup>
                </td>
                <td style={{ textAlign: 'left', 'paddingLeft': '0', color: bidUp === 'bottom' ? 'green' : 'red' }}>
                    {bidUp ? <i className={`oi oi-caret-${bidUp}`} /> : null}
                </td>
                <td style={{ textAlign: 'right', 'paddingRight': '0' }}>
                    <span>{askParts.base}</span><span className='last2grid'>{askParts.last2}</span><sup>{askParts.fract}</sup>
                </td>
                <td style={{ textAlign: 'left', 'paddingLeft': '0', color: bidUp === 'bottom' ? 'green' : 'red' }}>
                    {askUp ? <i className={`oi oi-caret-${askUp}`} /> : null}
                </td>
                <td>{symbol.strEpoch}</td>
            </tr>

        );
    }
}



class SymbolTable extends React.PureComponent {
    render() {
        const filterText = this.props.filterText;
        const mayorsOnly = this.props.mayorsOnly;

        const rows = [];
        //let lastGroup = null;

        this.props.symbolRows.forEach((symbol) => {
            const filter = filterText.toUpperCase();
            if (symbol.name.indexOf(filter) === -1) {
                return;
            }
            if (mayorsOnly && symbol.group !== "mayor") {
                return;
            }
            rows.push(
                <SymbolRow
                    symbol={symbol}
                    key={symbol.name}
                />
            );
            //lastGroup = symbol.group;
        });

        return (
            <table className='table table-striped table-bordered table-hover table-sm table-dark my-table '>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th style={{textAlign:"right"}}>Bid</th>
                        <th style={{width: '20px'}}></th>
                        <th style={{textAlign:"right"}}>Ask</th>
                        <th style={{width: '20px'}}></th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}




class LiveQuotes extends Component {

  constructor(props) {
    super(props);

    this.state = {
        filterText: '',
        mayorsOnly: false,
        symbolRows: [],
        loading: true
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
    this.intervalId = null;
  }

  handleFilterTextChange(filterText) {
      this.setState({
          filterText: filterText
      });
  }

  handleInStockChange(mayorsOnly) {
      this.setState({
          mayorsOnly: mayorsOnly
      })
  }

  componentDidMount() {
      this.loadData();
  }

  componentDidUpdate() {
      //this.loadData();
  }

  componentWillUnmount() {
      clearInterval(this.intervalId);
  }

  //play() {
  //}

  loadData() {
    liveQuotesStore.getSnapshot(null)
          .then(symbolRows => {
              this.setState({
                  symbolRows: [...symbolRows],
                  loading: false
              });
              //this.intervalId = setInterval(this.play.bind(this), 1000);
          })
          .catch(reason => console.log('Handle rejected liveQuotesStore.subscribe promise:' + reason))
  }

  render() {
      return (
			<div style={{padding: '3% 20%'}}>
				<ShoppingCart />
				<div>
					<b>Demo using LightStreamer, WebSockets and React.</b>
					<br />Median feed is being calculated at server, from a few prominent broker's feeds,<br /> and pushed to the <b>traders</b> with low latency quotes. 
				</div>
				<br />
				<br />
				<div className="LiveQuotes">
					<SearchBar
						filterText={this.state.filterText}
						mayorsOnly={this.state.mayorsOnly}
						onFilterTextChange={this.handleFilterTextChange}
						onInStockChange={this.handleInStockChange}
					/>
					<SymbolTable
						symbolRows={this.state.symbolRows}
						filterText={this.state.filterText}
						mayorsOnly={this.state.mayorsOnly}
					/>
				</div>
			</div>
      );
  }


}

export default LiveQuotes;