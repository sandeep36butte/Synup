import React, { Component } from 'react';
import {getMonth, getDay, mapDateDay} from "../helpers/helpers";
import "./common.scss";

export class Calendar extends Component {
    constructor(props){
        super(props)
            this.state = {
                currentDate: new Date()
            }
            this.date = 1;
    }
    getDates = (firstDayMonth, NoOfDays) => {
        debugger;
        const items = [];
        for (let i=0; i<6; i++){
            items.push(
                <tr>
                    {this.getDateColoumn(i, firstDayMonth, NoOfDays)}
                </tr>
            )
        }
        return items;
    }
    getDateColoumn = (i, firstDayMonth, NoOfDays) => {
        debugger;
        let today = new Date();
        let days = [];
        for (let j=0; j<7; j++){
            if (i === 0 && j<firstDayMonth){
                days.push(<td></td>)
            } else if (this.date > NoOfDays){
                break;
            } else{
                if (this.date === today.getDate()){
                    days.push(<td className="today_date">{this.date}</td>)
                    this.date++;
                }else {
                    days.push(<td>{this.date}</td>);
                    this.date++;
                }
            }
        }
        return days;
    }
    handleMonth = (action) => {
        let currentDate = this.state.currentDate;
        let selectedDate = {};
        if (action.toLowerCase() === "prev"){
            console.log("Previous Month");
            if (currentDate.getMonth() === 0){
                selectedDate.month = 11;
                selectedDate.year = currentDate.getFullYear() - 1;
            } else {
                selectedDate.month = currentDate.getMonth() -1;
                selectedDate.year = currentDate.getFullYear();
            }
            console.log(selectedDate);
        } else {
            console.log("next month");
            if (currentDate.getMonth() === 11){
                selectedDate.month = 0;
                selectedDate.year = currentDate.getFullYear() +1 ;
            } else {
                selectedDate.month = currentDate.getMonth() + 1;
                selectedDate.year = currentDate.getFullYear();
            }
        }
        console.log(selectedDate);
        let _selectedMonth = selectedDate.month;
        let _selectedYear = selectedDate.year;
        this.date = 1;
        this.setState({
            currentDate: new Date(_selectedYear, _selectedMonth, 1)
        })
    }
    renderCalendar = () => {
        const {currentDate} = this.state;
        debugger;
        let NoOfDays = this.getDaysInaMonth(currentDate.getFullYear(), currentDate.getMonth()+1);
        let firstDayMonth = mapDateDay(currentDate.getFullYear(), currentDate.getMonth(), 1);
        console.log(firstDayMonth);
        console.log(NoOfDays);
        let month = getMonth(currentDate.getMonth()+1);
        let MonthArray = [];
        for (let i=1; i<=NoOfDays; i++){
            MonthArray.push(i);
        }
        console.log(MonthArray);
        return (
            <div className="Calendar">
                <div className={"Month_year_Details_container"}>
                    <button onClick={() => this.handleMonth("Prev")}>PrevMonth</button>
                    <h2>{month} {currentDate.getFullYear()}</h2>
                    <button onClick={() => this.handleMonth("Next")}>NextMonth</button>
                </div>
                <ul className="days_container">
                    <table>
                        <thead>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thr</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </thead>
                        {this.getDates(firstDayMonth, NoOfDays)}
                    </table>
                </ul>
            </div>
        )
    }
    getDaysInaMonth = (year, month) => {
        var now = new Date(year, month);
        return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    }
    render() {
        return (
            <div className="calendar_container">
                {this.renderCalendar()}
            </div>
        )
    }
}

export default Calendar
