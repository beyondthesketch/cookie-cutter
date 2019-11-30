import { checkCookieExists } from './check-cookie-exists';

export const deleteCookie = (name) => {
    const expire_now = new Date();

    if (!name) {
        console && console.log('deleteCookie: ERROR! - no cookie name provided. Terminating...');
        return null;
    }
    else {
        expire_now.setDate(expire_now.getDate() - 365);
        expire_now = expire_now.toUTCString();

        document.cookie = name + '=null;expires=' + expire_now;

        console && console.log('deleteCookie: Cookie deletion in progress...');

        // confirm cookie is gone!
        if (checkCookieExists(name)) {
            console && console.error('deleteCookie: ERROR! Cookie could not be deleted...');
        }
        else {
            console && console.log('deleteCookie: Cookie not found - successfully deleted...');
        }
    }
    console && console.log('deleteCookie: DONE!');
};