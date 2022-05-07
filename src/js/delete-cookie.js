import { checkCookieExists } from './check-cookie-exists';
import { retrieveCookies } from './retrieve-cookies';

export const deleteCookie = (name, options) => {
    const expire_now = new Date();

    if (!name) {
        console && console.log('deleteCookie: ERROR! - no cookie name provided. Terminating...');
        return null;
    }
    else {
        const allCookies = retrieveCookies();
        let cookieName;


        if (!name.includes('*')) {
            console.log('Exact name match');
            cookieName = allCookies.find(
                (cookie) => cookie[0] === name
                );
            }
        else if (name.includes('*')) {
            console.log('Non-Exact name match');
            cookieName = allCookies.find(
                (cookie) => cookie[0].startsWith(name.slice(0, name.indexOf('*')))
            );
        }

        if (cookieName) {
            expire_now.setDate(expire_now.getDate() - 365);
    
            let new_cookie = cookieName[0] + '=null;expires=' + expire_now.toUTCString();
    
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
    
            console && console.log('deleteCookie: Cookie ' + cookieName[0] + ' deletion in progress...');
    
            document.cookie = new_cookie;
    
            // confirm cookie is gone! - NOT WORKING
            if (options && options.path && (options.path === location.pathname) || options && options.domain && (options.domain === location.hostname)) {
                if (checkCookieExists(cookieName)) {
                    console && console.error('deleteCookie: ERROR! Cookie could not be deleted...');
                }
                else {
                    console && console.log('deleteCookie: Cookie not found - successfully deleted...');
                }
            }
        }
    }
    console && console.log('deleteCookie: DONE!');
};