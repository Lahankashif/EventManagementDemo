document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('#app');
    const dashboard = document.querySelector('#dashboard');
    const attendeeTable = document.querySelector('#attendees-table tbody');
    const details = document.querySelector('#details');
    const detailsHeading = document.querySelector('#details-heading');
    const detailsTable = document.querySelector('#details-table tbody');
    const detailsHeader = document.querySelector('#details-header');
    const backButton = document.querySelector('#back-button');

    const data = {
        attendees: [
            { id: 1, name: 'Lahan Kashif', email: 'lahankashif@gmail.com', phone: '0312-6753321', totalEvents: 3 },
            { id: 2, name: 'Ajia Kashif', email: 'ajiakashif@yahoo.com', phone: '0332-72638264', totalEvents: 2 }
        ],
        images: [
            'pictures/2.jpeg', 'pictures/3.png', 'pictures/4.avif', 'pictures/5.jpeg'
        ],
        events: [
            {
                attendeeId: 1, events: [
                    { eventId: 101, eventName: 'Event A', eventDate: '2023-08-01', location: 'Location A', status: 'registered' },
                    { eventId: 102, eventName: 'Event B', eventDate: '2023-08-02', location: 'Location B', status: 'attended' }
                ]
            },
            {
                attendeeId: 2, events: [
                    { eventId: 103, eventName: 'Event C', eventDate: '2023-08-03', location: 'Location C', status: 'canceled' }
                ]
            }
        ],
        sessions: [
            {
                eventId: 101, sessions: [
                    { title: 'Session 1', speaker: 'Speaker 1', duration: '10:00AM - 11:00AM', materials: 'Material 1' },
                    { title: 'Session 2', speaker: 'Speaker 2', duration: '11:00AM - 13:00PM', materials: 'Material 2' }
                ]
            },
            {
                eventId: 102, sessions: [
                    { title: 'Session 3', speaker: 'Speaker 3', duration: '09:00AM - 12:00PM', materials: 'Material 3' }
                ]
            }
        ]
    };
//******************** IMAGES************//
function images(number){
    app.style.backgroundImage = `url('${data.images[number]}')`;
    app.style.backgroundSize = 'cover';
    app.style.backgroundPosition = 'center';
}
    // ************Table 1***********//
    function listOfAttendee() {
        attendeeTable.innerHTML = '';
        data.attendees.forEach(attendee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="#" data-id="${attendee.id}">${attendee.name}</a></td>
                <td>${attendee.email}</td>
                <td>${attendee.phone}</td>
                <td>${attendee.totalEvents}</td>
            `;
            attendeeTable.appendChild(row);
        });

        anchorStyle(attendeeTable,'black');
        images(0);
    }
    listOfAttendee();

    //****AnchorStyle*****//
    function anchorStyle(table,color) {
        const anchorTags = table.querySelectorAll('a');
        anchorTags.forEach(anchor => {
            anchor.style.color = color;
            anchor.style.textDecoration = 'underline';
            anchor.style.fontWeight = 'bold';
            
        });
        rowStyle(table,color);

    }
    function rowStyle(table,color) {
        const rowTags = table.querySelectorAll('tr');
        rowTags.forEach(row => {
            row.style.color = color;    
            row.style.backgroundColor = 'lightgrey';
        });
    }
    //*************BackButton*******//
    backButton.addEventListener('click', (e) => {
        details.style.display = 'none';
        dashboard.style.display = 'block';
        images(0);
    });

    //*********Event Attended********//
    attendeeTable.addEventListener('click', (e) => {
        const hold = e.target;
        if (hold.nodeName === 'A') {
            const attendeeId = hold.getAttribute('data-id');
            let attendee;
            for (let i = 0; i < data.attendees.length; i++) {
                if (data.attendees[i].id == attendeeId) {
                    attendee = data.attendees[i];
                    break;
                }
            }

            let info;
            for (let i = 0; i < data.events.length; i++) {
                if (data.events[i].attendeeId == attendeeId) {
                    info = data.events[i].events;
                    break;
                }
            }

            detailsHeading.textContent = `${attendee.name}`;
            detailsHeader.innerHTML = `
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
            `;

            function listOfEvent() {
                detailsTable.innerHTML = '';
                info.forEach(event => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><a href="#" data-id="${event.eventId}">${event.eventName}</a></td>
                        <td>${event.eventDate}</td>
                        <td>${event.location}</td>
                        <td>${event.status}</td>
                    `;
                    detailsTable.appendChild(row);
                });

                anchorStyle(detailsTable,'black');
                
        
            }
            listOfEvent();
            images(2);
            details.style.display = 'block';
            dashboard.style.display = 'none';
        }
    });

    //**********Event Information*********//
    detailsTable.addEventListener('click', (e) => {
        const hold = e.target;
        if (hold.nodeName === 'A') {
            const eventId = hold.getAttribute('data-id');
            let eventSessions;
            for (let i = 0; i < data.sessions.length; i++) {
                if (data.sessions[i].eventId == eventId) {
                    eventSessions = data.sessions[i].sessions;
                    break;
                }
            }

            detailsHeading.textContent = `Event Details`;
            detailsHeader.innerHTML = `
                <th>Session Title</th>
                <th>Speaker/Instructor</th>
                <th>Duration</th>
                <th>Materials/Resources</th>
            `;

            function infoOfEvent() {
                detailsTable.innerHTML = '';
                eventSessions.forEach(session => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${session.title}</td>
                        <td>${session.speaker}</td>
                        <td>${session.duration}</td>
                        <td>${session.materials}</td>
                    `;
                    detailsTable.appendChild(row);
                });

                anchorStyle(detailsTable,'black');
                
               
            }
            infoOfEvent();
            images(1);
            details.style.display = 'block';
            dashboard.style.display = 'none';
        }
    });
});
