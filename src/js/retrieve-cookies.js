export const retrieveCookies = () => {
    const raw_cookies = document.cookie.split(';');
    const retrieved_cookies = [];

    console && console.log('retrieveCookies: Running...');

    for (let i = raw_cookies.length; i--;) {
        if (!!raw_cookies[i]) { // if true
            const tmp = raw_cookies[i].replace(/\s/g, '');	// remove spaces from the cookie
            retrieved_cookies.push(decodeURIComponent(tmp));
        }
    }

    console && console.log('retrieveCookies: DONE!');

    return retrieved_cookies;
};