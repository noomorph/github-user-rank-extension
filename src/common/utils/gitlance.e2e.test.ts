import test from 'ava';
import fetch from 'node-fetch';
import { GitlanceUserProfile } from '../gitlance.schema';
import { getRanksUrl, getTopDevsUrl } from './gitlance';
import { isArray } from 'lodash';

test('gitlance ranks url availability', async (t) => {
    const response = await fetch(getRanksUrl('noomorph'));
	t.true(response.ok, 'should have received OK response');

    const json: GitlanceUserProfile[] = await response.json();
    t.true(isArray(json), 'response should be an array');
    t.true(json.length > 0, 'response should not be empty');
});

test('gitlance ranks url should encode special chars', async (t) => {
	const login = 'Akira Matsuda';
	const url = getRanksUrl(login);

	t.is(url.indexOf(login), -1, 'should not leave argument as is');
	t.not(url.indexOf(login.replace(/\s/g, '%20')), -1, 'should encode whitespaces');
});

test('gitlance top devs url availability', async (t) => {
    const response = await fetch(getTopDevsUrl('javascript'));
	t.true(response.ok, 'should have received OK response');

    const html: string = await response.text();
    t.true(html.length > 100, 'html response should not be empty');
});

test('gitlance top devs url should convert language to lower case and encode', (t) => {
	const language = 'Ruby on Rails'; // NOTE: don't nag, it's just a test :)
	const url = getTopDevsUrl(language);

	t.is(url.indexOf(language), -1, 'should not leave argument as is');
	t.not(url.indexOf(language.toLowerCase().replace(/\s/g, '%20')), -1, 'should encode whitespaces and make lower case');
});
