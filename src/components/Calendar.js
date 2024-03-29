import React, { Component } from 'react';
import {getMonth, getDay, mapDateDay} from "../helpers/helpers";
import "./common.scss";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";

export class Calendar extends Component {
    constructor(props){
        super(props)
            this.state = {
                currentDate: new Date(),
                showAddEventModal: false,
                showEditEventModal: false,
                eventList: JSON.parse(localStorage.getItem("eventList")),
            }
            this.date = 1;
    }

    getDates = (firstDayMonth, NoOfDays) => {
        const items = [];
        for (let i=0; i<6; i++){
            items.push(
                <tr key={i}>
                    {this.getDateColoumn(i, firstDayMonth, NoOfDays)}
                </tr>
            )
        }
        return items;
    }

    getEvents = (eventDetails) => {
        let events = [];
        eventDetails.length > 0 && eventDetails.map(val => {
            events.push(
                <div className="label_details">
                    <p>{val.eventName}
                        <button className="edit_event" onClick={()=>this.handleEditEvents(val)}>E</button>
                        <button className="Delete_event" onClick={() => this.handleDeleteEvents(val)}>D</button>
                    </p>
                </div>
            )
        })
        return events;
    }

    handleEditEvents = (eventDetail) =>{
        console.log(eventDetail);
        this.date = 1;
        this.setState({
            showEditEventModal: true,
            editEventDetails: eventDetail,
            _editEventDetails: eventDetail,
            eventName: eventDetail.eventName,
            eventDesc: eventDetail.eventDesc,
            hours: eventDetail.hours,
            minutes: eventDetail.minutes,
        })
    }

    handleDeleteEvents = (eventDetail) => {
        console.log(eventDetail);
        let allEvents = JSON.parse(localStorage.getItem("eventList"));
        debugger;
        allEvents.map((val, index) => {
            if (val.eventName === eventDetail.eventName && val.eventDesc === eventDetail.eventDesc && val.eventTime === eventDetail.eventTime && val.hours === eventDetail.hours && val.minutes === eventDetail.minutes){
                allEvents.splice(index, 1);
            }
        })
        localStorage.setItem("eventList", JSON.stringify(allEvents));
        this.date = 1;
        this.setState({
            eventList: JSON.parse(localStorage.getItem("eventList"))
        })
    }

    handleEditEventsButton = () => {
        const {eventName, eventDesc, hours, minutes, currentDate, _editEventDetails} = this.state;
        let existingEventList = JSON.parse(localStorage.getItem("eventList"));
        let newEvent = {
            eventName,
            eventDesc,
            eventTime: `${_editEventDetails.eventTime}`,
            hours,
            minutes
        }
        newEvent && existingEventList.map((val, index) => {
            if (val.eventName === _editEventDetails.eventName && val.eventDesc === _editEventDetails.eventDesc && val.eventTime === _editEventDetails.eventTime && val.hours === _editEventDetails.hours && val.minutes === _editEventDetails.minutes){
                existingEventList.splice(index, 1, newEvent);
            }
        })
        localStorage.setItem("eventList", JSON.stringify(existingEventList));
        this.date = 1;
        this.setState({
            eventList: JSON.parse(localStorage.getItem("eventList")),
            showEditEventModal: false
        })
    }
    getDateColoumn = (i, firstDayMonth, NoOfDays) => {
        let today = new Date();
        let {currentDate} = this.state;
        let days = [];
        for (let j=0; j<7; j++){
            let {eventList} = this.state;
            if (i === 0 && j<firstDayMonth){
                days.push(<td></td>)
            } else if (this.date > NoOfDays){
                break;
            } else{
                let currentDateEvents = [];
                eventList && eventList.map(value => {
                    let eventTime = (value.eventTime).split(",");
                    let eventTimeDetails = new Date(eventTime[0],eventTime[1],eventTime[2]);
                    if (eventTimeDetails.getFullYear() === currentDate.getFullYear() && eventTimeDetails.getMonth() === currentDate.getMonth() && this.date === eventTimeDetails.getDate()){
                        currentDateEvents.push(value);
                    }
                });
                console.log(currentDateEvents);
                if (this.date === today.getDate() && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear()){
                    days.push(
                        <td className="today_date">
                            <div>{this.date}</div>
                                {currentDateEvents.length > 0 && this.getEvents(currentDateEvents)}
                            <div><button name={this.date} onClick={ event =>this.handleAddEvent(event)} >Add Event</button></div>
                        </td>
                    )
                    this.date++;
                }else {
                    days.push(
                        <td key={this.date}>
                            <div>{this.date}</div>
                            {currentDateEvents.length > 0 && this.getEvents(currentDateEvents)}
                            <div><button name={this.date} onClick={event => this.handleAddEvent(event)}>Add Event</button></div>
                        </td>
                        );
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

    handleCancelButton = (action) => {
        this.date = 1;
        if (action.toLowerCase() === "add"){
            this.setState(() =>{
                return{
                    showAddEventModal: false
                }
            })
        }else {
            this.setState(() =>{
                return{
                    showEditEventModal: false
                }
            })
        }
    }

    handleOnChange = (event) => {
        this.date = 1;
        this.setState({
            [event.target.name]: event.target.value,
            editEventDetails: {
                [event.target.name]: event.target.value
            }
        })
    }

    handleAddEventButton = () => {
        const {eventName, eventDesc, hours, minutes, currentDate, selectedDate} = this.state;
        let existingEventList = JSON.parse(localStorage.getItem("eventList")) || [];
        let newEvent = {
            eventName,
            eventDesc,
            eventTime: `${currentDate.getFullYear()},${currentDate.getMonth()},${selectedDate}`,
            hours,
            minutes
        }
        newEvent && existingEventList.push(newEvent)
        localStorage.setItem("eventList", JSON.stringify(existingEventList));
        this.date = 1;
        this.setState({
            eventList: JSON.parse(localStorage.getItem("eventList")),
            showAddEventModal: false
        })
    }

    renderCalendar = () => {
        const {currentDate} = this.state;
        let NoOfDays = this.getDaysInaMonth(currentDate.getFullYear(), currentDate.getMonth()+1);
        let firstDayMonth = mapDateDay(currentDate.getFullYear(), currentDate.getMonth(), 1);
        console.log(firstDayMonth);
        console.log(NoOfDays);
        let month = getMonth(currentDate.getMonth()+1);
        return (
            <div className="Calendar">
                <div className={"Month_year_Details_container"}>
                    <button onClick={() => this.handleMonth("Prev")}>PrevMonth</button>
                    <h2>{month} {currentDate.getFullYear()}</h2>
                    <button onClick={() => this.handleMonth("Next")}>NextMonth</button>
                </div>
                <ul className="days_container">
                    <table className="month_table">
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
    handleAddEvent = (event) => {
        debugger;
        this.date = 1;
        let selectedDate = event.target.name;
        this.setState(prevState => {
            return{
                showAddEventModal: !prevState.showAddEventModal,
                selectedDate: selectedDate,
                eventName: null,
                eventDesc: null,
                hours: null,
                minutes: null,
            }
        })
    }
    render() {
        const {showAddEventModal, showEditEventModal, editEventDetails} = this.state;
        return (
            <div className="calendar_container">
                {this.renderCalendar()}
                {showAddEventModal && <AddEvent handleCancelButton={this.handleCancelButton} handleAddEventButton={this.handleAddEventButton} handleOnChange={this.handleOnChange}/>}
                {showEditEventModal && <EditEvent handleEditEvents={this.handleEditEventsButton} editEventDetails={editEventDetails} handleOnChange={this.handleOnChange} handleCancelButton={this.handleCancelButton}></EditEvent>}
            </div>
        )
    }
}

export default Calendar
