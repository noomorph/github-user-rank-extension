import route_user_profile from './user_profile';
import route_repo_contributors from './repo_contributors';
import {get_meta_location} from '../utils/github';

export function router() {
	const location = get_meta_location();

	switch (location) {
		case '/<user-name>': return route_user_profile();
		case '/<user-name>/<repo-name>/graphs/contributors': return route_repo_contributors();
	}
}
