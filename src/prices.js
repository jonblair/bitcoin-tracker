import React, { Component } from 'react';
import moment from 'moment';
import ReactMoment from 'react-moment';
import { subscribeToTimer } from './api';
import CurrencyFormat from 'react-currency-format';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './App.css';

const _api = 'https://api.coindesk.com/v1/bpi/currentprice.json';

class CurrentPrices extends Component {
    constructor(props) {
      super(props);
  
      //10 seconds
      subscribeToTimer(1000, (err, timestamp) => 
        this.getBitcoinData()   
      )

      this.state = { 
        myUsdInfo: [],
        myGbpInfo: [],
        myEurInfo: [],
      };
    }
  
    componentDidMount() {
      this.getBitcoinData();
    }
  
    getBitcoinData() {
      const request = async (_api) => {
        const response = await fetch(_api);
        const json = await response.json();
  
        this.setState({
          myUsdInfo: json.bpi.USD,
          myGbpInfo: json.bpi.GBP,
          myEurInfo: json.bpi.EUR,
        });
      }
      
      request(_api);
     }
  
    render() {
      return (
        <div>
          <p className="app-prices">
            Current Price:
            <br/>
            <table className="priceTable">
              <tr>
              <td>{this.state.myUsdInfo.description} ({this.state.myUsdInfo.code}): <CurrencyFormat value={this.state.myUsdInfo.rate} displayType={'text'} thousandSeparator={true} prefix={ ReactHtmlParser(this.state.myUsdInfo.symbol)  } decimalScale={2} /></td>
              </tr>
              <tr>
              <td>{this.state.myGbpInfo.description} ({this.state.myGbpInfo.code}): <CurrencyFormat value={this.state.myGbpInfo.rate} displayType={'text'} thousandSeparator={true} prefix={ ReactHtmlParser(this.state.myGbpInfo.symbol)  } decimalScale={2} /></td>
              </tr>
              <tr>
              <td>{this.state.myEurInfo.description} ({this.state.myEurInfo.code}): <CurrencyFormat value={this.state.myEurInfo.rate} displayType={'text'} thousandSeparator={true} prefix={ ReactHtmlParser(this.state.myEurInfo.symbol)  } decimalScale={2} /></td>
              </tr>
            </table>
          </p>
        </div>
      );
    }
  }
  
  export default CurrentPrices;