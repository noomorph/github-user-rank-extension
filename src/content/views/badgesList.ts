import {h} from '../utils/h';
import {GitlanceBadgeData} from '../../common/gitlance.schema';
import badge from './badge';

function credits(found: boolean) {
    return [
        found ? 'Based on data from' : 'No data has been found on',
        ' ', h('a', { href: 'http://beta.gitlance.net' }, 'GitLance')
    ];
}

export function badgesList(username: string, languages: GitlanceBadgeData[]) {
	const badgesElements = languages.reduce((acc: any[], lang: any) => acc.concat(badge(username, lang)), []);
    const badgesListElement = h('dl', { className: 'githubuserrank-extension-badges-list' }, badgesElements);
    const footerElement = h('footer', {
        className: 'f6 text-gray githubuserrank-extension-section-footer'
    }, credits(languages.length > 0))

	return h('div', { className: 'githubuserrank-extension-section' }, [
        badgesListElement,
        footerElement
    ]);
}
