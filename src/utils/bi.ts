export enum BiEvents {
	LOGIN_NOT_FOUND = 1,
	PLACEHOLDER_NOT_FOUND = 2
}

export function report_bi(eventCode: number) {
	console.log('BI not implemented', eventCode);
}

