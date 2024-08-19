import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';
import { clearInterval } from 'timers';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph:boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph:false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if(this.state.showGraph){    return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    // Initialize a counter to limit the number of data fetches
    let x = 0;
  
    // Set an interval to fetch data from the server every 100ms
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // Update the state with the new data and set showGraph to true
        this.setState({
          data: [...this.state.data, ...serverResponds],
          showGraph: true,
        });
      });
  
      // Increment the counter
      x++;
  
      // Clear the interval after 1000 fetches
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  }
  

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
