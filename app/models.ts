
type speaker = {
    speaker_name: string;
    speaker_bio: string;
    speaker_email: string;
    speaker_phone: string;
    speaker_website: string;
    speaker_twitter: string;
    speaker_facebook: string;
    speaker_linkedin: string;
    speaker_instagram: string;
    speaker_image: string;
}
export type organization = {
    location_name?: string;
    location_email?: string;
    location_phone?: string;
    location_mobile?: string;
    location_fax?: string;
};
export interface IEventResponse {
    event_code: string;
    event_title: string;
    event_description: string;
    event_registration_url: string;
    event_areas: string[];
    event_speakers: speaker[];
    event_notes: string;
    event_organization: organization;
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