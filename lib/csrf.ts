import { nextCsrf } from "next-csrf";

export const { csrf, setup } = nextCsrf({
  secret: process.env.CSRF_SECRET!,
  csrfErrorMessage: "CSRF token is invalid",
  tokenKey: "XSRF-TOKEN",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  },
});
