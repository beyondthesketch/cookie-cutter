import { setCookie } from './set-cookies.js';
import { purgeCookies } from './purge-cookies.js';
import { checkCookieExists } from './check-cookie-exists.js';

const cookieName = 'btsCookieControl';

export const showBanner = (
    settings = {}
) => {
    const {
        link,
        linkText = 'Find out more',
        text = 'This site uses cookies and similar technologies to help make it work better. By continuing, you agree to our cookie policy',
        confirmText = 'Accept',
        declineText = 'No, thanks',
        title = 'Use of cookies',
        necessaryCookiesTitle = 'Necessary Cookies',
        necessaryCookiesText = 'These cookies are required to enable core functionality such as security, network management and accessibility. You may disable these by changing your browser settings. Disabling these cookies may prevent use of the website\'s full functionality',
        optionalCookies
    } = settings;

    if (!link || checkCookieExists(cookieName)) {
        return false;
    }
    const bannerBody = document.createElement('aside');
    const bannerTitle = document.createElement('h1');
    const textP = document.createElement('p');

    if (!!title) {
        bannerTitle.textContent = title;
        bannerBody.appendChild(bannerTitle);
    }
    textP.textContent = text;
    bannerBody.appendChild(textP);

    const linkA = document.createElement('a');
    linkA.textContent = linkText;
    bannerBody.appendChild(linkA);

    if (necessaryCookiesTitle && necessaryCookiesText) {
        const requiredCookieContainer = document.createElement('div');

        const requiredCookieTitle = document.createElement('h2');
        requiredCookieTitle.textContent = necessaryCookiesTitle;
        requiredCookieContainer.appendChild(requiredCookieTitle);

        const requiredCookieText = document.createElement('p');
        requiredCookieText.textContent = necessaryCookiesText;
        requiredCookieContainer.appendChild(requiredCookieText);

        bannerBody.appendChild(requiredCookieContainer);
    }


    const acceptBttn = document.createElement('button');
    acceptBttn.textContent = confirmText;
    acceptBttn.addEventListener('click', () => setCookie(cookieName, 'true', 365));
    bannerBody.appendChild(acceptBttn);

    const declineBttn = document.createElement('button');
    declineBttn.textContent = declineText;
    declineBttn.addEventListener('click', purgeCookies);
    bannerBody.appendChild(declineBttn);

    document.body.appendChild(bannerBody);
};