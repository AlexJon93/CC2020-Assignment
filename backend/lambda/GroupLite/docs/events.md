# Events

***Create Event***

Creates event in database from given details
* URL: /event
* Method: POST
* Post Request:
    ```json
    {
        "event_title": "My Birthday",
        "event_creator": 1,
        "event_group": 1,
        "event_date": "2020-06-06 18:30", //optional
        "event_location": "123 Fake St" //optional
    }
    ```
* Success Response:
    * Status Code: 200
    * No JSON Response

***Get Event***

Returns JSON Data of an event from a given event id
* URL: /event?event_id={id}
* Method: GET
* URL Parameter: {id} = integer value
* Success Response:
    ```json
    {
        //optional values return null if not specified
        "EventID": 1,
        "EventTitle": "My Birthday",
        "EventCreator": 1,
        "EventGroup": 1,
        "EventDate": "2020-06-06 18:30:00",
        "EventLocation": "123 Fake St"
    }
    ```

***Get Group Events***

Returns JSON Data of all events in a given group
* URL: /group/events?group_id={id}
* Method: GET
* URL Parameter: {id} = integer value
* Success Response:
    ```json
    {
        "events": [
            {
                "EventID": 1,
                "EventTitle": "My Birthday",
                "EventCreator": 1,
                "EventGroup": 1,
                "EventDate": "2020-06-06 18:30:00",
                "EventLocation": "123 Fake St"
            },
            {
                "EventID": 2,
                "EventTitle": "My Wedding",
                "EventCreator": 5,
                "EventGroup": 1,
                "EventDate": "2020-20-06 18:30:00",
                "EventLocation": "456 AnotherFake St"
            }
        ]
    }
    ```

***Get Users Events***

Returns JSON Data of all events created by a given user
* URL: /user/events?user_id=1
* Method: GET
* URL Parameter: {id} = integer value
* Success Response:
    ```json
    {
        "events": [
            {
                "EventID": 1,
                "EventTitle": "My Birthday",
                "EventCreator": 1,
                "EventGroup": 1,
                "EventDate": "2020-06-06 18:30:00",
                "EventLocation": "123 Fake St"
            },
            {
                "EventID": 2,
                "EventTitle": "My Wedding",
                "EventCreator": 1,
                "EventGroup": 5,
                "EventDate": "2020-20-06 18:30:00",
                "EventLocation": "456 AnotherFake St"
            }
        ]
    }
    ```

***Add Attendance***

Creates attendance relation between given user and event
* URL: /event/attend
* Method: POST
* Post Request:
    ```json
    {
        "event_id": 1,
        "event_attendee": 1
    }
    ```
* Success Response:
    * Status Code: 200
    * No JSON Response

***Get Attending***

Returns JSON Data of all events a user is attending
* URL: /user/events/attend?user_id={id}
* Method: GET
* URL Parameter: {id} = integer value
* Success Response:
    ```json
    {
        "events": [
            {
                "EventID": 1
            },
            {
                "EventID": 5
            }
        ]
    }
    ```

***Get Event Attendees***

Returns JSON Data of all users attending a given event
* URL: /event/attend?event_id={id}
* Method: GET
* URL Parameter: {id} = integer value
* Success Response:
    ```json
    {
        "attendees": [
            {
                "AttendeeID": 1
            },
            {
                "AttendeeID": 5
            }
        ]
    }
    ```