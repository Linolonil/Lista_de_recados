// CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const user = document.getElementById("user").value;
  const password = document.getElementById("senha").value;
  const passwordChecked = document.getElementById("senha-verificada").value;

  if (user.length < 5) {
    alert(" O usuário deve conter 5 digitos.");
    return;
  }

  if (password.length < 4) {
    alert("Preencha a senha com no mínimo 4 dígitos.");
    return;
  }
  if (password === passwordChecked) {
    saveAccount({
      login: user,
      password: password,
      transactions: [],
    });
    e.target.reset();
    alert("Conta criada com sucesso!");
  } else {
    alert("verifique os dados!");
  }
  window.location.href = "logar.html";
});

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
