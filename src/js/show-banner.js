import { setCookie } from './set-cookies.js';
import { purgeCookies } from './purge-cookies.js';
import { checkCookieExists } from './check-cookie-exists.js';

const cookieName = 'btsCookies';

export const showBanner = (
    settings = {}
) => {
    const {
        link,
        linkText = 'Find out more',
        text = 'This site uses cookies and similar technologies to help make it work better. By continuing, you agree to our cookie policy',
        confirmText = 'Accept',
        declineText = 'Reject',
        title = 'Use of cookies',
        necessaryCookiesTitle,
        necessaryCookiesText = 'These cookies are required to enable core functionality such as security, network management and accessibility. You may disable these by changing your browser settings. Disabling these cookies may prevent use of the website\'s full functionality',
        optionalCookies
    } = settings;

    if (checkCookieExists(cookieName) || !link) {
        return false;
    }
    const bannerBody = document.createElement('aside');
    bannerBody.className = 'bts-cookie-banner';
    const bannerTitle = document.createElement('h1');
    bannerTitle.className = 'bts-cookie-banner__title';
    const textP = document.createElement('p');
    textP.className = 'bts-cookie-banner__text';

    if (!!title) {
        bannerTitle.textContent = title;
        bannerBody.appendChild(bannerTitle);
    }
    textP.textContent = text;
    bannerBody.appendChild(textP);

    const linkA = document.createElement('a');
    linkA.className = 'bts-cookie-banner__link';
    linkA.setAttribute('href', link);
    linkA.textContent = linkText;
    bannerBody.appendChild(linkA);

    if (necessaryCookiesTitle && necessaryCookiesText) {
        const requiredCookieContainer = document.createElement('div');
        requiredCookieContainer.className = 'bts-cookie-banner__req-cookies';

        const requiredCookieTitle = document.createElement('h2');
        requiredCookieTitle.className = 'bts-cookie-banner__req-cookies-title';
        requiredCookieTitle.textContent = necessaryCookiesTitle;
        requiredCookieContainer.appendChild(requiredCookieTitle);

        const requiredCookieText = document.createElement('p');
        requiredCookieText.className = 'bts-cookie-banner__req-cookies-text';
        requiredCookieText.textContent = necessaryCookiesText;
        requiredCookieContainer.appendChild(requiredCookieText);

        bannerBody.appendChild(requiredCookieContainer);
    }

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'bts-cookie-banner__buttons';


    const acceptBttn = document.createElement('button');
    acceptBttn.className = 'bts-cookie-banner__button m--accept-button';
    acceptBttn.textContent = confirmText;
    acceptBttn.addEventListener('click', () => setCookie(cookieName, 'true', 365));

    buttonWrapper.appendChild(acceptBttn);

    const declineBttn = document.createElement('button');
    declineBttn.className = 'bts-cookie-banner__button m--decline-button';
    declineBttn.textContent = declineText;
    declineBttn.addEventListener(
        'click', () => {
            purgeCookies();
            setCookie(
                cookieName,
                'false',
                365
            );
            document.body.removeChild(bannerBody);
        }
    );

    buttonWrapper.appendChild(declineBttn);

    bannerBody.appendChild(buttonWrapper);

    document.body.appendChild(bannerBody);

    return bannerBody;
};