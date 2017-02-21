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

    const anchor = find_anchor_for_user_profile_info();

    if (!anchor) {
        return report_bi(BiEvents.PLACEHOLDER_NOT_FOUND);
    }

    fetch_languages_for(login).then(languages => {
        const badges = render(badgesList(login, languages));
        const parent = anchor.parentElement;
        parent && parent.insertBefore(badges, anchor);
    });
}

function find_anchor_for_user_profile_info() {
    const profileRoot = document.querySelector('[itemtype="http://schema.org/Person"]');
    const h1 = profileRoot && profileRoot.querySelector('h1.vcard-names');

    const candidate3 = h1 && h1.parentElement;
    const candidate2 = candidate3 && candidate3.nextElementSibling;
    const candidate1 = candidate2 && candidate2.nextElementSibling;

    return candidate1 || candidate2 || candidate3;
}
