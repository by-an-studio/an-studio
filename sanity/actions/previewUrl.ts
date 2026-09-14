// Maps each document type that can be previewed to the path it renders at
// on the live site. Singletons resolve to a fixed path; "project" resolves
// via its slug. Locale prefixing (next-intl "as-needed": "en" has no
// prefix, "es" is prefixed with /es) is applied on top of this.
export function getPreviewPath(doc: { _type: string; slug?: { current?: string } }): string | null {
  switch (doc._type) {
    case "home":
      return "/";
    case "about":
      return "/about";
    case "services":
      return "/services";
    case "workPage":
      return "/work";
    case "shop":
      return "/shop";
    case "privacyPolicy":
      return "/privacy-policy";
    case "clientApplication":
      return "/client-application";
    case "project":
      return doc.slug?.current ? `/work/${doc.slug.current}` : null;
    default:
      return null;
  }
}

export function withLocale(path: string, locale: "en" | "es"): string {
  if (locale === "en") return path;
  return path === "/" ? "/es" : `/es${path}`;
}
