import { retrieveCookies } from './retrieve-cookies';

export const checkCookieExists = (name, return_val) => {
    const get_cookies = retrieveCookies();

    let cookie_found = false;

    console && console.log('checkCookieExists: Running...');

    let cookieVal;

    for (let i = get_cookies.length; i--;) {
        if (!!get_cookies[i]) {
            const [key, val] = get_cookies[i];

            if (!name.includes('*') && key === name) {
                cookieVal = val;
                cookie_found = true;
                break;
            }
            else if (name.includes('*') && key.startsWith(name)) {
                cookieVal = val;
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

        return cookieVal;
    }
};
