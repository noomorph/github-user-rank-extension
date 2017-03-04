import {Router} from './Router';
import {get_meta_location} from '../utils/github';
import user_profile from './user_profile';
import repo_contributors from './repo_contributors';
import not_found from './not_found';

export default new Router({
    get_location: get_meta_location,
    routes: {
        user_profile,
        repo_contributors,
        not_found
    }
});
