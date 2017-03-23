import {badgesList} from '../views/badgesList';
import init_rpc from '../utils/rpc';
import {get_user_profile_login} from '../utils/github';
import {render} from '../utils/h';
import {BiEvents} from '../../common/bi.schema';

export default function route_user_profile(browser: typeof window.browser) {
    const rpc = init_rpc(browser);
    const login = get_user_profile_login();

    if (!login) {
        return rpc.report_bi(BiEvents.LOGIN_NOT_FOUND);
    }

    const anchor = find_anchor_for_user_profile_info();

    if (!anchor) {
        return rpc.report_bi(BiEvents.PLACEHOLDER_NOT_FOUND);
    }

    if (is_there_a_previously_inserted_section()) {
        return;
    }

    rpc.fetch_languages_for(login).then(languages => {
        const badges = render(badgesList(login, languages));
        const parent = anchor.parentElement;
        parent && parent.insertBefore(badges, anchor);
    });
}

function is_there_a_previously_inserted_section() {
    return document.getElementsByClassName('githubuserrank-extension-section').length > 0;
}

function find_anchor_for_user_profile_info() {
    const profileRoot = document.querySelector('[itemtype="http://schema.org/Person"]');
    const h1 = profileRoot && profileRoot.querySelector('h1.vcard-names');

    const candidate3 = h1 && h1.parentElement;
    const candidate2 = candidate3 && candidate3.nextElementSibling;
    const candidate1 = candidate2 && candidate2.nextElementSibling;

    return candidate1 || candidate2 || candidate3;
}
