import React, { Component } from 'react';
import {getMonth, getDay} from "../helpers/helpers";
import "./common.scss";

export class Calendar extends Component {
    constructor(props){
        super(props)
            this.state = {
                currentDate: new Date()
            }
    }
    renderCalendar = () => {
        const {currentDate} = this.state;
        let NoOfDays = this.getDaysInaMonth(currentDate.getFullYear(), currentDate.getMonth()+1);
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
                    <button>PrevMonth</button>
                    <h2>{month} {currentDate.getFullYear()}</h2>
                    <button>PrevMonth</button>
                </div>
                {/* <div className="week_days">
                    <ul>
                        <li></li>
                    </ul>
                </div> */}
                <ul className="days_container">
                    <table>
                        <thead>
                            <th></th>
                        </thead>
                    </table>
                    {
                        MonthArray.map((value, index) => {
                            return (
                                <li className="day">{value}</li>
                            )
                        })
                    }
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
