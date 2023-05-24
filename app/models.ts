export interface IEventResponse {
    event_code: string;
    event_title: string;
    event_description: string;
    event_registration_url: string;
}

export interface IRegistrationRequest {
    event_code: string;
    attendee_firstname: string;
    attendee_lastname: string;
    attendee_email: string;
}


export interface IRegistrationResponse {
    event_registration_id: string;
    event_code: string;
    event_registration_date: string;
    attendee_firstname: string;
    attendee_lastname: string;
    attendee_email: string;
}