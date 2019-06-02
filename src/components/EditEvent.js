import React, { Component } from 'react'


const EditEvent = ({handleEditEvents, editEventDetails, handleOnChange , handleCancelButton}) => {
    return (
        <div className="addevent_container"> 
            <div className="event_detaild">
                <div className="event_name_contaner">
                    <label>Event Name:</label>
                    <input type="text" name="eventName" onChange={event => handleOnChange(event)} value={editEventDetails.eventName}/>
                </div>
                <div className="event_desc">
                    <label>Event Description:</label>
                    <textarea name="eventDesc" onChange={event => handleOnChange(event)} value={editEventDetails.eventDesc}/>
                </div>
                <div className="event_time">
                <div className="hours">
                        Hours:<input type="text" name="hours" onChange={event => handleOnChange(event)} value={editEventDetails.hours}/>
                        Minutes:<input type="text" name="minutes" onChange={event => handleOnChange(event)} value={editEventDetails.minutes}/>
                </div>
                </div>
            </div>
            <div className="event_buttons">
                <button onClick={handleEditEvents}>Edit event</button>
                <button onClick={() => handleCancelButton("close")}>cancel</button>
            </div>
        </div>
    )
}

export default EditEvent
