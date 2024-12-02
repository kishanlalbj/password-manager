export const parseCookies = (cookieStr) => {
  return cookieStr.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key.trim()] = decodeURIComponent(value);
    return acc;
  }, {});
};
