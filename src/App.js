import React, { Component } from 'react';
import ReactMoment from 'react-moment';
import './App.css';

//Components
import HistoryGraph from './history-graph';
import CurrentPrices from './prices';

const _api = 'https://api.coindesk.com/v1/bpi/currentprice.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      myChartName: null,
      myDisclaimer: null,
      myUpdatedTime: null,
      myCurrentUsdRate: null,
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
        myCurrentUsdRate: json.bpi.USD.rate_float,
      });
    }
    
    request(_api);
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
        <CurrentPrices/>
        <p className="app-history">
          <HistoryGraph currentPrice={this.state.myCurrentUsdRate}/>
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
