import test from 'ava';
import fetch from 'node-fetch';
import { GitlanceUserProfile } from '../gitlance.schema';
import { getRanksUrl, getTopDevsUrl } from './gitlance';
import isArray = require('lodash/isArray');

test('gitlance ranks url availability', async (t) => {
    const response = await fetch(getRanksUrl('noomorph'));
	t.true(response.ok, 'should have received OK response');

    const json: GitlanceUserProfile[] = await response.json();
    t.true(isArray(json), 'response should be an array');
    t.true(json.length > 0, 'response should not be empty');
});

test('gitlance top devs url availability', async (t) => {
    const response = await fetch(getTopDevsUrl('javascript'));
	t.true(response.ok, 'should have received OK response');

    const html: string = await response.text();
    t.true(html.length > 100, 'html response should not be empty');
});
