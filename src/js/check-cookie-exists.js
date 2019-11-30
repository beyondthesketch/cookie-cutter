import { retrieveCookies } from './retrieve-cookies';

export const checkCookieExists = (name, return_val) => {
    const get_cookies = retrieveCookies();

    let cookie_found = false;

    console && console.log('checkCookieExists: Running...');

    for (let i = get_cookies.length; i--;) {
        if (!!get_cookies[i]) { // if true
            if (get_cookies[i].substring(0, get_cookies[i].indexOf('=')) === name) {
                cookie_found = true;
                break;
            }
        }
    }

    if (!cookie_found && !return_val) {
        console && console.log('checkCookieExists: DONE!');
        return false;
    }
    else if (!cookie_found && return_val) {
        console && console.log('checkCookieExists: DONE!');
        return undefined;
    }
    else if (cookie_found && !return_val) {
        console && console.log('checkCookieExists: Cookie found...DONE!');
        return true;
    }
    else if (cookie_found && (return_val === true)) {
        console && console.log('checkCookieExists: Cookie found. Returning the value...DONE!');

        return get_cookies[i].slice((get_cookies[i].indexOf('=')) + 1);
    }
};