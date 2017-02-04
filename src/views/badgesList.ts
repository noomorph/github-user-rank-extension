import {h} from '../utils/h';
import badge from './badge';

export function badgesList(username: string, languages: any) {
	const languageList = languages.reduce((acc: any[], lang: any) => acc.concat(badge(username, lang)), []);
	return h('div', { className: 'githubuserrank-extension-section' }, [
        h('dl', { className: 'githubuserrank-extension-badges-list' }, languageList),
        h('footer', { className: 'f6 text-gray githubuserrank-extension-section-footer' }, [
            'Based on data from ',
            h('a', { href: 'http://beta.gitlance.net' }, 'GitLance')
        ])
    ]);
}
