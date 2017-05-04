export function getRanksUrl(login: string): string {
	return `https://api.gitlance.net/v1/profiles?login=${encodeURIComponent(login)}`;
}

export function getTopDevsUrl(language: string): string {
	return `http://gitlance.net/top/${encodeURIComponent(language.toLowerCase())}`;
}

