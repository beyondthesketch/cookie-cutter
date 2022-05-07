export const retrieveCookies = () => {
    const raw_cookies = document.cookie.split(';');
    const retrieved_cookies = [];

    console && console.log('retrieveCookies: Running...');

    for (let i = raw_cookies.length; i--;) {
        if (!!raw_cookies[i]) { // if true
            // const tmp = raw_cookies[i].replace(/\s/g, '');	// remove spaces from the cookie - is this needed?
            const tmpCookie = raw_cookies[i].trim().split('=');
            retrieved_cookies.push([tmpCookie[0], decodeURIComponent(tmpCookie[1])]);
        }
    }

    console && console.log('retrieveCookies: DONE!');

    return retrieved_cookies;
};