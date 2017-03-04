import "./external/browser";

export default function main(browser: typeof window.browser) {
    browser.runtime.onMessage.addListener(function (message: any, sender: browser.runtime.MessageSender, sendResponse: (response: any) => void) {

    });

    console.log('browser', browser);
}

if (typeof browser !== "undefined") {
    main(browser);
}
