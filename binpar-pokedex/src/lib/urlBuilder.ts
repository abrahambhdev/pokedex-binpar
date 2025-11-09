export class URLBuilder {
  private readonly base: string;

  constructor(base: string) {
    this.base = base.replace(/\/+$/, "");
  }

  path = (
    ...segments: (string | number | null | undefined)[]
  ): string => {
    const clean = segments
      .filter(
        (s): s is string | number => s !== null && s !== undefined,
      )
      .map((s) => String(s).replace(/^\/+|\/+$/g, ""));

    return `${this.base}/${clean.join("/")}`;
  };

  withQuery = (
    segments: (string | number | null | undefined)[],
    query?: Record<
      string,
      string | number | boolean | null | undefined
    >,
  ): string => {
    const url = new URL(this.path(...segments));

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          !(typeof value === "number" && Number.isNaN(value))
        ) {
          url.searchParams.append(key, String(value));
        }
      }
    }

    return url.toString();
  };
}
