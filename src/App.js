import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Moment from 'react-moment';

const _api = 'https://api.coindesk.com/v1/bpi/currentprice.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      myChartName: null,
      myDisclaimer: null,
      myUpdatedTime: null,
      myRateUS: null,
      myRateCodeUS: null,
      myRateSymbolUS: null,
      myRateDescriptionUS: null,
      myRateGB: null,
      myRateCodeGB: null,
      myRateSymbolGB: null,
      myRateDescriptionGB: null,
      myRateEU: null,
      myRateCodeEU: null,
      myRateSymbolEU: null,
      myRateDescriptionEU: null
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
        myChartName: json.chartName,
        myDisclaimer: json.disclaimer,
        myUpdatedTime: json.time.updated,
        myRateUS: json.bpi.USD.rate,
        myRateCodeUS: json.bpi.USD.code,
        myRateSymbolUS: json.bpi.USD.symbol,
        myRateDescriptionUS: json.bpi.USD.description,
        myRateGB: json.bpi.GBP.rate,
        myRateCodeGB: json.bpi.GBP.code,
        myRateSymbolGB: json.bpi.GBP.symbol,
        myRateDescriptionGB: json.bpi.GBP.description,
        myRateEU: json.bpi.EUR.rate,
        myRateCodeEU: json.bpi.EUR.code,
        myRateSymbolEU: json.bpi.EUR.symbol,
        myRateDescriptionEU: json.bpi.EUR.description
      })
    }
    
    request(_api);
   
   }

  render() {

    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">{this.state.myChartName} Tracker</h1>
        </header>
        <p className="app-intro app-body">
        <p>
          Updated: {this.state.myUpdatedTime}
          <br/>
          Local: <Moment format="MM/DD/YYYY hh:mm A">{this.state.myUpdatedTime}</Moment>
        </p>
        <p>
          Prices: <br/>
          <table className="priceTable">
            <tr>
              <td>$ {this.state.myRateUS} {this.state.myRateCodeUS}</td>
            </tr>
            <tr>
              <td>£ {this.state.myRateGB} {this.state.myRateCodeGB}</td>
            </tr>
            <tr>
              <td>€ {this.state.myRateEU} {this.state.myRateCodeEU}</td>
            </tr>
          </table>
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
