const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");

// LOGAR NO SISTEMA
checkLogged();

document.getElementById("card-login").addEventListener("submit", function (e) {
  e.preventDefault();
  const user = document.getElementById("usuario-input").value;
  const password = document.getElementById("password-input").value;
  const checkSession = document.getElementById("session-check").checked;

  const account = getAccount(user);

  if (!account) {
    alert("Ops! Verifique o usuário ou senha.");
    return;
  }

  if (account) {
    if (account.password !== password) {
      alert("Ops! Verifique o usuário ou a senha");
      return;
    }

    saveSession(user, checkSession);

    window.location.href = "index.html";
  }
});
function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return "";
}
function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }

  sessionStorage.setItem("logged", data);
}
function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);

    window.location.href = "index.html";
  }
}
