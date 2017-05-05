import {
	GUREContentMessage, FetchGitlanceDataRequest, FetchGitlanceDataResponse,
	GUREBackgroundMessage
} from '../common/messages.schema';

import {fetch_profiles_for, transformIntoBadges} from './utils/gitlance';

export function handleGitlanceDataRequest(request: FetchGitlanceDataRequest, sendMessage: (response: FetchGitlanceDataResponse) => void) {
	fetch_profiles_for(request.data.login).then(profiles => {
		sendMessage({
			thread: request.thread,
			type: 'FetchGitlanceDataResponse',
			data: transformIntoBadges(profiles)
		});
	});
}

export function handleMessage(this: typeof window.browser, message: GUREContentMessage, sender: browser.runtime.MessageSender /*, sendResponse: (response: any) => void */) {
	const browser = this;
	const tabId = sender && sender.tab && sender.tab.id;

	if (!tabId)  {
		return;
	}

	const sendMessage = (response: GUREBackgroundMessage) => {
		browser.tabs.sendMessage(tabId, response);
	};

	switch (message.type) {
		case 'FetchGitlanceDataRequest':
			handleGitlanceDataRequest(message, sendMessage);
			break;
		case 'ReportBIRequest':
			break;
	}
}

export function init(browser: typeof window.browser) {
	browser.runtime.onMessage.addListener(handleMessage.bind(browser));
}
