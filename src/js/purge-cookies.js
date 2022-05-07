import { retrieveCookies } from './retrieve-cookies.js';
import { deleteCookie } from './delete-cookie.js';

export const purgeCookies = (path) => {
    const all_cookies = retrieveCookies();
    const no_of_cookies = all_cookies.length;
    let no_deleted = 0;

    console && console.log('purgeCookies: Running...');

    for (let i = no_of_cookies; i--;) {
        if (!!all_cookies[i]) { // if true
            const [key, val] = all_cookies[i];
            deleteCookie(key, (path && (typeof path === 'string') && (path !== '/')) ? { path } : undefined);

            no_deleted += 1;
        }
    }

    console && console.log('purgeCookies: ' + no_deleted + ' cookies deleted...');

    // confirm cookies have been deleted
    if (!document.cookie) {
        console && console.log('purgeCookies: all cookies have been successfully deleted...');
    }
    else {
        console && console.error('purgeCookies: ERROR! Some cookies could not be deleted...');
    }

    console && console.log('purgeCookies: DONE!');
};