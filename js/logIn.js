const writeAccountData = (event) => {
  event.preventDefault();
  const userEmail = document.querySelector('#inputEmail2');
  const userPassword = document.querySelector('#inputPassword2');

  localStorage.setItem("user-email", userEmail.value);
  localStorage.setItem("user-password", userPassword.value);

  setTimeout(() => {
    alert('Account created!')
    alert('Redirection to login page')
    window.location.href = "./login-page.html";
    localStorage.setItem("session-key", generatePassword());
  }, 1000);

}

const checkLogin = (event) => {
  event.preventDefault();
  const emailStore = localStorage.getItem("user-email");
  const passwordStore = localStorage.getItem("user-password");

  const userEmail = document.querySelector('#inputEmail1');
  const userPassword = document.querySelector('#inputPassword1');

  if (userEmail.value === emailStore && userPassword.value === passwordStore) {
    alert('OK');
    window.location.href = "./index.html";
    localStorage.setItem("session-key", generatePassword());
  } else {
    alert('Not OK');
  }

}


const generatePassword = () => {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};


document.forms[0].addEventListener('submit', writeAccountData)
document.forms[0].addEventListener('submit', checkLogin)
