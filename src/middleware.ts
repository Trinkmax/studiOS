import { NextResponse, type NextRequest } from "next/server";

const LOCALE_COOKIE = "studios_locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

type Locale = "es" | "en";

function pickFromAcceptLanguage(header: string | null): Locale {
  if (!header) return "en";
  // First preferred language only — matches what the browser is set to.
  const first = header.split(",")[0]?.trim().toLowerCase() ?? "";
  const primary = first.split(";")[0]?.trim();
  if (!primary) return "en";
  if (primary.startsWith("es")) return "es";
  return "en";
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Only redirect the root "/" based on language.
  // Subpaths (including /en, /check-in, /panel, etc.) are not touched here.
  if (pathname !== "/") return NextResponse.next();

  const override = req.cookies.get(LOCALE_COOKIE)?.value as
    | Locale
    | undefined;

  const desired: Locale =
    override === "es" || override === "en"
      ? override
      : pickFromAcceptLanguage(req.headers.get("accept-language"));

  if (desired === "en") {
    const url = req.nextUrl.clone();
    url.pathname = "/en";
    const res = NextResponse.redirect(url);
    // Persist so we don't re-evaluate on every visit.
    if (!override) {
      res.cookies.set(LOCALE_COOKIE, "en", {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
        sameSite: "lax",
      });
    }
    return res;
  }

  // Spanish: keep path, set cookie if not present so future visits skip detection.
  const res = NextResponse.next();
  if (!override) {
    res.cookies.set(LOCALE_COOKIE, "es", {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }
  return res;
}

export const config = {
  // Only run middleware on the root. Exclude Next internals, static files,
  // API routes, and known sub-routes.
  matcher: ["/"],
};
