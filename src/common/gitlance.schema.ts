export interface GitlanceBadgeData {
    language: string;
    rank: number;
    bits: number;
}

export interface GitlanceUserProfile {
	languages: GitlanceLanguageProfile[];
}

export interface GitlanceLanguageProfile {
	language: {
		name: string;
	}
	langRank: number;
	gitBits: number;
}
