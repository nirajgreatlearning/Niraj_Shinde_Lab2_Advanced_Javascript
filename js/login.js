function login() {
    let username = document.getElementById('user-input').value;
    let password = document.getElementById('password-input').value;
    if (username === 'admin' && password === 'admin') {
        // Storing username & password in localStorage, overriding them if they exist
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('password', password);
        window.location = 'Resume.html';
    } else {
        document.getElementById('invalid-login').style.display = 'block';
        document.getElementById('user-input').value = ''
        document.getElementById('password-input').value = '';
    }
}

window.history.forward();
function noBack() {
    window.history.forward();
}
