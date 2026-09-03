import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./App.css";

function App() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Instagram Post",
      date: "2026-09-05",
      renderingStatus: "Rendered",
      optimizationStatus: "Optimized"
    },
    {
      id: "2",
      title: "LinkedIn Post",
      date: "2026-09-10",
      renderingStatus: "Rendering",
      optimizationStatus: "Not Optimized"
    },
    {
      id: "3",
      title: "Twitter Post",
      date: "2026-09-15",
      renderingStatus: "Pending",
      optimizationStatus: "Optimized"
    }
  ]);

  const handleDateClick = (info) => {
    const title = prompt("Enter post title:");

    if (!title) return;

    const renderingStatus = prompt(
      "Enter Rendering Status:\nPending / Rendering / Rendered",
      "Pending"
    );

    const optimizationStatus = prompt(
      "Enter Optimization Status:\nOptimized / Not Optimized",
      "Not Optimized"
    );

    const newEvent = {
      id: Date.now().toString(),
      title: title,
      date: info.dateStr,
      renderingStatus: renderingStatus || "Pending",
      optimizationStatus: optimizationStatus || "Not Optimized"
    };

    setEvents([...events, newEvent]);
  };

  const handleEventClick = (info) => {
    const event = info.event;

    alert(
      "POST DETAILS\n\n" +
      "Title: " + event.title +
      "\nDate: " + event.startStr +
      "\nRendering Status: " +
      event.extendedProps.renderingStatus +
      "\nOptimization Status: " +
      event.extendedProps.optimizationStatus
    );
  };

  const renderEventContent = (eventInfo) => {
    const { renderingStatus, optimizationStatus } =
      eventInfo.event.extendedProps;

    return (
      <div className="custom-event">
        <b>{eventInfo.event.title}</b>

        <small className="render-status">
          {renderingStatus}
        </small>

        <small className="optimization-status">
          {optimizationStatus}
        </small>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Post Scheduling Calendar</h1>

      <p>
        Click on a date to add a post.
        Drag posts to change their schedule.
      </p>

      <div className="legend">
        <span>🟡 Pending</span>
        <span>🔵 Rendering</span>
        <span>🟢 Rendered</span>
        <span>⚡ Optimized</span>
        <span>❌ Not Optimized</span>
      </div>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          editable={true}
        />
      </div>
    </div>
  );
}

export default App;