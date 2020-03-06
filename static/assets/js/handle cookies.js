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
        let test = `${name}=[a-zA-Z0-9]*(;|$)`;
        let reg = new RegExp(test, '');
        let result = document.cookie.match(reg)[0];
        console.log(result);
        if(result[result.length-1] === ';'){
            result = result.slice(0, -1);
        }
        result = result.split('=');
        return result[1];
    }
    else return '';
}

function deleteCookie(name) {
    if(checkCookie(name)) {
        document.cookie = `${name}=; expires=${new Date(0).toUTCString}; path=/`
    }
}

function checkCookie(name) {
    let reg = new RegExp(`${name}=`, '');
    return reg.test(document.cookie);
}