import {GitlanceBadgeData, GitlanceLanguageProfile, GitlanceUserProfile} from '../../common/gitlance.schema';
import {getRanksUrl} from '../../common/utils/gitlance';

export function fetch_languages_for(login: string): PromiseLike<GitlanceBadgeData[]> {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('GET', getRanksUrl(login), true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                const json = JSON.parse(request.responseText);
                if (!Array.isArray(json)) {
                    return reject('unexpected response from API')
                }

                const languages = collectAllProfilesLanguages(json);
                const badges = languages.map(langInfo => ({
                    language: langInfo.language.name,
                    rank: Number(langInfo.langRank),
                    bits: Number(langInfo.gitBits)
                }));

                resolve(badges.filter(filterMarkupLanguages));
            } else {
                reject(request);
            }
        };

        request.onerror = () => reject(request);
        request.send();
    });
}

function filterMarkupLanguages(badge: GitlanceBadgeData) {
    const language = badge.language.toLowerCase();

    switch (language) {
        case 'html': return false;
        case 'haml': return false;
        case 'jade': return false;
        case 'stylus': return false;
        case 'css': return false;
        case 'less': return false;
        case 'scss': return false;
        default: return true;
    }
}

function collectAllProfilesLanguages(json: GitlanceUserProfile[]): GitlanceLanguageProfile[] {
    return json.reduce((p1, p2) => {
        const langs1 = p1 && p1.languages || [];
        const langs2 = p2 && p2.languages || [];

        return {
            languages: [...langs1, ...langs2]
        };
    }).languages;
}
