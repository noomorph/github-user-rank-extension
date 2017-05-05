import test, {AssertContext, Macro} from 'ava';
import { transformIntoBadges } from './gitlance';
import {GitlanceBadgeData, GitlanceLanguageProfile, GitlanceUserProfile} from '../../common/gitlance.schema';

const macroForTransformIntoBadges: Macro<AssertContext> = (t, input: GitlanceUserProfile[], expected: GitlanceBadgeData[]) => {
	t.deepEqual(transformIntoBadges(input), expected);
};

macroForTransformIntoBadges.title = (provided: string, input: GitlanceUserProfile[], expected: GitlanceBadgeData[]) => {
	const to = expected.map(badge => badge.language[0] + badge.bits).join(',');
	const fromInner = (profile: GitlanceUserProfile) => profile.languages.map(l => l.language.name[0] + l.gitBits).join(',');
	const from = input.map(profile => `[${fromInner(profile)}]`).join(', ');

	return `${provided}: [${from}] -> [${to}]`;
};

const testCase = (title: string, input: GitlanceUserProfile[], expected: GitlanceBadgeData[]) =>
	test(title, macroForTransformIntoBadges, input, expected);

const l1_weaker: GitlanceLanguageProfile = {
	language: { name: 'JavaScript'},
	langRank: 1000,
	gitBits: 5
};

const l1_stronger: GitlanceLanguageProfile = {
	language: { name: 'JavaScript'},
	langRank: 500,
	gitBits: 5
};

const l2_weakest: GitlanceLanguageProfile = {
	language: { name: 'Ruby'},
	langRank: 10000,
	gitBits: 1
};

const l2_strongest: GitlanceLanguageProfile = {
	language: { name: 'Ruby'},
	langRank: 10,
	gitBits: 8
};

const badge = (p: GitlanceLanguageProfile): GitlanceBadgeData => ({
	language: p.language.name,
	rank: p.langRank,
	bits: p.gitBits
});

testCase('no profiles', [], []);
testCase('empty profile', [{ languages: [] }], []);
testCase('two empty profiles', [{ languages: [] }, { languages: [] }], []);
testCase('one language in a profile', [{ languages: [l1_stronger] }], [badge(l1_stronger)]);
testCase('two languages in a profile', [{ languages: [l1_stronger, l2_weakest] }], [badge(l1_stronger), badge(l2_weakest)]);
testCase('two profiles with single language', [{ languages: [l1_stronger] }, { languages: [l2_weakest] }], [badge(l1_stronger), badge(l2_weakest)]);

testCase('merge two profiles with same languages', [
	{ languages: [l1_stronger, l2_weakest] },
	{ languages: [l1_weaker, l2_strongest] }
], [
	badge(l2_strongest),
	badge(l1_stronger)
]);

testCase('pick, sort and uniq best languages', [
	{ languages: [l2_weakest, l1_stronger, l1_weaker, l2_weakest, l1_stronger, l2_strongest] },
], [
	badge(l2_strongest),
	badge(l1_stronger)
]);
