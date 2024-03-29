import { checkCookieExists } from './check-cookie-exists';

export const setCookie = (name, value, exp, options) => {

    console && console.log('setCookie: Running...');

    if (!name || !value) {
        console && console.error('setCookie: ERROR! - no name or value provided. Terminating...');
        return null;
    }
    else {
        const expiry = new Date();
        const nm = encodeURIComponent(name);
        const val = encodeURIComponent(value);

        let new_cookie = nm + '=' + val;	// need to escape the cookie value

        console && console.log('setCookie: exp value is : ' + exp);

        if (exp) {
            console && console.log('setCookie: Preparing expiry date...');

            expiry.setDate(expiry.getDate() + exp);

            new_cookie += ';expires=' + expiry.toUTCString();
        }

        if (options && options.constructor === Object) {
            // use keys instead?
            for (const i in options) {
                if (options.hasOwnProperty(i) && i !== 'secure') {
                    new_cookie += ';' + i + '=' + options[i];
                }
            };
        }
        if (!options || options && options.secure !== false) {
            location.protocol === 'https:' && (new_cookie += ';secure')
        }
        // (!options || (options && options.secure !== false)) && location.protocol === 'https:' && (new_cookie += ';secure');

        document.cookie = new_cookie;

        // confirm cookie exists
        if (!options || options && options.path && (options.path === location.pathname) || options && options.domain && (options.domain === location.hostname)) {
            if (!checkCookieExists(name)) {
                console && console.error('setCookie: ERROR! Cookie was not set or could not be set correctly...');
            }
        }
        else {
            console && console.log('setCookie: Cookie was set on a different domain or path; could not confirm it was set');
        }
    }
    console && console.log('setCookie: DONE!');
};