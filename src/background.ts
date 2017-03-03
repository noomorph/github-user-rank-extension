import "./external/browser";

browser.runtime.onMessage.addListener(function (message: any, sender: browser.runtime.MessageSender, sendResponse: (response: any) => void) {

});

console.log('browser', browser);
debugger;
