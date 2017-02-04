import {h} from '../utils/h';
import {getTopDevsUrl, getRanksUrl} from '../utils/gitlance';
import languageColors from '../language-colors-light';
import mapKeys = require('lodash/mapKeys');
import range = require('lodash/range');

export default function badge(username: string, { language, rank, bits }: { language: string, rank: number, bits: number }) {
	return [
		h('dt', { className: classForLanguage(language) }, [
            h('span', {
                className: 'repo-language-color pinned-repo-meta',
                style: `background-color:${colorForLanguage(language)}`
            }),
            '  ' + language
        ]),
		h('dd', { className: 'githubuserrank-extension-badge-language-rank' }, rank_url(username, language, rank, bits)),
		h('br')
	];
}

function rank_url(username: string, language: string, rank: number, bits: number) {
	return h('a', { href: getRanksUrl(username), title: explain(language, rank, bits) }, bitify(bits));
}

function classForLanguage(language: string): string {
	return 'mb-0 f6 text-gray githubuserrank-extension-badge-language-name';
}

function colorForLanguage(language: string): string {
    return languageColors[language.toLowerCase()] || '#ccc';
}

function bitify(bits: number) {
	if (!isFinite(bits)) {
		return 'N/A';
	}

	if (bits < 0) {
		return 'N/A';
	}

	if (bits > 8) {
		return 'N/A';
	}

    return [
        ...range(bits).map(bit1),
        ...range(8 - bits).map(bit0)
    ];
}

function bit0() {
    return make_bit(false);
}

function bit1() {
    return make_bit(true);
}

function make_bit(enabled: boolean) {
    return h('span', {
        className: 'githubuserrank-extension-bit ' + (enabled ? 'is-true' : 'is-false')
    });
}

function explain(lang: string, rank: number, bits: number) {
	switch (bits) {
		case 0: return `(${rank}) Has projects in ${lang}`;
		case 1: return `(${rank}) Top 70% of ${lang} developers`;
		case 2: return `(${rank}) Top 30% of ${lang} developers`;
		case 3: return `(${rank}) Top 15% of ${lang} developers`;
		case 4: return `(${rank}) Top 7% of ${lang} developers`;
		case 5: return `(${rank}) Top 2.5% of ${lang} developers`;
		case 6: return `(${rank}) Top 1% of ${lang} developers`;
		case 7: return `(${rank}) Top 0.1% of ${lang} developers`;
		case 8: return `(${rank}) Top 0.025% of ${lang} developers`;
		default: return '';
	}
}
