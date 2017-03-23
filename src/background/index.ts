import {GUREContentMessage} from "../common/messages.schema";
import {report_bi} from "./utils/bi";
import {fetch_languages_for as tmp_fetch} from "./utils/gitlance";
import memoize = require('lodash/memoize');
import "../external/browser";

const fetch_languages_for = memoize(tmp_fetch);

export default function main(browser: typeof window.browser) {
    browser.runtime.onMessage.addListener(function (message: GUREContentMessage, sender: browser.runtime.MessageSender, sendResponse: (response: any) => void) {
        console.log('got message %O from sender %O', message, sender);

        const tabId = sender && sender.tab && sender.tab.id;
        if (!tabId)  {
            return;
        }

        switch (message.type) {
            case 'FetchGitlanceDataRequest':
                fetch_languages_for(message.data.login).then(data => {
                    browser.tabs.sendMessage(tabId, {
                        thread: message.thread,
                        type: 'FetchGitlanceDataResponse',
                        data
                    });
                });

                break;
            case 'ReportBIRequest':
                break;
        }
    });
}

if (typeof chrome !== "undefined") {
    main(chrome);
} else if (typeof browser !== "undefined") {
    main(browser);
}
