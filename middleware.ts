import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create the middleware with the routing configuration
export default createMiddleware({
  ...routing,
  defaultLocale: "ar",
  // Enable locale detection
  localeDetection: true,
});

export const config = {
  matcher: [
    "/((?!api|_next|public|_vercel|.*\\.[^\\／]+$|studio).*)",
    // Match all localized pathnames
    "/(ar|en)/:path*",
  ],
};
