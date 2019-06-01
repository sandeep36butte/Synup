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
      </div>
    );
  }
}

export default App;
