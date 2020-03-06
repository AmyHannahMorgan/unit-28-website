function setCookie(name, value, expDays) {
    let expires = ''
    if(expDays !== undefined) {
        let d = new Date();
        d.setTime(d.getTime + (expDays * 24 * 60 * 60 * 1000));
        expires = `expires=${d.toUTCString()};`;
    }

    document.cookie = `${name}=${value};${expires}path=/`;
}

function getCookie(name) {
    if(checkCookie(name)) {
        let test = `${name}=.*;`;
        let reg = new RegExp(test, 'i');
        let result = document.cookie.match(reg);
        result.splice(result.length - 1, 1);
        result = result.split('=');
        return result[1];
    }
    else return '';
}

function checkCookie(name) {
    let reg = new RegExp(name, 'i');
    return reg.test(document.cookie);
}