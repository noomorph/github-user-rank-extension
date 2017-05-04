// Type definitions for WebExtensions
// Project: https://developer.mozilla.org/en-US/Add-ons/WebExtensions
// Definitions by: Yaroslav Serhieiev <https://github.com/noomorph>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

////////////////////
// Global object
////////////////////
interface Window {
    browser: typeof browser;
}

declare var chrome: typeof browser;

////////////////////
// Commands
////////////////////
declare namespace browser.commands {
    interface Command {
        /** Optional. The name of the Extension Command  */
        name?: string;
        /** Optional. The Extension Command description  */
        description?: string;
        /** Optional. The shortcut active for this command, or blank if not active.  */
        shortcut?: string;
    }

    interface CommandEvent extends browser.events.Event<(command: string) => void> {}

    /**
     * Returns all the registered extension commands for this extension and their shortcut (if active).
     * @param callback Called to return the registered commands.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function(array of Command commands) {...};
     */
    export function getAll(callback: (commands: Command[]) => void): void;

    /** Fired when a registered command is activated using a keyboard shortcut. */
    var onCommand: CommandEvent;
}

////////////////////
// Extension
////////////////////
declare namespace browser.extension {
    interface FetchProperties {
        /** Optional. The window to restrict the search to. If omitted, returns all views.  */
        windowId?: number;
        /** Optional. The type of view to get. If omitted, returns all views (including background pages and tabs). Valid values: 'tab', 'notification', 'popup'.  */
        type?: string;
    }

    interface LastError {
        /** Description of the error that has taken place. */
        message: string;
    }

    interface OnRequestEvent extends browser.events.Event<((request: any, sender: runtime.MessageSender, sendResponse: (response: any) => void) => void) | ((sender: runtime.MessageSender, sendResponse: (response: any) => void) => void)> {}

    /**
     * Since Chrome 7.
     * True for content scripts running inside incognito tabs, and for extension pages running inside an incognito process. The latter only applies to extensions with 'split' incognito_behavior.
     */
    var inIncognitoContext: boolean;
    /** Set for the lifetime of a callback if an ansychronous extension api has resulted in an error. If no error has occured lastError will be undefined. */
    var lastError: LastError;

    /** Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no background page. */
    export function getBackgroundPage(): Window | null;
    /**
     * Converts a relative path within an extension install directory to a fully-qualified URL.
     * @param path A path to a resource within an extension expressed relative to its install directory.
     */
    export function getURL(path: string): string;
    /**
     * Sets the value of the ap CGI parameter used in the extension's update URL. This value is ignored for extensions that are hosted in the Chrome Extension Gallery.
     * Since Chrome 9.
     */
    export function setUpdateUrlData(data: string): void;
    /** Returns an array of the JavaScript 'window' objects for each of the pages running inside the current extension. */
    export function getViews(fetchProperties?: FetchProperties): Window[];
    /**
     * Retrieves the state of the extension's access to the 'file://' scheme (as determined by the user-controlled 'Allow access to File URLs' checkbox.
     * Since Chrome 12.
     * @param callback The callback parameter should be a function that looks like this:
     * function(boolean isAllowedAccess) {...};
     * Parameter isAllowedAccess: True if the extension can access the 'file://' scheme, false otherwise.
     */
    export function isAllowedFileSchemeAccess(callback: (isAllowedAccess: boolean) => void): void;
    /**
     * Retrieves the state of the extension's access to Incognito-mode (as determined by the user-controlled 'Allowed in Incognito' checkbox.
     * Since Chrome 12.
     * @param callback The callback parameter should be a function that looks like this:
     * function(boolean isAllowedAccess) {...};
     * Parameter isAllowedAccess: True if the extension has access to Incognito mode, false otherwise.
     */
    export function isAllowedIncognitoAccess(callback: (isAllowedAccess: boolean) => void): void;
    /**
     * Sends a single request to other listeners within the extension. Similar to runtime.connect, but only sends a single request with an optional response. The extension.onRequest event is fired in each page of the extension.
     * @deprecated Deprecated since Chrome 33. Please use runtime.sendMessage.
     * @param extensionId The extension ID of the extension you want to connect to. If omitted, default is your own extension.
     * @param responseCallback If you specify the responseCallback parameter, it should be a function that looks like this:
     * function(any response) {...};
     * Parameter response: The JSON response object sent by the handler of the request. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendRequest(extensionId: string, request: any, responseCallback?: (response: any) => void): void;
    /**
     * Sends a single request to other listeners within the extension. Similar to runtime.connect, but only sends a single request with an optional response. The extension.onRequest event is fired in each page of the extension.
     * @deprecated Deprecated since Chrome 33. Please use runtime.sendMessage.
     * @param responseCallback If you specify the responseCallback parameter, it should be a function that looks like this:
     * function(any response) {...};
     * Parameter response: The JSON response object sent by the handler of the request. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendRequest(request: any, responseCallback?: (response: any) => void): void;
    /**
     * Returns an array of the JavaScript 'window' objects for each of the tabs running inside the current extension. If windowId is specified, returns only the 'window' objects of tabs attached to the specified window.
     * @deprecated Deprecated since Chrome 33. Please use extension.getViews {type: "tab"}.
     */
    export function getExtensionTabs(windowId?: number): Window[];

    /**
     * Fired when a request is sent from either an extension process or a content script.
     * @deprecated Deprecated since Chrome 33. Please use runtime.onMessage.
     */
    var onRequest: OnRequestEvent;
    /**
     * Fired when a request is sent from another extension.
     * @deprecated Deprecated since Chrome 33. Please use runtime.onMessageExternal.
     */
    var onRequestExternal: OnRequestEvent;
}

declare namespace browser.extensionTypes {
    var ImageFormat: {
        JPEG: string;
        PNG: string;
    };
    var RunAt: {
        DOCUMENT_START: string;
        DOCUMENT_END: string;
        DOCUMENT_IDLE: string;
    };
}

declare namespace browser.events {
	/** Filters URLs for various criteria. See event filtering. All criteria are case sensitive. */
	interface UrlFilter {
		/** Optional. Matches if the scheme of the URL is equal to any of the schemes specified in the array.  */
		schemes?: string[];
		/**
		 * Optional.
		 * Since Chrome 23.
		 * Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.
		 */
		urlMatches?: string;
		/** Optional. Matches if the path segment of the URL contains a specified string.  */
		pathContains?: string;
		/** Optional. Matches if the host name of the URL ends with a specified string.  */
		hostSuffix?: string;
		/** Optional. Matches if the host name of the URL starts with a specified string.  */
		hostPrefix?: string;
		/** Optional. Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.  */
		hostContains?: string;
		/** Optional. Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.  */
		urlContains?: string;
		/** Optional. Matches if the query segment of the URL ends with a specified string.  */
		querySuffix?: string;
		/** Optional. Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.  */
		urlPrefix?: string;
		/** Optional. Matches if the host name of the URL is equal to a specified string.  */
		hostEquals?: string;
		/** Optional. Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.  */
		urlEquals?: string;
		/** Optional. Matches if the query segment of the URL contains a specified string.  */
		queryContains?: string;
		/** Optional. Matches if the path segment of the URL starts with a specified string.  */
		pathPrefix?: string;
		/** Optional. Matches if the path segment of the URL is equal to a specified string.  */
		pathEquals?: string;
		/** Optional. Matches if the path segment of the URL ends with a specified string.  */
		pathSuffix?: string;
		/** Optional. Matches if the query segment of the URL is equal to a specified string.  */
		queryEquals?: string;
		/** Optional. Matches if the query segment of the URL starts with a specified string.  */
		queryPrefix?: string;
		/** Optional. Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.  */
		urlSuffix?: string;
		/** Optional. Matches if the port of the URL is contained in any of the specified port lists. For example [80, 443, [1000, 1200]] matches all requests on port 80, 443 and in the range 1000-1200.  */
		ports?: any[];
		/**
		 * Optional.
		 * Since Chrome 28.
		 * Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.
		 */
		originAndPathMatches?: string;
	}

	/** An object which allows the addition and removal of listeners for a Chrome event. */
	interface Event<T extends Function> {
		/**
		 * Registers an event listener callback to an event.
		 * @param callback Called when an event occurs. The parameters of this function depend on the type of event.
		 * The callback parameter should be a function that looks like this:
		 * function() {...};
		 */
		addListener(callback: T): void;
		/**
		 * Returns currently registered rules.
		 * @param callback Called with registered rules.
		 * The callback parameter should be a function that looks like this:
		 * function(array of Rule rules) {...};
		 * Parameter rules: Rules that were registered, the optional parameters are filled with values.
		 */
		getRules(callback: (rules: Rule[]) => void): void;
		/**
		 * Returns currently registered rules.
		 * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are returned.
		 * @param callback Called with registered rules.
		 * The callback parameter should be a function that looks like this:
		 * function(array of Rule rules) {...};
		 * Parameter rules: Rules that were registered, the optional parameters are filled with values.
		 */
		getRules(ruleIdentifiers: string[], callback: (rules: Rule[]) => void): void;
		/**
		 * @param callback Listener whose registration status shall be tested.
		 */
		hasListener(callback: T): boolean;
		/**
		 * Unregisters currently registered rules.
		 * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are unregistered.
		 * @param callback Called when rules were unregistered.
		 * If you specify the callback parameter, it should be a function that looks like this:
		 * function() {...};
		 */
		removeRules(ruleIdentifiers?: string[], callback?: () => void): void;
		/**
		 * Unregisters currently registered rules.
		 * @param callback Called when rules were unregistered.
		 * If you specify the callback parameter, it should be a function that looks like this:
		 * function() {...};
		 */
		removeRules(callback?: () => void): void;
		/**
		 * Registers rules to handle events.
		 * @param rules Rules to be registered. These do not replace previously registered rules.
		 * @param callback Called with registered rules.
		 * If you specify the callback parameter, it should be a function that looks like this:
		 * function(array of Rule rules) {...};
		 * Parameter rules: Rules that were registered, the optional parameters are filled with values.
		 */
		addRules(rules: Rule[], callback?: (rules: Rule[]) => void): void;
		/**
		 * Deregisters an event listener callback from an event.
		 * @param callback Listener that shall be unregistered.
		 * The callback parameter should be a function that looks like this:
		 * function() {...};
		 */
		removeListener(callback: T): void;
		hasListeners(): boolean;
	}

	/** Description of a declarative rule for handling events. */
	interface Rule {
		/** Optional. Optional priority of this rule. Defaults to 100.  */
		priority?: number;
		/** List of conditions that can trigger the actions. */
		conditions: any[];
		/** Optional. Optional identifier that allows referencing this rule.  */
		id?: string;
		/** List of actions that are triggered if one of the condtions is fulfilled. */
		actions: any[];
		/**
		 * Optional.
		 * Since Chrome 28.
		 * Tags can be used to annotate rules and perform operations on sets of rules.
		 */
		tags?: string[];
	}
}

////////////////////
// i18n
////////////////////
/**
 * Use the browser.i18n infrastructure to implement internationalization across your whole app or extension.
 */
declare namespace browser.i18n {
    /**
     * Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use i18n.getUILanguage.
     * @param callback The callback parameter should be a function that looks like this:
     * function(array of string languages) {...};
     * Parameter languages: Array of the accept languages of the browser, such as en-US,en,zh-CN
     */
    export function getAcceptLanguages(callback: (languages: string[]) => void): void;
    /**
     * Gets the localized string for the specified message. If the message is missing, this method returns an empty string (''). If the format of the getMessage() call is wrong — for example, messageName is not a string or the substitutions array has more than 9 elements — this method returns undefined.
     * @param messageName The name of the message, as specified in the messages.json file.
     * @param substitutions Optional. Up to 9 substitution strings, if the message requires any.
     */
    export function getMessage(messageName: string, substitutions?: any): string;
    /**
     * Gets the browser UI language of the browser. This is different from i18n.getAcceptLanguages which returns the preferred user languages.
     * @since Chrome 35.
     */
    export function getUILanguage(): string;
}

////////////////////
// Management
////////////////////
/**
 * The browser.management API provides ways to manage the list of extensions/apps that are installed and running. It is particularly useful for extensions that override the built-in New Tab page.
 * Permissions:  "management"
 * @since Chrome 8.
 */
declare namespace browser.management {
    /** Information about an installed extension, app, or theme. */
    interface ExtensionInfo {
        /**
         * Optional.
         * A reason the item is disabled.
         * @since Chrome 17.
         */
        disabledReason?: string;
        /** Optional. The launch url (only present for apps). */
        appLaunchUrl?: string;
        /**
         * The description of this extension, app, or theme.
         * @since Chrome 9.
         */
        description: string;
        /**
         * Returns a list of API based permissions.
         * @since Chrome 9.
         */
        permissions: string[];
        /**
         * Optional.
         * A list of icon information. Note that this just reflects what was declared in the manifest, and the actual image at that url may be larger or smaller than what was declared, so you might consider using explicit width and height attributes on img tags referencing these images. See the manifest documentation on icons for more details.
         */
        icons?: IconInfo[];
        /**
         * Returns a list of host based permissions.
         * @since Chrome 9.
         */
        hostPermissions: string[];
        /** Whether it is currently enabled or disabled. */
        enabled: boolean;
        /**
         * Optional.
         * The URL of the homepage of this extension, app, or theme.
         * @since Chrome 11.
         */
        homepageUrl?: string;
        /**
         * Whether this extension can be disabled or uninstalled by the user.
         * @since Chrome 12.
         */
        mayDisable: boolean;
        /**
         * How the extension was installed.
         * @since Chrome 22.
         */
        installType: string;
        /** The version of this extension, app, or theme. */
        version: string;
        /** The extension's unique identifier. */
        id: string;
        /**
         * Whether the extension, app, or theme declares that it supports offline.
         * @since Chrome 15.
         */
        offlineEnabled: boolean;
        /**
         * Optional.
         * The update URL of this extension, app, or theme.
         * @since Chrome 16.
         */
        updateUrl?: string;
        /**
         * The type of this extension, app, or theme.
         * @since Chrome 23.
         */
        type: string;
        /** The url for the item's options page, if it has one. */
        optionsUrl: string;
        /** The name of this extension, app, or theme. */
        name: string;
        /**
         * A short version of the name of this extension, app, or theme.
         * @since Chrome 31.
         */
        shortName: string;
        /**
         * True if this is an app.
         * @deprecated since Chrome 33. Please use management.ExtensionInfo.type.
         */
        isApp: boolean;
        /**
         * Optional.
         * The app launch type (only present for apps).
         * @since Chrome 37.
         */
        launchType?: string;
        /**
         * Optional.
         * The currently available launch types (only present for apps).
         * @since Chrome 37.
         */
        availableLaunchTypes?: string[];
    }

    /** Information about an icon belonging to an extension, app, or theme. */
    interface IconInfo {
        /** The URL for this icon image. To display a grayscale version of the icon (to indicate that an extension is disabled, for example), append ?grayscale=true to the URL. */
        url: string;
        /** A number representing the width and height of the icon. Likely values include (but are not limited to) 128, 48, 24, and 16. */
        size: number;
    }

    interface UninstallOptions {
        /**
         * Optional.
         * Whether or not a confirm-uninstall dialog should prompt the user. Defaults to false for self uninstalls. If an extension uninstalls another extension, this parameter is ignored and the dialog is always shown.
         */
        showConfirmDialog?: boolean;
    }

    interface ManagementDisabledEvent extends browser.events.Event<(info: ExtensionInfo) => void> {}

    interface ManagementUninstalledEvent extends browser.events.Event<(id: string) => void> {}

    interface ManagementInstalledEvent extends browser.events.Event<(info: ExtensionInfo) => void> {}

    interface ManagementEnabledEvent extends browser.events.Event<(info: ExtensionInfo) => void> {}

    /**
     * Enables or disables an app or extension.
     * @param id This should be the id from an item of management.ExtensionInfo.
     * @param enabled Whether this item should be enabled or disabled.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function setEnabled(id: string, enabled: boolean, callback?: () => void): void;
    /**
     * Returns a list of permission warnings for the given extension id.
     * @since Chrome 15.
     * @param id The ID of an already installed extension.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function(array of string permissionWarnings) {...};
     */
    export function getPermissionWarningsById(id: string, callback?: (permissionWarnings: string[]) => void): void;
    /**
     * Returns information about the installed extension, app, or theme that has the given ID.
     * @since Chrome 9.
     * @param id The ID from an item of management.ExtensionInfo.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function( ExtensionInfo result) {...};
     */
    export function get(id: string, callback?: (result: ExtensionInfo) => void): void;
    /**
     * Returns a list of information about installed extensions and apps.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function(array of ExtensionInfo result) {...};
     */
    export function getAll(callback?: (result: ExtensionInfo[]) => void): void;
    /**
     * Returns a list of permission warnings for the given extension manifest string. Note: This function can be used without requesting the 'management' permission in the manifest.
     * @since Chrome 15.
     * @param manifestStr Extension manifest JSON string.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function(array of string permissionWarnings) {...};
     */
    export function getPermissionWarningsByManifest(manifestStr: string, callback?: (permissionwarnings: string[]) => void): void;
    /**
     * Launches an application.
     * @param id The extension id of the application.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function launchApp(id: string, callback?: () => void): void;
    /**
     * Uninstalls a currently installed app or extension.
     * @since Chrome 21.
     * @param id This should be the id from an item of management.ExtensionInfo.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function uninstall(id: string, options?: UninstallOptions, callback?: () => void): void;
    /**
     * Uninstalls a currently installed app or extension.
     * @deprecated since Chrome 21. The options parameter was added to this function.
     * @param id This should be the id from an item of management.ExtensionInfo.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function uninstall(id: string, callback?: () => void): void;
    /**
     * Returns information about the calling extension, app, or theme. Note: This function can be used without requesting the 'management' permission in the manifest.
     * @since Chrome 39.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function( ExtensionInfo result) {...};
     */
    export function getSelf(callback?: (result: ExtensionInfo) => void): void;
    /**
     * Uninstalls the calling extension.
     * Note: This function can be used without requesting the 'management' permission in the manifest.
     * @since Chrome 26.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function uninstallSelf(options?: UninstallOptions, callback?: () => void): void;
    /**
     * Uninstalls the calling extension.
     * Note: This function can be used without requesting the 'management' permission in the manifest.
     * @since Chrome 26.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function uninstallSelf(callback?: () => void): void;
    /**
     * Display options to create shortcuts for an app. On Mac, only packaged app shortcuts can be created.
     * @since Chrome 37.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function createAppShortcut(id: string, callback?: () => void): void;
    /**
     * Set the launch type of an app.
     * @since Chrome 37.
     * @param id This should be the id from an app item of management.ExtensionInfo.
     * @param launchType The target launch type. Always check and make sure this launch type is in ExtensionInfo.availableLaunchTypes, because the available launch types vary on different platforms and configurations.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    export function setLaunchType(id: string, launchType: string, callback?: () => void): void;
    /**
     * Generate an app for a URL. Returns the generated bookmark app.
     * @since Chrome 37.
     * @param url The URL of a web page. The scheme of the URL can only be "http" or "https".
     * @param title The title of the generated app.
     * @param callback If you specify the callback parameter, it should be a function that looks like this:
     * function( ExtensionInfo result) {...};
     */
    export function generateAppForLink(url: string, title: string, callback?: (result: ExtensionInfo) => void): void;

    /** Fired when an app or extension has been disabled. */
    var onDisabled: ManagementDisabledEvent;
    /** Fired when an app or extension has been uninstalled. */
    var onUninstalled: ManagementUninstalledEvent;
    /** Fired when an app or extension has been installed. */
    var onInstalled: ManagementInstalledEvent;
    /** Fired when an app or extension has been enabled. */
    var onEnabled: ManagementEnabledEvent;
}

////////////////////
// Runtime
////////////////////
/**
 * Use the browser.runtime API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs.
 * @since Chrome 22
 */
declare namespace browser.runtime {
    /** This will be defined during an API method callback if there was an error */
    var lastError: LastError;
    /** The ID of the extension/app. */
    var id: string;

    var PlatformOs: {
        MAC: string;
        WIN: string;
        ANDROID: string;
        CROS: string;
        LINUX: string;
        OPENBSD: string;
    };

    var PlatformArch: {
        ARM: string;
        'X86-32': string;
        'X86-64': string;
    };

    var RequestUpdateCheckStatus: {
        THROTTLED: string;
        NO_UPDATE: string;
        UPDATE_AVAILABLE: string;
    };

    var OnInstalledReason: {
        INSTALL: string;
        UPDATE: string;
        CHROME_UPDATE: string;
        SHARED_MODULE_UPDATE: string;
    };

    var OnRestartRequiredReason: {
        APP_UPDATE: string;
        OS_UPDATE: string;
        PERIODIC: string;
    };

    interface LastError {
        /** Optional. Details about the error which occurred.  */
        message?: string;
    }

    interface ConnectInfo {
        name?: string;
    }

    interface InstalledDetails {
        /**
         * The reason that this event is being dispatched.
         * One of: "install", "update", "chrome_update", or "shared_module_update"
         */
        reason: string;
        /**
         * Optional.
         * Indicates the previous version of the extension, which has just been updated. This is present only if 'reason' is 'update'.
         */
        previousVersion?: string;
        /**
         * Optional.
         * Indicates the ID of the imported shared module extension which updated. This is present only if 'reason' is 'shared_module_update'.
         * @since Chrome 29.
         */
        id?: string;
    }

    interface MessageOptions {
        /** Whether the TLS channel ID will be passed into onMessageExternal for processes that are listening for the connection event. */
        includeTlsChannelId?: boolean;
    }

    /**
     * An object containing information about the script context that sent a message or request.
     * @since Chrome 26.
     */
    interface MessageSender {
        /** The ID of the extension or app that opened the connection, if any. */
        id?: string;
        /** The tabs.Tab which opened the connection, if any. This property will only be present when the connection was opened from a tab (including content scripts), and only if the receiver is an extension, not an app. */
        tab?: browser.tabs.Tab;
        /**
         * The frame that opened the connection. 0 for top-level frames, positive for child frames. This will only be set when tab is set.
         * @since Chrome 41.
         */
        frameId?: number;
        /**
         * The URL of the page or frame that opened the connection. If the sender is in an iframe, it will be iframe's URL not the URL of the page which hosts it.
         * @since Chrome 28.
         */
        url?: string;
        /**
         * The TLS channel ID of the page or frame that opened the connection, if requested by the extension or app, and if available.
         * @since Chrome 32.
         */
        tlsChannelId?: string;
    }

    /**
     * An object containing information about the current platform.
     * @since Chrome 36.
     */
    interface PlatformInfo {
        /**
         * The operating system browser is running on.
         * One of: "mac", "win", "android", "cros", "linux", or "openbsd"
         */
        os: string;
        /**
         * The machine's processor architecture.
         * One of: "arm", "x86-32", or "x86-64"
         */
        arch: string;
        /**
         * The native client architecture. This may be different from arch on some platforms.
         * One of: "arm", "x86-32", or "x86-64"
         */
        nacl_arch: string;
    }

    /**
     * An object which allows two way communication with other pages.
     * @since Chrome 26.
     */
    interface Port {
        postMessage: (message: Object) => void;
        disconnect: () => void;
        /**
         * Optional.
         * This property will only be present on ports passed to onConnect/onConnectExternal listeners.
         */
        sender?: MessageSender;
        /** An object which allows the addition and removal of listeners for a Chrome event. */
        onDisconnect: PortDisconnectEvent;
        /** An object which allows the addition and removal of listeners for a Chrome event. */
        onMessage: PortMessageEvent;
        name: string;
    }

    interface UpdateAvailableDetails {
        /** The version number of the available update. */
        version: string;
    }

    interface UpdateCheckDetails {
        /** The version of the available update. */
        version: string;
    }

    interface PortDisconnectEvent extends browser.events.Event<(port: Port) => void> {}

    interface PortMessageEvent extends browser.events.Event<(message: Object, port: Port) => void> {}

    interface ExtensionMessageEvent extends browser.events.Event<(message: any, sender: MessageSender, sendResponse: (response: any) => void) => void> {}

    interface ExtensionConnectEvent extends browser.events.Event<(port: Port) => void> {}

    interface RuntimeInstalledEvent extends browser.events.Event<(details: InstalledDetails) => void> {}

    interface RuntimeEvent extends browser.events.Event<() => void> {}

    interface RuntimeRestartRequiredEvent extends browser.events.Event<(reason: string) => void> {}

    interface RuntimeUpdateAvailableEvent extends browser.events.Event<(details: UpdateAvailableDetails) => void> {}

    interface ManifestIcons {
        [size: number]: string;
    }

    interface ManifestAction {
        default_icon?: ManifestIcons;
        default_title?: string;
        default_popup?: string;
    }

    interface SearchProvider {
        name?: string;
        keyword?: string;
        favicon_url?: string;
        search_url: string;
        encoding?: string;
        suggest_url?: string;
        instant_url?: string;
        image_url?: string;
        search_url_post_params?: string;
        suggest_url_post_params?: string;
        instant_url_post_params?: string;
        image_url_post_params?: string;
        alternate_urls?: string[];
        prepopulated_id?: number;
        is_default?: boolean;
    }

    interface Manifest {
        // Required
        manifest_version: number;
        name: string;
        version: string;

        // Recommended
        default_locale?: string;
        description?: string;
        icons?: ManifestIcons;

        // Pick one (or none)
        browser_action?: ManifestAction;
        page_action?: ManifestAction;

        // Optional
        author?: any;
        automation?: any;
        background?: {
            scripts?: string[];
            page?: string;
            persistent?: boolean;
        };
        background_page?: string;
        chrome_settings_overrides?: {
            homepage?: string;
            search_provider?: SearchProvider;
            startup_pages?: string[];
        };
        chrome_ui_overrides?: {
            bookmarks_ui?: {
                remove_bookmark_shortcut?: boolean;
                remove_button?: boolean;
            }
        };
        chrome_url_overrides?: {
            bookmarks?: string;
            history?: string;
            newtab?: string;
        };
        commands?: {
            [name: string]: {
                suggested_key?: {
                    default?: string;
                    windows?: string;
                    mac?: string;
                    chromeos?: string;
                    linux?: string;
                };
                description?: string;
                global?: boolean
            }
        };
        content_capabilities?: {
            matches?: string[];
            permissions?: string[];
        };
        content_scripts?: {
            matches?: string[];
            exclude_matches?: string[];
            css?: string[];
            js?: string[];
            run_at?: string;
            all_frames?: boolean;
            include_globs?: string[];
            exclude_globs?: string[];
        }[];
        content_security_policy?: string;
        converted_from_user_script?: boolean;
        copresence?: any;
        current_locale?: string;
        devtools_page?: string;
        event_rules?: {
            event?: string;
            actions?: {
                type: string;
            }[];
            // conditions?: browser.declarativeContent.PageStateMatcher[]
        }[];
        externally_connectable?: {
            ids?: string[];
            matches?: string[];
            accepts_tls_channel_id?: boolean;
        };
        file_browser_handlers?: {
            id?: string;
            default_title?: string;
            file_filters?: string[];
        }[];
        file_system_provider_capabilities?: {
            configurable?: boolean;
            watchable?: boolean;
            multiple_mounts?: boolean;
            source?: string;
        };
        homepage_url?: string;
        import?: {
            id: string;
            minimum_version?: string
        }[];
        export?: {
            whitelist?: string[]
        };
        incognito?: string;
        input_components?: {
            name?: string;
            type?: string;
            id?: string;
            description?: string;
            language?: string;
            layouts?: any[];
        }[];
        key?: string;
        minimum_chrome_version?: string;
        nacl_modules?: {
            path: string;
            mime_type: string;
        }[];
        oauth2?: {
            client_id: string;
            scopes?: string[];
        };
        offline_enabled?: boolean;
        omnibox?: {
            keyword: string;
        };
        optional_permissions?: string[];
        options_page?: string;
        options_ui?: {
            page?: string;
            chrome_style?: boolean;
            open_in_tab?: boolean;
        };
        permissions?: string[];
        platforms?: {
            nacl_arch?: string;
            sub_package_path: string;
        }[];
        plugins?: {
            path: string;
        }[];
        requirements?: {
            '3D'?: {
                features?: string[]
            };
            plugins?: {
                npapi?: boolean;
            }
        };
        sandbox?: {
            pages: string[];
            content_security_policy?: string;
        };
        short_name?: string;
        signature?: any;
        spellcheck?: {
            dictionary_language?: string;
            dictionary_locale?: string;
            dictionary_format?: string;
            dictionary_path?: string;
        };
        storage?: {
            managed_schema: string
        };
        system_indicator?: any;
        tts_engine?: {
            voices: {
                voice_name: string;
                lang?: string;
                gender?: string;
                event_types?: string[];
            }[]
        };
        update_url?: string;
        version_name?: string;
        web_accessible_resources?: string[];
        [key: string]: any;
    }

    /**
     * Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and web messaging. Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via tabs.connect.
     * @since Chrome 26.
     */
    export function connect(connectInfo?: ConnectInfo): Port;
    /**
     * Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and web messaging. Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via tabs.connect.
     * @since Chrome 26.
     * @param extensionId Optional.
     * The ID of the extension or app to connect to. If omitted, a connection will be attempted with your own extension. Required if sending messages from a web page for web messaging.
     */
    export function connect(extensionId: string, connectInfo?: ConnectInfo): Port;
    /**
     * Connects to a native application in the host machine.
     * @since Chrome 28.
     * @param application The name of the registered application to connect to.
     */
    export function connectNative(application: string): Port;
    /** Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set. */
    export function getBackgroundPage(callback: (backgroundPage?: Window) => void): void;
    /**
     * Returns details about the app or extension from the manifest. The object returned is a serialization of the full manifest file.
     * @returns The manifest details.
     */
    export function getManifest(): Manifest;
    // TODO: @noomorph
    // /**
    //  * Returns a DirectoryEntry for the package directory.
    //  * @since Chrome 29.
    //  */
    // export function getPackageDirectoryEntry(callback: (directoryEntry: DirectoryEntry) => void): void;
    /**
     * Returns information about the current platform.
     * @since Chrome 29.
     * @param callback Called with results
     */
    export function getPlatformInfo(callback: (platformInfo: PlatformInfo) => void): void;
    /**
     * Converts a relative path within an app/extension install directory to a fully-qualified URL.
     * @param path A path to a resource within an app/extension expressed relative to its install directory.
     */
    export function getURL(path: string): string;
    /**
     * Reloads the app or extension.
     * @since Chrome 25.
     */
    export function reload(): void;
    /**
     * Requests an update check for this app/extension.
     * @since Chrome 25.
     * @param callback
     * Parameter status: Result of the update check. One of: "throttled", "no_update", or "update_available"
     * Optional parameter details: If an update is available, this contains more information about the available update.
     */
    export function requestUpdateCheck(callback: (status: string, details?: UpdateCheckDetails) => void): void;
    /**
     * Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's no-op.
     * @since Chrome 32.
     */
    export function restart(): void;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
     * @since Chrome 26.
     * @param responseCallback Optional
     * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendMessage(message: any, responseCallback?: (response: any) => void): void;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
     * @since Chrome 32.
     * @param responseCallback Optional
     * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendMessage(message: any, options: MessageOptions, responseCallback?: (response: any) => void): void;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
     * @since Chrome 26.
     * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for web messaging.
     * @param responseCallback Optional
     * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendMessage(extensionId: string, message: any, responseCallback?: (response: any) => void): void;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
     * @since Chrome 32.
     * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for web messaging.
     * @param responseCallback Optional
     * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendMessage(extensionId: string, message: any, options: MessageOptions, responseCallback?: (response: any) => void): void;
    /**
     * Send a single message to a native application.
     * @since Chrome 28.
     * @param application The of the native messaging host.
     * @param message The message that will be passed to the native messaging host.
     * @param responseCallback Optional.
     * Parameter response: The response message sent by the native messaging host. If an error occurs while connecting to the native messaging host, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendNativeMessage(application: string, message: Object, responseCallback?: (response: any) => void): void;
    /**
     * Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 255 characters.
     * @since Chrome 41.
     * @param url Since Chrome 34.
     * URL to be opened after the extension is uninstalled. This URL must have an http: or https: scheme. Set an empty string to not open a new tab upon uninstallation.
     * @param callback Called when the uninstall URL is set. If the given URL is invalid, runtime.lastError will be set.
     */
    export function setUninstallURL(url: string, callback?: () => void): void;
    /**
     * Open your Extension's options page, if possible.
     * The precise behavior may depend on your manifest's options_ui or options_page key, or what Chrome happens to support at the time. For example, the page may be opened in a new tab, within browser://extensions, within an App, or it may just focus an open options page. It will never cause the caller page to reload.
     * If your Extension does not declare an options page, or Chrome failed to create one for some other reason, the callback will set lastError.
     * @since Chrome 42.
     */
    export function openOptionsPage(callback?: () => void): void;

    /**
     * Fired when a connection is made from either an extension process or a content script.
     * @since Chrome 26.
     */
    var onConnect: ExtensionConnectEvent;
    /**
     * Fired when a connection is made from another extension.
     * @since Chrome 26.
     */
    var onConnectExternal: ExtensionConnectEvent;
    /** Sent to the event page just before it is unloaded. This gives the extension opportunity to do some clean up. Note that since the page is unloading, any asynchronous operations started while handling this event are not guaranteed to complete. If more activity for the event page occurs before it gets unloaded the onSuspendCanceled event will be sent and the page won't be unloaded. */
    var onSuspend: RuntimeEvent;
    /**
     * Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode.
     * @since Chrome 23.
     */
    var onStartup: RuntimeEvent;
    /** Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version. */
    var onInstalled: RuntimeInstalledEvent;
    /** Sent after onSuspend to indicate that the app won't be unloaded after all. */
    var onSuspendCanceled: RuntimeEvent;
    /**
     * Fired when a message is sent from either an extension process or a content script.
     * @since Chrome 26.
     */
    var onMessage: ExtensionMessageEvent;
    /**
     * Fired when a message is sent from another extension/app. Cannot be used in a content script.
     * @since Chrome 26.
     */
    var onMessageExternal: ExtensionMessageEvent;
    /**
     * Fired when an app or the device that it runs on needs to be restarted. The app should close all its windows at its earliest convenient time to let the restart to happen. If the app does nothing, a restart will be enforced after a 24-hour grace period has passed. Currently, this event is only fired for Chrome OS kiosk apps.
     * @since Chrome 29.
     */
    var onRestartRequired: RuntimeRestartRequiredEvent;
    /**
     * Fired when an update is available, but isn't installed immediately because the app is currently running. If you do nothing, the update will be installed the next time the background page gets unloaded, if you want it to be installed sooner you can explicitly call browser.runtime.reload(). If your extension is using a persistent background page, the background page of course never gets unloaded, so unless you call browser.runtime.reload() manually in response to this event the update will not get installed until the next time browser itself restarts. If no handlers are listening for this event, and your extension has a persistent background page, it behaves as if browser.runtime.reload() is called in response to this event.
     * @since Chrome 25.
     */
    var onUpdateAvailable: RuntimeUpdateAvailableEvent;
    /**
     * @deprecated since Chrome 33. Please use browser.runtime.onRestartRequired.
     * Fired when a Chrome update is available, but isn't installed immediately because a browser restart is required.
     */
    var onBrowserUpdateAvailable: RuntimeEvent;
}

////////////////////
// Tabs
////////////////////
/**
 * Use the browser.tabs API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.
 * Permissions: The majority of the browser.tabs API can be used without declaring any permission. However, the "tabs" permission is required in order to populate the url, title, and favIconUrl properties of Tab.
 * @since Chrome 5.
 */
declare namespace browser.tabs {
    /**
     * Tab muted state and the reason for the last state change.
     * @since Chrome 46. Warning: this is the current Beta channel.
     */
    interface MutedInfo {
        /** Whether the tab is prevented from playing sound (but hasn't necessarily recently produced sound). Equivalent to whether the muted audio indicator is showing. */
        muted: boolean;
        /**
         * Optional.
         * The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed.
         * "user": A user input action has set/overridden the muted state.
         * "capture": Tab capture started, forcing a muted state change.
         * "extension": An extension, identified by the extensionId field, set the muted state.
         */
        reason?: string;
        /**
         * Optional.
         * The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed.
         */
        extensionId?: string;
    }

    interface Tab {
        /**
         * Optional.
         * Either loading or complete.
         */
        status?: string;
        /** The zero-based index of the tab within its window. */
        index: number;
        /**
         * Optional.
         * The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
         * @since Chrome 18.
         */
        openerTabId?: number;
        /**
         * Optional.
         * The title of the tab. This property is only present if the extension's manifest includes the "tabs" permission.
         */
        title?: string;
        /**
         * Optional.
         * The URL the tab is displaying. This property is only present if the extension's manifest includes the "tabs" permission.
         */
        url?: string;
        /**
         * Whether the tab is pinned.
         * @since Chrome 9.
         */
        pinned: boolean;
        /**
         * Whether the tab is highlighted.
         * @since Chrome 16.
         */
        highlighted: boolean;
        /** The ID of the window the tab is contained within. */
        windowId: number;
        /**
         * Whether the tab is active in its window. (Does not necessarily mean the window is focused.)
         * @since Chrome 16.
         */
        active: boolean;
        /**
         * Optional.
         * The URL of the tab's favicon. This property is only present if the extension's manifest includes the "tabs" permission. It may also be an empty string if the tab is loading.
         */
        favIconUrl?: string;
        /**
         * Optional.
         * The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a Tab may not be assigned an ID, for example when querying foreign tabs using the sessions API, in which case a session ID may be present. Tab ID can also be set to browser.tabs.TAB_ID_NONE for apps and devtools windows.
         */
        id?: number;
        /** Whether the tab is in an incognito window. */
        incognito: boolean;
        /**
         * Whether the tab is selected.
         * @deprecated since Chrome 33. Please use tabs.Tab.highlighted.
         */
        selected: boolean;
        /**
         * Optional.
         * Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the speaker audio indicator is showing.
         * @since Chrome 45.
         */
        audible?: boolean;
        /**
         * Optional.
         * Current tab muted state and the reason for the last state change.
         * @since Chrome 46. Warning: this is the current Beta channel.
         */
        mutedInfo?: MutedInfo;
        /**
         * Optional. The width of the tab in pixels.
         * @since Chrome 31.
         */
        width?: number;
        /**
         * Optional. The height of the tab in pixels.
         * @since Chrome 31.
         */
        height?: number;
        /**
         * Optional. The session ID used to uniquely identify a Tab obtained from the sessions API.
         * @since Chrome 31.
         */
        sessionId?: string;
    }

    /**
     * Defines how zoom changes in a tab are handled and at what scope.
     * @since Chrome 38.
     */
    interface ZoomSettings {
        /**
         * Optional.
         * Defines how zoom changes are handled, i.e. which entity is responsible for the actual scaling of the page; defaults to "automatic".
         * "automatic": Zoom changes are handled automatically by the browser.
         * "manual": Overrides the automatic handling of zoom changes. The onZoomChange event will still be dispatched, and it is the responsibility of the extension to listen for this event and manually scale the page. This mode does not support per-origin zooming, and will thus ignore the scope zoom setting and assume per-tab.
         * "disabled": Disables all zooming in the tab. The tab will revert to the default zoom level, and all attempted zoom changes will be ignored.
         */
        mode?: string;
        /**
         * Optional.
         * Defines whether zoom changes will persist for the page's origin, or only take effect in this tab; defaults to per-origin when in automatic mode, and per-tab otherwise.
         * "per-origin": Zoom changes will persist in the zoomed page's origin, i.e. all other tabs navigated to that same origin will be zoomed as well. Moreover, per-origin zoom changes are saved with the origin, meaning that when navigating to other pages in the same origin, they will all be zoomed to the same zoom factor. The per-origin scope is only available in the automatic mode.
         * "per-tab": Zoom changes only take effect in this tab, and zoom changes in other tabs will not affect the zooming of this tab. Also, per-tab zoom changes are reset on navigation; navigating a tab will always load pages with their per-origin zoom factors.
         */
        scope?: string;
        /**
         * Optional.
         * Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings.
         * @since Chrome 43.
         */
        defaultZoomFactor?: number;
    }

    interface InjectDetails {
        /**
         * Optional.
         * If allFrames is true, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's false and is only injected into the top frame.
         */
        allFrames?: boolean;
        /**
         * Optional. JavaScript or CSS code to inject.
         * Warning: Be careful using the code parameter. Incorrect use of it may open your extension to cross site scripting attacks.
         */
        code?: string;
        /**
         * Optional. The soonest that the JavaScript or CSS will be injected into the tab.
         * One of: "document_start", "document_end", or "document_idle"
         * @since Chrome 20.
         */
        runAt?: string;
        /** Optional. JavaScript or CSS file to inject. */
        file?: string;
        /**
         * Optional.
         * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is false.
         * @since Chrome 39.
         */
        matchAboutBlank?: boolean;
    }

    interface CreateProperties {
        /** Optional. The position the tab should take in the window. The provided value will be clamped to between zero and the number of tabs in the window. */
        index?: number;
        /**
         * Optional.
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab.
         * @since Chrome 18.
         */
        openerTabId?: number;
        /**
         * Optional.
         * The URL to navigate the tab to initially. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page.
         */
        url?: string;
        /**
         * Optional. Whether the tab should be pinned. Defaults to false
         * @since Chrome 9.
         */
        pinned?: boolean;
        /** Optional. The window to create the new tab in. Defaults to the current window. */
        windowId?: number;
        /**
         * Optional.
         * Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see windows.update). Defaults to true.
         * @since Chrome 16.
         */
        active?: boolean;
        /**
         * Optional. Whether the tab should become the selected tab in the window. Defaults to true
         * @deprecated since Chrome 33. Please use active.
         */
        selected?: boolean;
    }

    interface MoveProperties {
        /** The position to move the window to. -1 will place the tab at the end of the window. */
        index: number;
        /** Optional. Defaults to the window the tab is currently in. */
        windowId?: number;
    }

    interface UpdateProperties {
        /**
         * Optional. Whether the tab should be pinned.
         * @since Chrome 9.
         */
        pinned?: boolean;
        /**
         * Optional. The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
         * @since Chrome 18.
         */
        openerTabId?: number;
        /** Optional. A URL to navigate the tab to. */
        url?: string;
        /**
         * Optional. Adds or removes the tab from the current selection.
         * @since Chrome 16.
         */
        highlighted?: boolean;
        /**
         * Optional. Whether the tab should be active. Does not affect whether the window is focused (see windows.update).
         * @since Chrome 16.
         */
        active?: boolean;
        /**
         * Optional. Whether the tab should be selected.
         * @deprecated since Chrome 33. Please use highlighted.
         */
        selected?: boolean;
        /**
         * Optional. Whether the tab should be muted.
         * @since Chrome 45.
         */
        muted?: boolean;
    }

    interface CaptureVisibleTabOptions {
        /**
         * Optional.
         * When format is "jpeg", controls the quality of the resulting image. This value is ignored for PNG images. As quality is decreased, the resulting image will have more visual artifacts, and the number of bytes needed to store it will decrease.
         */
        quality?: number;
        /**
         * Optional. The format of an image.
         * One of: "jpeg", or "png"
         */
        format?: string;
    }

    interface ReloadProperties {
        /** Optional. Whether using any local cache. Default is false. */
        bypassCache?: boolean;
    }

    interface ConnectInfo {
        /** Optional. Will be passed into onConnect for content scripts that are listening for the connection event. */
        name?: string;
        /**
         * Open a port to a specific frame identified by frameId instead of all frames in the tab.
         * @since Chrome 41.
         */
        frameId?: number;
    }

    interface MessageSendOptions {
        /** Optional. Send a message to a specific frame identified by frameId instead of all frames in the tab. */
        frameId?: number;
    }

    interface HighlightInfo {
        /** One or more tab indices to highlight. */
        tabs: number | number[];
        /** Optional. The window that contains the tabs. */
        windowId?: number;
    }

    interface QueryInfo {
        /**
         * Optional. Whether the tabs have completed loading.
         * One of: "loading", or "complete"
         */
        status?: string;
        /**
         * Optional. Whether the tabs are in the last focused window.
         * @since Chrome 19.
         */
        lastFocusedWindow?: boolean;
        /** Optional. The ID of the parent window, or windows.WINDOW_ID_CURRENT for the current window. */
        windowId?: number;
        /**
         * Optional. The type of window the tabs are in.
         * One of: "normal", "popup", "panel", "app", or "devtools"
         */
        windowType?: string;
        /** Optional. Whether the tabs are active in their windows. */
        active?: boolean;
        /**
         * Optional. The position of the tabs within their windows.
         * @since Chrome 18.
         */
        index?: number;
        /** Optional. Match page titles against a pattern. */
        title?: string;
        /** Optional. Match tabs against one or more URL patterns. Note that fragment identifiers are not matched. */
        url?: string | string[];
        /**
         * Optional. Whether the tabs are in the current window.
         * @since Chrome 19.
         */
        currentWindow?: boolean;
        /** Optional. Whether the tabs are highlighted. */
        highlighted?: boolean;
        /** Optional. Whether the tabs are pinned. */
        pinned?: boolean;
        /**
         * Optional. Whether the tabs are audible.
         * @since Chrome 45.
         */
        audible?: boolean;
        /**
         * Optional. Whether the tabs are muted.
         * @since Chrome 45.
         */
        muted?: boolean;
    }

    interface TabHighlightInfo {
        windowId: number;
        tabIds: number[];
    }

    interface TabRemoveInfo {
        /**
         * The window whose tab is closed.
         * @since Chrome 25.
         */
        windowId: number;
        /** True when the tab is being closed because its window is being closed. */
        isWindowClosing: boolean;
    }

    interface TabAttachInfo {
        newPosition: number;
        newWindowId: number;
    }

    interface TabChangeInfo {
        /** Optional. The status of the tab. Can be either loading or complete. */
        status?: string;
        /**
         * The tab's new pinned state.
         * @since Chrome 9.
         */
        pinned?: boolean;
        /** Optional. The tab's URL if it has changed. */
        url?: string;
        /**
         * The tab's new audible state.
         * @since Chrome 45.
         */
        audible?: boolean;
        /**
         * The tab's new muted state and the reason for the change.
         * @since Chrome 46. Warning: this is the current Beta channel.
         */
        mutedInfo?: MutedInfo;
        /**
         * The tab's new favicon URL.
         * @since Chrome 27.
         */
        favIconUrl?: string;
        /**
         * The tab's new title.
         * @since Chrome 48.
         */
        title?: string;
    }

    interface TabMoveInfo {
        toIndex: number;
        windowId: number;
        fromIndex: number;
    }

    interface TabDetachInfo {
        oldWindowId: number;
        oldPosition: number;
    }

    interface TabActiveInfo {
        /** The ID of the tab that has become active. */
        tabId: number;
        /** The ID of the window the active tab changed inside of. */
        windowId: number;
    }

    interface TabWindowInfo {
        /** The ID of the window of where the tab is located. */
        windowId: number;
    }

    interface ZoomChangeInfo {
        tabId: number;
        oldZoomFactor: number;
        newZoomFactor: number;
        zoomSettings: ZoomSettings;
    }

    interface TabHighlightedEvent extends browser.events.Event<(highlightInfo: HighlightInfo) => void> {}

    interface TabRemovedEvent extends browser.events.Event<(tabId: number, removeInfo: TabRemoveInfo) => void> {}

    interface TabUpdatedEvent extends browser.events.Event<(tabId: number, changeInfo: TabChangeInfo, tab: Tab) => void> {}

    interface TabAttachedEvent extends browser.events.Event<(tabId: number, attachInfo: TabAttachInfo) => void> {}

    interface TabMovedEvent extends browser.events.Event<(tabId: number, moveInfo: TabMoveInfo) => void> {}

    interface TabDetachedEvent extends browser.events.Event<(tabId: number, detachInfo: TabDetachInfo) => void> {}

    interface TabCreatedEvent extends browser.events.Event<(tab: Tab) => void> {}

    interface TabActivatedEvent extends browser.events.Event<(activeInfo: TabActiveInfo) => void> {}

    interface TabReplacedEvent extends browser.events.Event<(addedTabId: number, removedTabId: number) => void> {}

    interface TabSelectedEvent extends browser.events.Event<(tabId: number, selectInfo: TabWindowInfo) => void> {}

    interface TabZoomChangeEvent extends browser.events.Event<(ZoomChangeInfo: ZoomChangeInfo) => void> {}

    /**
     * Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc.
     * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     * @param callback Optional. Called after all the JavaScript has been executed.
     * Parameter result: The result of the script in every injected frame.
     */
    export function executeScript(details: InjectDetails, callback?: (result: any[]) => void): void;
    /**
     * Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc.
     * @param tabId Optional. The ID of the tab in which to run the script; defaults to the active tab of the current window.
     * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     * @param callback Optional. Called after all the JavaScript has been executed.
     * Parameter result: The result of the script in every injected frame.
     */
    export function executeScript(tabId: number, details: InjectDetails, callback?: (result: any[]) => void): void;
    /** Retrieves details about the specified tab. */
    export function get(tabId: number, callback: (tab: Tab) => void): void;
    /**
     * Gets details about all tabs in the specified window.
     * @deprecated since Chrome 33. Please use tabs.query {windowId: windowId}.
     */
    export function getAllInWindow(callback: (tab: Tab) => void): void;
    /**
     * Gets details about all tabs in the specified window.
     * @deprecated since Chrome 33. Please use tabs.query {windowId: windowId}.
     * @param windowId Optional. Defaults to the current window.
     */
    export function getAllInWindow(windowId: number, callback: (tab: Tab) => void): void;
    /** Gets the tab that this script call is being made from. May be undefined if called from a non-tab context (for example: a background page or popup view). */
    export function getCurrent(callback: (tab?: Tab) => void): void;
    /**
     * Gets the tab that is selected in the specified window.
     * @deprecated since Chrome 33. Please use tabs.query {active: true}.
     */
    export function getSelected(callback: (tab: Tab) => void): void;
    /**
     * Gets the tab that is selected in the specified window.
     * @deprecated since Chrome 33. Please use tabs.query {active: true}.
     * @param windowId Optional. Defaults to the current window.
     */
    export function getSelected(windowId: number, callback: (tab: Tab) => void): void;
    /**
     * Creates a new tab.
     * @param callback Optional.
     * Parameter tab: Details about the created tab. Will contain the ID of the new tab.
     */
    export function create(createProperties: CreateProperties, callback?: (tab: Tab) => void): void;
    /**
     * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
     * @param tabId The tab to move.
     * @param callback Optional.
     * Parameter tab: Details about the moved tab.
     */
    export function move(tabId: number, moveProperties: MoveProperties, callback?: (tab: Tab) => void): void;
    /**
     * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
     * @param tabIds The tabs to move.
     * @param callback Optional.
     * Parameter tabs: Details about the moved tabs.
     */
    export function move(tabIds: number[], moveProperties: MoveProperties, callback?: (tabs: Tab[]) => void): void;
    /**
     * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
     * @param callback Optional.
     * Optional parameter tab: Details about the updated tab. The tabs.Tab object doesn't contain url, title and favIconUrl if the "tabs" permission has not been requested.
     */
    export function update(updateProperties: UpdateProperties, callback?: (tab?: Tab) => void): void;
    /**
     * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
     * @param tabId Defaults to the selected tab of the current window.
     * @param callback Optional.
     * Optional parameter tab: Details about the updated tab. The tabs.Tab object doesn't contain url, title and favIconUrl if the "tabs" permission has not been requested.
     */
    export function update(tabId: number, updateProperties: UpdateProperties, callback?: (tab?: Tab) => void): void;
    /**
     * Closes a tab.
     * @param tabId The tab to close.
     */
    export function remove(tabId: number, callback?: Function): void;
    /**
     * Closes several tabs.
     * @param tabIds The list of tabs to close.
     */
    export function remove(tabIds: number[], callback?: Function): void;
    /**
     * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
     * @param callback
     * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(callback: (dataUrl: string) => void): void;
    /**
     * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
     * @param windowId Optional. The target window. Defaults to the current window.
     * @param callback
     * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(windowId: number, callback: (dataUrl: string) => void): void;
    /**
     * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
     * @param options Optional. Details about the format and quality of an image.
     * @param callback
     * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(options: CaptureVisibleTabOptions, callback: (dataUrl: string) => void): void;
    /**
     * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
     * @param windowId Optional. The target window. Defaults to the current window.
     * @param options Optional. Details about the format and quality of an image.
     * @param callback
     * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(windowId: number, options: CaptureVisibleTabOptions, callback: (dataUrl: string) => void): void;
    /**
     * Reload a tab.
     * @since Chrome 16.
     * @param tabId The ID of the tab to reload; defaults to the selected tab of the current window.
     */
    export function reload(tabId: number, reloadProperties?: ReloadProperties, callback?: () => void): void;
    /**
     * Reload the selected tab of the current window.
     * @since Chrome 16.
     */
    export function reload(reloadProperties: ReloadProperties, callback?: () => void): void;
    /**
     * Reload the selected tab of the current window.
      * @since Chrome 16.
     */
    export function reload(callback?: () => void): void;
    /**
     * Duplicates a tab.
     * @since Chrome 23.
     * @param tabId The ID of the tab which is to be duplicated.
     * @param callback Optional.
     * Optional parameter tab: Details about the duplicated tab. The tabs.Tab object doesn't contain url, title and favIconUrl if the "tabs" permission has not been requested.
     */
    export function duplicate(tabId: number, callback?: (tab?: Tab) => void): void;
    /**
     * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The runtime.onMessage event is fired in each content script running in the specified tab for the current extension.
     * @since Chrome 20.
     */
    export function sendMessage(tabId: number, message: any, responseCallback?: (response: any) => void): void;
    /**
     * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The runtime.onMessage event is fired in each content script running in the specified tab for the current extension.
     * @since Chrome 41.
     * @param responseCallback Optional.
     * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the specified tab, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendMessage(tabId: number, message: any, options: MessageSendOptions, responseCallback?: (response: any) => void): void;
    /**
     * Sends a single request to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The extension.onRequest event is fired in each content script running in the specified tab for the current extension.
     * @deprecated since Chrome 33. Please use runtime.sendMessage.
     * @param responseCallback Optional.
     * Parameter response: The JSON response object sent by the handler of the request. If an error occurs while connecting to the specified tab, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendRequest(tabId: number, request: any, responseCallback?: (response: any) => void): void;
    /** Connects to the content script(s) in the specified tab. The runtime.onConnect event is fired in each content script running in the specified tab for the current extension. */
    export function connect(tabId: number, connectInfo?: ConnectInfo): runtime.Port;
    /**
     * Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc.
     * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     * @param callback Optional. Called when all the CSS has been inserted.
     */
    export function insertCSS(details: InjectDetails, callback?: Function): void;
    /**
     * Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc.
     * @param tabId Optional. The ID of the tab in which to insert the CSS; defaults to the active tab of the current window.
     * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     * @param callback Optional. Called when all the CSS has been inserted.
     */
    export function insertCSS(tabId: number, details: InjectDetails, callback?: Function): void;
    /**
     * Highlights the given tabs.
     * @since Chrome 16.
     * @param callback Optional.
     * Parameter window: Contains details about the window whose tabs were highlighted.
     */
    export function highlight(highlightInfo: HighlightInfo, callback: (window: browser.windows.Window) => void): void;
    /**
     * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
     * @since Chrome 16.
     */
    export function query(queryInfo: QueryInfo, callback: (result: Tab[]) => void): void;
    /**
     * Detects the primary language of the content in a tab.
     * @param callback
     * Parameter language: An ISO language code such as en or fr. For a complete list of languages supported by this method, see kLanguageInfoTable. The 2nd to 4th columns will be checked and the first non-NULL value will be returned except for Simplified Chinese for which zh-CN will be returned. For an unknown language, und will be returned.
     */
    export function detectLanguage(callback: (language: string) => void): void;
    /**
     * Detects the primary language of the content in a tab.
     * @param tabId Optional. Defaults to the active tab of the current window.
     * @param callback
     * Parameter language: An ISO language code such as en or fr. For a complete list of languages supported by this method, see kLanguageInfoTable. The 2nd to 4th columns will be checked and the first non-NULL value will be returned except for Simplified Chinese for which zh-CN will be returned. For an unknown language, und will be returned.
     */
    export function detectLanguage(tabId: number, callback: (language: string) => void): void;
    /**
     * Zooms a specified tab.
     * @since Chrome 42.
     * @param zoomFactor The new zoom factor. Use a value of 0 here to set the tab to its current default zoom factor. Values greater than zero specify a (possibly non-default) zoom factor for the tab.
     * @param callback Optional. Called after the zoom factor has been changed.
     */
    export function setZoom(zoomFactor: number, callback?: () => void): void;
    /**
     * Zooms a specified tab.
     * @since Chrome 42.
     * @param tabId Optional. The ID of the tab to zoom; defaults to the active tab of the current window.
     * @param zoomFactor The new zoom factor. Use a value of 0 here to set the tab to its current default zoom factor. Values greater than zero specify a (possibly non-default) zoom factor for the tab.
     * @param callback Optional. Called after the zoom factor has been changed.
     */
    export function setZoom(tabId: number, zoomFactor: number, callback?: () => void): void;
    /**
     * Gets the current zoom factor of a specified tab.
     * @since Chrome 42.
     * @param callback Called with the tab's current zoom factor after it has been fetched.
     * Parameter zoomFactor: The tab's current zoom factor.
     */
    export function getZoom(callback: (zoomFactor: number) => void): void;
    /**
     * Gets the current zoom factor of a specified tab.
     * @since Chrome 42.
     * @param tabId Optional. The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window.
     * @param callback Called with the tab's current zoom factor after it has been fetched.
     * Parameter zoomFactor: The tab's current zoom factor.
     */
    export function getZoom(tabId: number, callback: (zoomFactor: number) => void): void;
    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
     * @since Chrome 42.
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     * @param callback Optional. Called after the zoom settings have been changed.
     */
    export function setZoomSettings(zoomSettings: ZoomSettings, callback?: () => void): void;
    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
     * @since Chrome 42.
     * @param tabId Optional. The ID of the tab to change the zoom settings for; defaults to the active tab of the current window.
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     * @param callback Optional. Called after the zoom settings have been changed.
     */
    export function setZoomSettings(tabId: number, zoomSettings: ZoomSettings, callback?: () => void): void;
    /**
     * Gets the current zoom settings of a specified tab.
     * @since Chrome 42.
     * @param callback Called with the tab's current zoom settings.
     * Paramater zoomSettings: The tab's current zoom settings.
     */
    export function getZoomSettings(callback: (zoomSettings: ZoomSettings) => void): void;
    /**
     * Gets the current zoom settings of a specified tab.
     * @since Chrome 42.
     * @param tabId Optional. The ID of the tab to get the current zoom settings from; defaults to the active tab of the current window.
     * @param callback Called with the tab's current zoom settings.
     * Paramater zoomSettings: The tab's current zoom settings.
     */
    export function getZoomSettings(tabId: number, callback: (zoomSettings: ZoomSettings) => void): void;

    /**
     * Fired when the highlighted or selected tabs in a window changes.
     * @since Chrome 18.
     */
    var onHighlighted: TabHighlightedEvent;
    /** Fired when a tab is closed. */
    var onRemoved: TabRemovedEvent;
    /** Fired when a tab is updated. */
    var onUpdated: TabUpdatedEvent;
    /** Fired when a tab is attached to a window, for example because it was moved between windows. */
    var onAttached: TabAttachedEvent;
    /**
     * Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response. This event is not fired when a tab is moved between windows. For that, see tabs.onDetached.
     */
    var onMoved: TabMovedEvent;
    /** Fired when a tab is detached from a window, for example because it is being moved between windows. */
    var onDetached: TabDetachedEvent;
    /** Fired when a tab is created. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set. */
    var onCreated: TabCreatedEvent;
    /**
     * Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set.
     * @since Chrome 18.
     */
    var onActivated: TabActivatedEvent;
    /**
     * Fired when a tab is replaced with another tab due to prerendering or instant.
     * @since Chrome 26.
     */
    var onReplaced: TabReplacedEvent;
    /**
     * @deprecated since Chrome 33. Please use tabs.onActivated.
     * Fires when the selected tab in a window changes.
     */
    var onSelectionChanged: TabSelectedEvent;
    /**
     * @deprecated since Chrome 33. Please use tabs.onActivated.
     * Fires when the selected tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to tabs.onUpdated events to be notified when a URL is set.
     */
    var onActiveChanged: TabSelectedEvent;
    /**
     * @deprecated since Chrome 33. Please use tabs.onHighlighted.
     * Fired when the highlighted or selected tabs in a window changes.
     */
    var onHighlightChanged: TabHighlightedEvent;
    /**
     * Fired when a tab is zoomed.
     * @since Chrome 38.
     */
    var onZoomChange: TabZoomChangeEvent;
}

declare namespace browser.test {
    var notifyFail: Function;
    var notifyPass: Function;
    var log: Function;
    var sendMessage: Function;
    var fail: Function;
    var succeed: Function;
    var assertTrue: Function;
    var assertFalse: Function;
    var assertEq: Function;
    var onMessage: {
        addListener: Function;
        removeListener: Function;
        hasListener: Function;
    }
}

////////////////////
// Windows
////////////////////
/**
 * Use the browser.windows API to interact with browser windows. You can use this API to create, modify, and rearrange windows in the browser.
 * Permissions: The browser.windows API can be used without declaring any permission. However, the "tabs" permission is required in order to populate the url, title, and favIconUrl properties of Tab objects.
 * @since Chrome 5.
 */
declare namespace browser.windows {
    interface Window {
        /** Array of tabs.Tab objects representing the current tabs in the window. */
        tabs?: browser.tabs.Tab[];
        /** Optional. The offset of the window from the top edge of the screen in pixels. Under some circumstances a Window may not be assigned top property, for example when querying closed windows from the sessions API. */
        top?: number;
        /** Optional. The height of the window, including the frame, in pixels. Under some circumstances a Window may not be assigned height property, for example when querying closed windows from the sessions API. */
        height?: number;
        /** Optional. The width of the window, including the frame, in pixels. Under some circumstances a Window may not be assigned width property, for example when querying closed windows from the sessions API. */
        width?: number;
        /**
         * The state of this browser window.
         * One of: "normal", "minimized", "maximized", "fullscreen", or "docked"
         * @since Chrome 17.
         */
        state: string;
        /** Whether the window is currently the focused window. */
        focused: boolean;
        /**
         * Whether the window is set to be always on top.
         * @since Chrome 19.
         */
        alwaysOnTop: boolean;
        /** Whether the window is incognito. */
        incognito: boolean;
        /**
         * The type of browser window this is.
         * One of: "normal", "popup", "panel", "app", or "devtools"
         */
        type: string;
        /** Optional. The ID of the window. Window IDs are unique within a browser session. Under some circumstances a Window may not be assigned an ID, for example when querying windows using the sessions API, in which case a session ID may be present. */
        id: number;
        /** Optional. The offset of the window from the left edge of the screen in pixels. Under some circumstances a Window may not be assigned left property, for example when querying closed windows from the sessions API. */
        left?: number;
        /**
         * The session ID used to uniquely identify a Window obtained from the sessions API.
         * @since Chrome 31.
         */
        sessionId?: string;
    }

    interface GetInfo {
        /**
         * Optional.
         * If true, the windows.Window object will have a tabs property that contains a list of the tabs.Tab objects. The Tab objects only contain the url, title and favIconUrl properties if the extension's manifest file includes the "tabs" permission.
         */
        populate?: boolean;
        /**
         * If set, the windows.Window returned will be filtered based on its type. If unset the default filter is set to ['app', 'normal', 'panel', 'popup'], with 'app' and 'panel' window types limited to the extension's own windows.
         * Each one of: "normal", "popup", "panel", "app", or "devtools"
         * @since Chrome 46. Warning: this is the current Beta channel.
         */
        windowTypes?: string[];
    }

    interface CreateData {
        /**
         * Optional. The id of the tab for which you want to adopt to the new window.
         * @since Chrome 10.
         */
        tabId?: number;
        /**
         * Optional.
         * A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page.
         */
        url?: string | string[];
        /**
         * Optional.
         * The number of pixels to position the new window from the top edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        top?: number;
        /**
         * Optional.
         * The height in pixels of the new window, including the frame. If not specified defaults to a natural height.
         */
        height?: number;
        /**
         * Optional.
         * The width in pixels of the new window, including the frame. If not specified defaults to a natural width.
         */
        width?: number;
        /**
         * Optional. If true, opens an active window. If false, opens an inactive window.
         * @since Chrome 12.
         */
        focused?: boolean;
        /** Optional. Whether the new window should be an incognito window. */
        incognito?: boolean;
        /**
         * Optional. Specifies what type of browser window to create. The 'panel' and 'detached_panel' types create a popup unless the '--enable-panels' flag is set.
         * One of: "normal", "popup", "panel", or "detached_panel"
         */
        type?: string;
        /**
         * Optional.
         * The number of pixels to position the new window from the left edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        left?: number;
        /**
         * Optional. The initial state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'.
         * One of: "normal", "minimized", "maximized", "fullscreen", or "docked"
         * @since Chrome 44.
         */
        state?: string;
    }

    interface UpdateInfo {
        /** Optional. The offset from the top edge of the screen to move the window to in pixels. This value is ignored for panels. */
        top?: number;
        /**
         * Optional. If true, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to false to cancel a previous draw attention request.
         * @since Chrome 14.
         */
        drawAttention?: boolean;
        /** Optional. The height to resize the window to in pixels. This value is ignored for panels. */
        height?: number;
        /** Optional. The width to resize the window to in pixels. This value is ignored for panels. */
        width?: number;
        /**
         * Optional. The new state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'.
         * One of: "normal", "minimized", "maximized", "fullscreen", or "docked"
         * @since Chrome 17.
         */
        state?: string;
        /**
         * Optional. If true, brings the window to the front. If false, brings the next window in the z-order to the front.
         * @since Chrome 8.
         */
        focused?: boolean;
        /** Optional. The offset from the left edge of the screen to move the window to in pixels. This value is ignored for panels. */
        left?: number;
    }

    interface WindowEventFilter {
        /**
         * Conditions that the window's type being created must satisfy. By default it will satisfy ['app', 'normal', 'panel', 'popup'], with 'app' and 'panel' window types limited to the extension's own windows.
         * Each one of: "normal", "popup", "panel", "app", or "devtools"
         */
        windowTypes: string[];
    }

    interface WindowIdEvent extends browser.events.Event<(windowId: number, filters?: WindowEventFilter) => void> {}

    interface WindowReferenceEvent extends browser.events.Event<(window: Window, filters?: WindowEventFilter) => void> {}

    /**
     * The windowId value that represents the current window.
     * @since Chrome 18.
     */
    var WINDOW_ID_CURRENT: number;
    /**
     * The windowId value that represents the absence of a browser browser window.
     * @since Chrome 6.
     */
    var WINDOW_ID_NONE: number;

    /** Gets details about a window. */
    export function get(windowId: number, callback: (window: browser.windows.Window) => void): void;
    /**
     * Gets details about a window.
     * @since Chrome 18.
     */
    export function get(windowId: number, getInfo: GetInfo, callback: (window: browser.windows.Window) => void): void;
    /**
     * Gets the current window.
     */
    export function getCurrent(callback: (window: browser.windows.Window) => void): void;
    /**
     * Gets the current window.
     * @since Chrome 18.
     */
    export function getCurrent(getInfo: GetInfo, callback: (window: browser.windows.Window) => void): void;
    /**
     * Creates (opens) a new browser with any optional sizing, position or default URL provided.
     * @param callback
     * Optional parameter window: Contains details about the created window.
     */
    export function create(callback?: (window?: browser.windows.Window) => void): void;
    /**
     * Creates (opens) a new browser with any optional sizing, position or default URL provided.
     * @param callback
     * Optional parameter window: Contains details about the created window.
     */
    export function create(createData: CreateData, callback?: (window?: browser.windows.Window) => void): void;
    /**
     * Gets all windows.
     */
    export function getAll(callback: (windows: browser.windows.Window[]) => void): void;
    /**
     * Gets all windows.
     * @since Chrome 18.
     */
    export function getAll(getInfo: GetInfo, callback: (windows: browser.windows.Window[]) => void): void;
    /** Updates the properties of a window. Specify only the properties that you want to change; unspecified properties will be left unchanged. */
    export function update(windowId: number, updateInfo: UpdateInfo, callback?: (window: browser.windows.Window) => void): void;
    /** Removes (closes) a window, and all the tabs inside it. */
    export function remove(windowId: number, callback?: Function): void;
    /**
     * Gets the window that was most recently focused — typically the window 'on top'.
     */
    export function getLastFocused(callback: (window: browser.windows.Window) => void): void;
    /**
     * Gets the window that was most recently focused — typically the window 'on top'.
     * @since Chrome 18.
     */
    export function getLastFocused(getInfo: GetInfo, callback: (window: browser.windows.Window) => void): void;

    /** Fired when a window is removed (closed). */
    var onRemoved: WindowIdEvent;
    /** Fired when a window is created. */
    var onCreated: WindowReferenceEvent;
    /**
     * Fired when the currently focused window changes. Will be browser.windows.WINDOW_ID_NONE if all browser windows have lost focus.
     * Note: On some Linux window managers, WINDOW_ID_NONE will always be sent immediately preceding a switch from one browser window to another.
     */
    var onFocusChanged: WindowIdEvent;
}
