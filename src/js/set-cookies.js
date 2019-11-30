import { checkCookieExists } from './check-cookie-exists';

export const setCookie = (name, value, exp, options) => {

    console && console.log('setCookie: Running...');

    if (!name || !value) {
        console && console.error('setCookie: ERROR! - no name or value provided. Terminating...');
        return null;
    }
    else {
        const expiry = new Date();
        const nm = encodeURIComponent(sanitiseString(name));
        const val = encodeURIComponent(sanitiseString(value));

        let new_cookie = nm + '=' + val;	// need to escape the cookie value

        console && console.log('setCookie: exp value is : ' + exp);

        if (exp) {
            console && console.log('setCookie: Preparing expiry date...');

            expiry.setDate(expiry.getDate() + exp);
            expiry = expiry.toUTCString();

            new_cookie += ';expires=' + expiry;
        }

        // other options
        if (options && options.constructor === Object) {
            // use keys instead?
            for (const i in options) {
                if (options.hasOwnProperty(i)) {
                    new_cookie += ';' + i + '=' + options[i];
                }
            };
        }

        document.cookie = new_cookie;

        // confirm cookie exists
        if (!checkCookieExists(name)) {
            console && console.error('setCookie: ERROR! Cookie was not set or could not be set correctly...');
        }
    }
    console && console.log('setCookie: DONE!');
};