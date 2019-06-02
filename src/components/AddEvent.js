import React, { Component } from 'react'


const AddEvent = ({handleCancelButton, handleAddEventButton, handleOnChange}) => {
    return (
        <div className="addevent_container"> 
            <div className="event_detaild">
                <div className="event_name_contaner">
                    <label>Event Name:</label>
                    <input type="text" name="eventName" onChange={event => handleOnChange(event)}/>
                </div>
                <div className="event_desc">
                    <label>Event Description:</label>
                    <textarea name="eventDesc" onChange={event => handleOnChange(event)}/>
                </div>
                <div className="event_time">
                <div className="hours">
                        Hours:<input type="text" name="hours" onChange={event => handleOnChange(event)}/>
                        Minutes:<input type="text" name="minutes" onChange={event => handleOnChange(event)}/>
                </div>
                </div>
            </div>
            <div className="event_buttons">
                <button onClick={handleAddEventButton}>Add event</button>
                <button onClick={() => handleCancelButton("Add")}>cancel</button>
            </div>
        </div>
    )
}

export default AddEvent
