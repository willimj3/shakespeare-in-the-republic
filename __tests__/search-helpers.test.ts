import { describe, expect, it } from "vitest";
import {
  buildSearchHref,
  isSortBy,
  kwicUrl,
  SORT_OPTIONS,
} from "@/lib/search-helpers";

const empty = {
  q: "",
  authors: [] as string[],
  yearMin: "",
  yearMax: "",
  docType: "",
  sort: "relevance" as const,
  page: 0,
};

describe("buildSearchHref", () => {
  it("returns the bare /search path when nothing is set", () => {
    expect(buildSearchHref(empty)).toBe("/search");
  });

  it("encodes the query in ?q=", () => {
    expect(buildSearchHref({ ...empty, q: "honour" })).toBe(
      "/search?q=honour",
    );
  });

  it("url-encodes phrase queries with quotes and spaces", () => {
    expect(
      buildSearchHref({ ...empty, q: '"body politic"' }),
    ).toBe('/search?q=%22body+politic%22');
  });

  it("joins multiple authors with commas in ?authors=", () => {
    expect(
      buildSearchHref({
        ...empty,
        q: "honour",
        authors: ["adams", "franklin"],
      }),
    ).toBe("/search?q=honour&authors=adams%2Cfranklin");
  });

  it("includes ?from= and ?to= when year range is set", () => {
    expect(
      buildSearchHref({
        ...empty,
        q: "honour",
        yearMin: "1776",
        yearMax: "1820",
      }),
    ).toBe("/search?q=honour&from=1776&to=1820");
  });

  it("elides the default sort but includes non-default ones", () => {
    expect(buildSearchHref({ ...empty, q: "honour" })).not.toContain("sort=");
    expect(
      buildSearchHref({ ...empty, q: "honour", sort: "date_desc" }),
    ).toContain("sort=date_desc");
  });

  it("starts page numbers from 1 in the URL (page=0 is implicit)", () => {
    expect(buildSearchHref({ ...empty, q: "honour" })).not.toContain("p=");
    expect(buildSearchHref({ ...empty, q: "honour", page: 0 })).not.toContain("p=");
    expect(buildSearchHref({ ...empty, q: "honour", page: 3 })).toContain(
      "p=4",
    );
  });
});

describe("kwicUrl", () => {
  it("builds /explorer/kwic?q= for the bare case", () => {
    expect(kwicUrl({ q: "honour", authors: [] })).toBe(
      "/explorer/kwic?q=honour",
    );
  });

  it("joins multiple authors with commas in ?author=", () => {
    expect(
      kwicUrl({ q: "honour", authors: ["adams", "franklin"] }),
    ).toBe("/explorer/kwic?q=honour&author=adams%2Cfranklin");
  });

  it("uses authorOverride if set, ignoring authors[]", () => {
    expect(
      kwicUrl({
        q: "honour",
        authors: ["adams", "franklin", "jefferson"],
        authorOverride: "washington",
      }),
    ).toBe("/explorer/kwic?q=honour&author=washington");
  });

  it("url-encodes phrase queries with quotes and spaces", () => {
    expect(kwicUrl({ q: '"tide in the affairs"', authors: [] })).toBe(
      "/explorer/kwic?q=%22tide+in+the+affairs%22",
    );
  });
});

describe("isSortBy / SORT_OPTIONS", () => {
  it("accepts every documented sort id", () => {
    for (const opt of SORT_OPTIONS) {
      expect(isSortBy(opt.id)).toBe(true);
    }
  });

  it("rejects anything else", () => {
    expect(isSortBy("")).toBe(false);
    expect(isSortBy(null)).toBe(false);
    expect(isSortBy(undefined)).toBe(false);
    expect(isSortBy("popularity")).toBe(false);
    expect(isSortBy("RELEVANCE")).toBe(false);
    expect(isSortBy("date")).toBe(false);
  });
});

describe("known query smoke tests (URL building only — no backend hit)", () => {
  // These mirror the queries Codex suggested as a regression set.
  // They cover the project's most-cited phrases and exercise the
  // URL-encoding path the live backend depends on. End-to-end tests
  // against Supabase would need a fixture; this round only verifies
  // that the queries make it through the URL layer intact.
  const cases: { q: string; expected: string }[] = [
    {
      q: '"tide in the affairs"',
      expected: "/search?q=%22tide+in+the+affairs%22",
    },
    { q: '"pound of flesh"',    expected: "/search?q=%22pound+of+flesh%22" },
    { q: '"band of brothers"',  expected: "/search?q=%22band+of+brothers%22" },
    { q: "honour",              expected: "/search?q=honour" },
    { q: "honor",               expected: "/search?q=honor" },
    { q: "Shakespear",          expected: "/search?q=Shakespear" },
    { q: "Shakespeare",         expected: "/search?q=Shakespeare" },
    { q: "honour OR honor",     expected: "/search?q=honour+OR+honor" },
    { q: "honour -honourable",  expected: "/search?q=honour+-honourable" },
  ];
  for (const c of cases) {
    it(`round-trips ${JSON.stringify(c.q)}`, () => {
      expect(buildSearchHref({ ...empty, q: c.q })).toBe(c.expected);
    });
  }

  it("handles the empty query by returning /search", () => {
    expect(buildSearchHref(empty)).toBe("/search");
  });
});
