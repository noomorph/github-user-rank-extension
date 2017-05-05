import {init} from './handler';

if (typeof chrome !== "undefined") {
    init(chrome);
} else if (typeof browser !== "undefined") {
    init(browser);
}
