
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const events = [
  {
    title: 'Public Rally',
    date: '2024-03-20',
    location: 'Magathane Ground'
  },
  {
    title: 'Town Hall Meeting',
    date: '2024-03-25',
    location: 'Community Center'
  }
];

export default function EventsCalendar() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth'
            }}
          />
        </div>
      </div>
    </section>
  );
}
