export const parseCookies = (cookieStr) => {
  if (!cookieStr) return null;
  return cookieStr.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key.trim()] = decodeURIComponent(value);
    return acc;
  }, {});
};
