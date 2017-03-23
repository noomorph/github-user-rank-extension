import {Router} from './Router';
import {get_meta_location} from '../utils/github';
import user_profile from './user_profile';
import repo_contributors from './repo_contributors';
import not_found from './not_found';

function get_browser() {
    if (typeof browser !== 'undefined') {
        return browser;
    }

    if (typeof chrome !== 'undefined') {
        return chrome;
    }

    throw new Error('requires WebExtensions API');
}

export default new Router({
    get_location: get_meta_location,
    routes: {
        user_profile: () => user_profile(get_browser()),
        repo_contributors,
        not_found
    }
});
