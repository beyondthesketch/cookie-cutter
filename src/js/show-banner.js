import { setCookie } from './set-cookies.js';
import { purgeCookies } from './purge-cookies.js';
import { checkCookieExists } from './check-cookie-exists.js';

const cookieName = 'btsCookieControl';

export const showBanner = (
    link,
    linkText = 'Find out more',
    text = 'This site uses cookies and similar technologies to help make it work better. By continuing, you agree to our cookie policy',
    confirmText = 'Accept',
    declineText = 'No, thanks',
    title,
) => {
    if (!link || checkCookieExists(cookieName)) {
        return false;
    }
    const bannerBody = document.createElement('article');
    const bannerTitle = document.createElement('h1');
    const textP = document.createElement('p');
    const acceptBttn = document.createElement('button');
    acceptBttn.textContent = confirmText;
    acceptBttn.addEventListener('click', () => setCookie(cookieName, 'true', 365));
    const declineBttn = document.createElement('button');
    declineBttn.textContent = declineText;
    declineBttn.addEventListener('click', purgeCookies);

    const linkA = document.createElement('a');

    linkA.textContent = linkText;

    if (!!title) {
        bannerTitle.textContent = title;
        bannerBody.appendChild(bannerTitle);
    }
    textP.textContent = text;
    bannerBody.appendChild(textP);

    bannerBody.appendChild(acceptBttn);

    document.body.appendChild(bannerBody);
};