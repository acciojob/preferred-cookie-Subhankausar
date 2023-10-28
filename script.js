// Function to set a cookie with a specified expiration date
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

// Function to apply user preferences from cookies
function applyUserPreferences() {
  const fontsize = getCookie("fontsize");
  const fontcolor = getCookie("fontcolor");

  if (fontsize) {
    document.documentElement.style.setProperty("--fontsize", fontsize);
    document.getElementById("fontsize").value = fontsize.replace("px", "");
  }
  if (fontcolor) {
    document.documentElement.style.setProperty("--fontcolor", fontcolor);
    document.getElementById("fontcolor").value = fontcolor;
  }
}

// Event listener for the form submission
document.getElementById("preferences-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const fontsizeValue = document.getElementById("fontsize").value + "px";
  const fontcolorValue = document.getElementById("fontcolor").value;

  // Set the cookie with user preferences
  setCookie("fontsize", fontsizeValue, 30); // Expires in 30 days
  setCookie("fontcolor", fontcolorValue, 30);

  // Apply user preferences
  applyUserPreferences();
});

// Apply user preferences on page load
window.onload = function () {
  applyUserPreferences();
};
