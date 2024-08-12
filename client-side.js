// Assuming you're making the request using fetch or XMLHttpRequest
fetch("/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username, password }),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.message === "dang nhap thanh cong") {
      // Set the token as a cookie
      document.cookie = `token=${data.token}; path=/`;
      // Redirect or do something else after successful login
    } else {
      // Handle login failure
    }
  })
  .catch((error) => {
    // Handle error
  });
