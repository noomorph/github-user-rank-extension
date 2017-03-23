import {get_meta_content} from './dom';

export function get_meta_location() {
	return get_meta_content('analytics-location');
}

export function get_user_profile_login() {
	return get_meta_content('octolytics-dimension-user_login');
}
