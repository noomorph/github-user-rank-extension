export function fetch_languages_for(login: string): PromiseLike<GitlanceBadgeData[]> {
	return fetch(getRanksUrl(login))
		.then(response => response.json())
		.then(json => validateApiResponse(json))
		.then(profile => !profile ? [] : profile.languages.map(langInfo => ({
			language: langInfo.language.name,
			rank: Number(langInfo.langRank),
			bits: Number(langInfo.gitBits)
		})))
        .then(badges => badges.filter(filterMarkupLanguages));
}

export function getRanksUrl(login: string): string {
	return `https://api.gitlance.net/v1/profiles?login=${encodeURIComponent(login)}`;
}

export function getTopDevsUrl(language: string): string {
	return `http://gitlance.net/top/${encodeURIComponent(language.toLowerCase())}`;
}

function filterMarkupLanguages(badge: GitlanceBadgeData) {
    const language = badge.language.toLowerCase();

    switch (language) {
        case 'html': return false;
        case 'haml': return false;
        case 'jade': return false;
        case 'css': return false;
        case 'less': return false;
        case 'scss': return false;
        default: return true;
    }
}

function validateApiResponse(json: any): PromiseLike<GitlanceUserProfile> | PromiseLike<never> {
	if (!Array.isArray(json)) {
        return Promise.reject('unexpected response from API')
    }

    const profile = json[0] as GitlanceUserProfile || {};
    profile.languages = profile.languages || [];

    return Promise.resolve(profile);
}

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
