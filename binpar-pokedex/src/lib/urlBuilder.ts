
export class URLBuilder {
  private readonly base: string;

  constructor(base: string) {
    if (!base) {
      throw new Error("URLBuilder base URL is empty");
    }
    if (!/^https?:\/\//.test(base)) {
      throw new Error(
        `URLBuilder base URL must be absolute (include http/https). Received: "${base}"`,
      );
    }

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

    return `${this.base}${clean.length ? "/" + clean.join("/") : ""}`;
  };

  withQuery = (
    segments: (string | number | null | undefined)[],
    query?: Record<
      string,
      string | number | boolean | null | undefined
    >,
  ): string => {
    const basePath = this.path(...segments);

    if (!query) return basePath;

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(typeof value === "number" && Number.isNaN(value))
      ) {
        params.append(key, String(value));
      }
    }

    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };
}
