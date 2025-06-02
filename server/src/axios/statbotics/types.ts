// =================================================================================
// Core Reusable Data Structures
// =================================================================================

import ApiResponseError from '../../errors/ApiResponseError';

/**
 * Interface for a team's performance record (wins, losses, ties).
 * This is used in both overall team statistics and year-specific data.
 */
export interface TeamPerformanceRecord {
    wins: number;
    losses: number;
    ties: number;
    count: number; // Total matches played
    winrate: number;
}

/**
 * Interface for the team's normalized EPA (Expected Points Added) statistics.
 */
export interface TeamNormEpa {
    current: number; // Current EPA
    recent: number; // EPA based on recent performance
    mean: number; // Mean EPA over a period
    max: number; // Maximum EPA achieved
}

// =================================================================================
// EPA (Expected Points Added) Specific Data Structures
// Grouped from fundamental details to composite structures.
// =================================================================================

/**
 * Interface for EPA total points statistics, including mean and standard deviation.
 */
export interface EpaTotalPoints {
    mean: number;
    sd: number; // Standard Deviation
}

/**
 * Interface for detailed ranking information within a specific category (e.g., total, country).
 */
export interface EpaRankDetail {
    rank: number;
    percentile: number;
    team_count: number; // Number of teams in this ranking category
}

/**
 * Interface for EPA rankings across different scopes (total, country, state, district).
 */
export interface EpaRanks {
    total: EpaRankDetail;
    country: EpaRankDetail;
    state: EpaRankDetail | null; // State rank might not be applicable for all teams
    district: EpaRankDetail | null; // District rank might not be applicable for all teams
}

/**
 * Interface for various EPA statistics like start, pre-championships, and maximum values.
 */
export interface EpaStats {
    start: number; // EPA at the start of the season/period
    pre_champs: number; // EPA before championship events
    max: number; // Maximum EPA observed
}

/**
 * Interface for the team's detailed EPA breakdown statistics.
 * The fields are often specific to an FRC game season (e.g., "Coral", "Algae", "Barge"
 * suggest elements from a game like Rapid React).
 */
export interface EpaBreakdown {
    total_points: number;
    auto_points: number;
    teleop_points: number;
    endgame_points: number;

    // Ranking Points (RP) related
    auto_rp: number;
    coral_rp?: number; // Optional: Specific to a game element like "Coral"
    barge_rp?: number; // Optional: Specific to a game element like "Barge"
    rp_1: number; // Generic Ranking Point 1
    rp_2: number; // Generic Ranking Point 2
    rp_3?: number; // Generic Ranking Point 3 (some games have 2, some 3+)

    // Game-specific scoring details
    tiebreaker_points: number;
    auto_leave_points: number;

    // Example: "Coral" related scoring (game-specific)
    auto_coral?: number;
    auto_coral_points?: number;
    teleop_coral?: number;
    teleop_coral_points?: number;
    coral_l1?: number; // Level 1
    coral_l2?: number; // Level 2
    coral_l3?: number; // Level 3
    coral_l4?: number; // Level 4
    total_coral_points?: number;

    // Example: "Algae" or "Processor" related scoring (game-specific)
    processor_algae?: number;
    processor_algae_points?: number;
    net_algae?: number;
    net_algae_points?: number;
    total_algae_points?: number;

    total_game_pieces: number;
    barge_points?: number; // Optional: Specific to a game element like "Barge"
}

/**
 * Interface representing the comprehensive EPA data for a team in a given year.
 */
export interface EpaData {
    total_points: EpaTotalPoints; // Overall EPA point stats
    unitless: number; // A unitless EPA measure
    norm: number; // Normalized EPA
    conf: number[]; // Confidence interval bounds, e.g., [lower, upper]
    breakdown: EpaBreakdown; // Detailed game-specific breakdown
    stats: EpaStats; // Other EPA statistics (start, pre-champs, max)
    ranks: EpaRanks; // EPA rankings
}

/**
 * Interface representing the team's competition status.
 */
export interface CompetingStatus {
    this_week: boolean; // Is the team competing this week?
    next_event_key: string | null; // Key of the next event, if any
    next_event_name: string | null; // Name of the next event, if any
    next_event_week: number | null; // Competition week of the next event
}

// =================================================================================
// Main Data Entities (Overall Team and Year-Specific Team Data)
// =================================================================================

/**
 * Interface representing the overall Statbotics data for a team.
 */
export interface StatboticsTeam {
    team: number; // Team number
    name: string; // Team name
    country: string;
    state: string | null; // State/Province, null if not applicable
    district: string | null; // FRC District, null if not applicable or not in a district
    rookie_year: number;
    active: boolean; // Is the team currently active?
    record: TeamPerformanceRecord; // Overall team performance record
    norm_epa: TeamNormEpa; // Normalized EPA statistics
}

/**
 * Interface representing Statbotics data for a specific team in a specific year.
 */
export interface TeamYearStatbotics {
    team: number;
    year: number;
    name: string;
    country: string;
    state: string | null;
    district: string | null;
    rookie_year: number; // Team's rookie year (can be useful for context)
    epa: EpaData; // EPA data for that year
    record: TeamPerformanceRecord; // Team's performance record for that year
    district_points: number | null; // Points in district play, if applicable
    district_rank: number | null; // Rank in district play, if applicable
    competing: CompetingStatus; // Current competition status for that year
}

/**
 * Interface for the result of fetching multiple years of team data.
 */
export interface FetchTeamYearsResult {
    years: TeamYearStatbotics[];
    errors: ApiResponseError[]; // Array of errors, if any occurred during partial fetches
}

/**
 * Interface for representing a team's country rank for a specific year.
 */
export interface CountryRankInfo {
    year: number;
    countryRank: number | null; // Rank within the country, null if not available
}

/**
 * Interface for the result of fetching country rank information for multiple years.
 */
export interface FetchCountryRanksResult {
    years: CountryRankInfo[];
    errors: ApiResponseError[]; // Array of errors, mirroring those from FetchTeamYearsResult if applicable
}

export interface WorldRankInfo {
    year: number;
    worldRank: number | null;
}

export interface FetchWorldRanksResult {
    years: WorldRankInfo[];
    errors: ApiResponseError[];
}
