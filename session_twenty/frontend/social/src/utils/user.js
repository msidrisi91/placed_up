// TODO: Check if the user already exist before registering
// TODO: Chack if there is any error in login (Maybe because of wrong password)

function finalize(user) {
  localStorage.addItem("user", JSON.stringify(user));
  window.location.href = "/feeds";
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function register(fullname, email, username, password) {
  const user = fetch("https://localhost:5000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname: fullname,
      email: email,
      username: username,
      password: password,
    }),
  });
  finalize(user);
}

function login(email, password) {
  const user = fetch("https://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  finalize(user);
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "/login";
}
