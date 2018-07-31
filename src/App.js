import React, { Component } from 'react';
import './App.css';
import Moment from 'react-moment';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

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
          d: date,
          p: historyJson.bpi[date].toLocaleString(),
          x: sortedData.length,
          y: historyJson.bpi[date]
        });
      }


      this.setState({
        myHistory: sortedData,
      });
  }

  historyRequest(_historicalApi);
}

  render() {
    console.log(this.state.myHistory);

    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Bitcoin Tracker</h1>
        </header>
        <p className="app-intro app-body">
        <p className="app-dates">
          Updated Date: <Moment format="MM/DD/YYYY">{this.state.myUpdatedTime}</Moment>
          <br/>
          Updated Time (UTC): <Moment format="HH:mm">{this.state.myUpdatedTime}</Moment>
          <br/>
          Local Time: <Moment format="hh:mm A">{this.state.myUpdatedTime}</Moment>
        </p>
        <p className="app-prices">
          Current Price: <br/>
          <table className="priceTable">
            <tr>
              <td>{ ReactHtmlParser(this.state.myUsdInfo.symbol) } {this.state.myUsdInfo.rate} {this.state.myUsdInfo.code} ({this.state.myUsdInfo.description})</td>
            </tr>
            <tr>
            <td>{ ReactHtmlParser(this.state.myGbpInfo.symbol) } {this.state.myGbpInfo.rate} {this.state.myGbpInfo.code} ({this.state.myGbpInfo.description})</td>
            </tr>
            <tr>
            <td>{ ReactHtmlParser(this.state.myEurInfo.symbol) } {this.state.myEurInfo.rate} {this.state.myEurInfo.code} ({this.state.myEurInfo.description})</td>
            </tr>
          </table>
        </p>
        <p className="app-history">
        History (Last 31 Days): <br/>
          <p className="app-historygraph">
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
