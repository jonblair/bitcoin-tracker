import React, { Component } from 'react';
import moment from 'moment';
import { AreaChart } from 'react-easy-chart';
import CurrencyFormat from 'react-currency-format';
import './App.css';


const _api = "https://api.coindesk.com/v1/bpi/historical/close.json?index=usd";

class HistoryGraph extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            myHistory: [],
        };
    }

    componentDidMount() {
        this.getHistoricalData();
    }

    getHistoricalData() {
        const request = async (_api) => {
          const response = await fetch(_api);
          const myjson = await response.json();
          const sortedData = [];
    
          for (let date in myjson.bpi){
            sortedData.push({
              x: moment(date).format('DD-MMM-YY'),
              y: Math.floor(myjson.bpi[date]),
              z: myjson.bpi[date],
            });  
          }
    
          this.setState({
            myHistory: sortedData,
          });
        }
    
        request(_api);
      }

      render() {
          var maxPrice = Math.max.apply(Math, this.state.myHistory.map(function(lp) { return lp.z; }));
          var minPrice = Math.min.apply(Math, this.state.myHistory.map(function(hp) { return hp.z; }));
          var yesterdayPrice = null;
          var myPriceChange = null; 
          if (this.state.myHistory[this.state.myHistory.length - 1] !== undefined)
          {
            yesterdayPrice = this.state.myHistory[this.state.myHistory.length - 1].z;
            myPriceChange = this.props.currentPrice - yesterdayPrice;
          }

          return (
            <div>
            History (USD): <br/>
                <p className="app-historygraph">
                    <div class="app-historygraph-table">
                        <div class="app-historygraph-tableBody">
                            <div class="app-historygraph-tableRow">
                                <div class="app-historygraph-tableCell">
                                    Highest Price: <br/>  
                                    <CurrencyFormat value={maxPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
                                </div>
                                <div class="app-historygraph-tableCell">
                                    Lowest Price: <br/>
                                    <CurrencyFormat value={minPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
                                </div>
                                <div class="app-historygraph-tableCell">
                                    Price Yesterday: <br/>
                                </div>
                            </div>
                        </div>
                    </div>
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
            </div>
          );
      }
}

export default HistoryGraph;