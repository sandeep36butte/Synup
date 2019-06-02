import React from 'react';
import Calendar from "./components/Calendar";
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentDate: new Date()
    }
  }
  render(){
    const {currentDate} = this.state;
    return (
      <div className="App">
        <Calendar currentDate={currentDate}/>
        <footer>Note: Hover on to Events to Edit Events</footer>
      </div>
    );
  }
}

export default App;
