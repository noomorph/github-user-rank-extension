import * as gitlance from '../../common/gitlance.schema';
import * as messages from '../../common/messages.schema';

type Browser = typeof window.browser;
type QueueItem = {
    resolve: (response: messages.GUREBackgroundMessage) => void;
    reject: (reason: any) => void;
};

export default function init(browser: Browser) {
    const queue = new Map<number, QueueItem>();

    browser.runtime.onMessage.addListener(function (message: messages.GUREBackgroundMessage, sender: browser.runtime.MessageSender, sendResponse: (response: any) => void) {
        const item = queue.get(message.thread);

        if (item) {
            item.resolve(message);
        }

        console.log('got message %O from sender %O', message, sender);
    });

    function sendRequest(request: messages.GUREContentMessage): PromiseLike<messages.GUREBackgroundMessage> {
        return new Promise((resolve, reject) => {
            queue.set(request.thread, { resolve, reject });
            browser.runtime.sendMessage(request);
        });
    }

    function fetch_languages_for(login: string): PromiseLike<gitlance.GitlanceBadgeData[]> {
        const request: messages.FetchGitlanceDataRequest = {
            thread: Math.random(),
            type: 'FetchGitlanceDataRequest',
            data: { login }
        };

        return sendRequest(request).then((response: messages.FetchGitlanceDataResponse) => {
            return response.data;
        });
    }

    function report_bi(eventCode: number): PromiseLike<any> {
        const request: messages.ReportBIRequest = {
            thread: Math.random(),
            type: 'ReportBIRequest',
            data: { eventCode }
        };

        return sendRequest(request);
    }

    return {
        fetch_languages_for,
        report_bi,
    };
}
