// =================================================================================
// Award Specific Data Structures
// =================================================================================

/**
 * Interface representing a recipient of an award.
 * An award can be conferred upon a team or specific individuals associated with a team.
 */
export interface AwardRecipient {
    /** Name of the individual awardee (e.g., a student, mentor), if applicable. Null if the award is to the team as a whole without a named individual. */
    awardee: string | null;
    /** The TBA team key (e.g., "frc254") of the team receiving the award. */
    team_key: string;
}

/**
 * Interface representing an award won by a team at a specific event.
 */
export interface TeamAward {
    /** The type of award, represented by a numerical code used by TBA. (e.g., 0 for Chairman's) */
    award_type: number;
    /** The TBA event key (e.g., "2023casj") where the award was won. */
    event_key: string;
    /** The official name of the award (e.g., "Chairman's Award"). */
    name: string;
    /** A list of recipients for this award instance. */
    recipient_list: AwardRecipient[];
    /** The year the award was won. */
    year: number;
}

// =================================================================================
// Core Team Data Structure
// =================================================================================

/**
 * Basic fields for a team object from The Blue Alliance API.
 * Properties generally follow the snake_case convention of the TBA API.
 * For a complete list of fields and their descriptions, refer to the TBA API documentation:
 * https://www.thebluealliance.com/apidocs/v3 (see Team model)
 */
export interface TbaTeam {
    /** The unique TBA key for the team (e.g., "frc254"). */
    key: string;
    /** The official FRC team number (e.g., 254). */
    team_number: number;
    /** The team's nickname (e.g., "The Cheesy Poofs"). Optional. */
    nickname?: string;
    /** The official long name of the team (e.g., "NASA Ames Research Center / Bellarmine College Preparatory"). */
    name: string;
    /** The name of the school affiliated with the team. Optional. */
    school_name?: string;
    /** The city where the team is based. Optional. */
    city?: string;
    /** The state or province where the team is based. Optional. */
    state_prov?: string;
    /** The country where the team is based. Optional. */
    country?: string;
    /** The team's street address. Optional. */
    address?: string;
    /** The team's postal code. Optional. */
    postal_code?: string;
    /** Google Maps Place ID for the team's location. Optional. */
    gmaps_place_id?: string;
    /** URL to the team's location on Google Maps. Optional. */
    gmaps_url?: string;
    /** Latitude of the team's location. Optional. */
    lat?: number;
    /** Longitude of the team's location. Optional. */
    lng?: number;
    /** Name of the team's primary location. Optional. */
    location_name?: string;
    /** URL of the team's website. Optional. */
    website?: string;
    /** The year the team first competed (rookie year). Optional. */
    rookie_year?: number;
    // Note: The TBA Team model has more fields (e.g., motto, various social media links).
    // This interface can be expanded as needed.
}

// =================================================================================
// API Error Response Structure
// =================================================================================
