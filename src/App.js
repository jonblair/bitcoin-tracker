import React, { Component } from 'react';
import moment from 'moment';
import ReactMoment from 'react-moment';
import CurrencyFormat from 'react-currency-format';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { AreaChart } from 'react-easy-chart';
import './App.css';

const _api = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const _historicalApi = "https://api.coindesk.com/v1/bpi/historical/close.json?index=usd";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      myChartName: null,
      myDisclaimer: null,
      myUpdatedTime: null,
      myHistory: [],
      myUsdInfo: [],
      myGbpInfo: [],
      myEurInfo: [],
    };

  }

  componentDidMount() {
    this.getBitcoinData();
    this.getHistoricalData();
  }

  getBitcoinData() {
    const request = async (_api) => {
      const response = await fetch(_api);
      const json = await response.json();

      this.setState({
        myChartName: json.chartName,
        myDisclaimer: json.disclaimer,
        myUpdatedTime: json.time.updated,
        myUsdInfo: json.bpi.USD,
        myGbpInfo: json.bpi.GBP,
        myEurInfo: json.bpi.EUR,
      });
    }
    
    request(_api);
   }

  getHistoricalData() {
    const historyRequest = async (_historicalApi) => {
      const historyResponse = await fetch(_historicalApi);
      const historyJson = await historyResponse.json();
      const sortedData = [];

      for (let date in historyJson.bpi){
        sortedData.push({
          x: moment(date).format('DD-MMM-YY'),
          y: Math.floor(historyJson.bpi[date]),
        });  
      }

      this.setState({
        myHistory: sortedData,
      });
    }

    historyRequest(_historicalApi);
  }

  render() {

    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Bitcoin Tracker</h1>
        </header>
        <p className="app-intro app-body">
        <p className="app-dates">
          Updated Date: <ReactMoment format="MM/DD/YYYY">{this.state.myUpdatedTime}</ReactMoment>
          <br/>
          Updated Time (UTC): <ReactMoment format="HH:mm">{this.state.myUpdatedTime}</ReactMoment>
          <br/>
          Local Time: <ReactMoment format="hh:mm A">{this.state.myUpdatedTime}</ReactMoment>
        </p>
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
        <p className="app-history">
        History: <br/>
          <p className="app-historygraph">
            <AreaChart
              xType={'time'}
              axes
              grid
              verticalGrid
              noAreaGradient
              areaColors={['#0000fd']}
              interpolate={'cardinal'}
              tickTimeDisplayFormat={'%m/%d'}
              width={1400}
              height={400}
              data={[this.state.myHistory]}
            />
          </p>
        </p>
        </p>
        <p className="app-footer">
          {this.state.myDisclaimer}
        </p>
      </div>
    );
  }
}

export default App;
