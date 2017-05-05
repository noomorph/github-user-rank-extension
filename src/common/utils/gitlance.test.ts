import test from 'ava';
import { getRanksUrl, getTopDevsUrl } from './gitlance';

test('gitlance ranks url should encode special chars', (t) => {
	const login = 'Akira Matsuda';
	const url = getRanksUrl(login);

	t.is(url.indexOf(login), -1, 'should not leave argument as is');
	t.not(url.indexOf(login.replace(/\s/g, '%20')), -1, 'should encode whitespaces');
});

test('gitlance top devs url should convert language to lower case and encode', (t) => {
	const language = 'Ruby on Rails'; // NOTE: don't nag, it's just a test :)
	const url = getTopDevsUrl(language);

	t.is(url.indexOf(language), -1, 'should not leave argument as is');
	t.not(url.indexOf(language.toLowerCase().replace(/\s/g, '%20')), -1, 'should encode whitespaces and make lower case');
});
