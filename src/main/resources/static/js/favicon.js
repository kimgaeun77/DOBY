const favicon = document.querySelector('#favicon');
const faviconPath = `/favicon/`;
const faviconFileName = [`1.svg`, `2.svg`, `3.svg`, `4.svg`, `5.svg`];

let index = 0;

const change = () => {
    favicon.setAttribute('href', faviconPath + faviconFileName[index++]);
    index %= faviconFileName.length;
}

setInterval(change, 500);

