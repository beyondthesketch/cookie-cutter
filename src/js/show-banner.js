// import moveIn from '@beyondthesketch/scriptuccinojs/modules/fx/moveIn';

import { setCookie } from './set-cookies.js';
import { purgeCookies } from './purge-cookies.js';
import { checkCookieExists } from './check-cookie-exists.js';

const cookieName = 'btsCookieBanner';

export const showBanner = (
    settings = {}
) => {
    const {
        link,
        linkText = 'Find out more',
        text = 'This site uses cookies and similar technologies to help make it work better. By continuing, you agree to our cookie policy',
        confirmText = 'Accept all',
        declineText = 'Reject all',
        saveButtonText = 'Save settings',
        title = 'Use of cookies',
        manageFeature,
        manageText = 'Manage cookies',
        necessaryCookiesTitle,
        necessaryCookiesText = 'These cookies are required to enable core functionality such as security, network management and accessibility. You may disable these by changing your browser settings. Disabling these cookies may prevent use of the website\'s full functionality',
        optionalCookies
    } = settings;

    if (checkCookieExists(cookieName) || !link) {
        return false;
    }
    const bannerBody = document.createElement('aside');
    bannerBody.className = 'bts-cookie-banner';
    bannerBody.setAttribute('id', 'bts-cookie-banner');
    bannerBody.setAttribute('data-bts-cookie-banner', '');
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

    const manageDetails = document.createElement('details');
    manageDetails.className = 'bts-cookie-banner__manage';
    const manageSummary = document.createElement('summary');
    manageSummary.textContent = manageText;
    manageDetails.appendChild(manageSummary);

    bannerBody.appendChild(manageDetails);

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

        manageDetails.appendChild(requiredCookieContainer);
    }

    // TODO: These are categories of cookies which should include the cookies to set - not individual cookies
    if (manageFeature && optionalCookies && Array.isArray(optionalCookies) && optionalCookies.length) {
        const inputRefs = [];
        optionalCookies.forEach(
            (cookie) => {
                const {
                    title,
                    description,
                    cookieList
                } = cookie;

                const wrapper = document.createElement('div');
                wrapper.className = 'bts-cookie-banner__opt-cookies';
                const catTitle = document.createElement('h2');
                catTitle.className = 'bts-cookie-banner__opt-title';
                catTitle.textContent = title;
                wrapper.appendChild(catTitle);
                const catDesc = document.createElement('p');
                catDesc.className = 'bts-cookie-banner__opt-description';
                catDesc.textContent = description;
                wrapper.appendChild(catDesc);

                const catCheckbox = document.createElement('input');
                catCheckbox.className = 'bts-cookie-banner__opt-check';
                catCheckbox.setAttribute('type', 'checkbox');
                catCheckbox.setAttribute('data-id', title);
                wrapper.appendChild(catCheckbox);

                // ref the input
                inputRefs.push(catCheckbox);

                manageDetails.appendChild(wrapper);
            }
        );

        const saveButton = document.createElement('button');
        saveButton.className = 'bts-cookie-banner__button m--save-settings-button';
        saveButton.textContent = saveButtonText;

        saveButton.addEventListener(
            'click',
            () => {
                let cookiesOn = false;
                const payload = inputRefs.map((element) => {
                    if (cookiesOn === false && element.checked) {
                        cookiesOn = true;
                    }
                    return [element.dataset.id, element.checked];
                });

                setCookie(
                    cookieName,
                    cookiesOn ? JSON.stringify({c:1, d: Date.now()}) : '0',
                    90
                );

                const saveCookiesEvent = new CustomEvent('savecookies', {
                    detail: {
                        config: payload,
                    }
                });
                document.dispatchEvent(saveCookiesEvent);
                document.body.removeChild(document.getElementById('bts-cookie-banner'));
            }
        );

        manageDetails.appendChild(saveButton);
    }

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'bts-cookie-banner__buttons';


    const acceptBttn = document.createElement('button');
    acceptBttn.className = 'bts-cookie-banner__button m--accept-button';
    acceptBttn.textContent = confirmText;
    acceptBttn.addEventListener(
        'click',
        () => {
            setCookie(
                cookieName,
                JSON.stringify({c:1, d: Date.now()}),
                90
            );
            const acceptAllEvent = new CustomEvent('acceptcookies');
            document.dispatchEvent(acceptAllEvent);
            document.body.removeChild(document.getElementById('bts-cookie-banner'));
        }
    );

    buttonWrapper.appendChild(acceptBttn);

    const declineBttn = document.createElement('button');
    declineBttn.className = 'bts-cookie-banner__button m--decline-button';
    declineBttn.textContent = declineText;
    declineBttn.addEventListener(
        'click', () => {
            purgeCookies();
            setCookie(
                cookieName,
                '0',
                90
            );
            const declineAllEvent = new CustomEvent('declinecookies');
            document.dispatchEvent(declineAllEvent);
            document.body.removeChild(document.getElementById('bts-cookie-banner'));
        }
    );

    buttonWrapper.appendChild(declineBttn);

    bannerBody.appendChild(buttonWrapper);

    document.body.appendChild(bannerBody);

    return bannerBody;
};