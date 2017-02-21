import {badgesList} from '../views/badgesList';
import {fetch_languages_for as tmp_fetch} from '../utils/gitlance';
import {get_user_profile_login} from '../utils/github';
import {render} from '../utils/h';
import {report_bi, BiEvents} from '../utils/bi';
import memoize = require('lodash/memoize');

const fetch_languages_for = memoize(tmp_fetch);

export default function route_user_profile() {
	const login = get_user_profile_login();

	if (!login) {
		return report_bi(BiEvents.LOGIN_NOT_FOUND);
	}

	const placeholder = find_placeholder_for_user_profile_info();

	if (!placeholder) {
		return report_bi(BiEvents.PLACEHOLDER_NOT_FOUND);
	}

	fetch_languages_for(login).then(languages => {
		const badges = render(badgesList(login, languages));
		placeholder.insertBefore(badges, placeholder.children[0])
	});
}

function find_placeholder_for_user_profile_info() {
	const profileRoot = document.querySelector('[itemtype="http://schema.org/Person"]');
    return profileRoot && profileRoot.querySelector('.user-profile-following-container');
}
