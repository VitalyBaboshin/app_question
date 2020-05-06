export function getAuthForm() {
    return `
        <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email">
                <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label"">
                <input type="password" id="password">
                <label for="password">Пароль</label>
            </div>
            <button
                 type="submit"
                 class="mui-btn mui-btn--raised mui-btn--primary"
            >
                Войти
            </button>
        </form>
    `
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyB5ZyB_LIRMNrcbMUY0eXDiGjcxJc0ft-E';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            loginAddToLocalStorage(data.email, data.localId);
            return data.idToken;
        });
}

export function renderNameLogin() {

    const textLogin = getEmailAndIdFromLocalStorage();

    const html = isEmptyObject(textLogin)
    ? '<p class="error">Вы не авторизовались</p>'
    :  `<div>${textLogin.email}</div>
        <button class="mui-btn mui-btn--flat mui-btn--primary textLoginBtn">Выйти</button>` ;

    console.log(html);
    const list = document.getElementById('login-name');
    list.innerHTML = html;

    if (!isEmptyObject(textLogin)) {
        const el = list.querySelector('textLoginBtn');
        console.log(el);
        if (el) {
            el.addEventListener('click', () => {
                localStorage.removeItem('emailAdnLogin');
            }, {once: true});
        }
    }
}

function loginAddToLocalStorage(email, localId) {
    const obj = {
        email,
        localId
    };
    localStorage.setItem('emailAdnLogin', JSON.stringify(obj));
}

function getEmailAndIdFromLocalStorage() {
    return JSON.parse(localStorage.getItem('emailAdnLogin') || '[]');
}

function isEmptyObject(obj) {
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}
