import { Cookie } from "../../../dist/next-cookie";

const COOKIE_KEY = "test_cookie";

export default function handler(req, res) {
  const cookie = Cookie.fromApiRoute(req, res);
  const cookieVal = cookie.get(COOKIE_KEY);
  if (cookieVal) {
    res.status(200).json({ priorCookieValue: cookie.get(COOKIE_KEY) });
  } else {
    cookie.set(COOKIE_KEY, req.query["cook"] || "Cookie Value");
    res
      .status(200)
      .json({ priorCookieValue: cookie.get(COOKIE_KEY), justSet: true });
  }
}
