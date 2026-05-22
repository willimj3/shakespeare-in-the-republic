import { describe, expect, it } from "vitest";
import { sanitizeSnippet } from "@/lib/sanitize-snippet";

describe("sanitizeSnippet", () => {
  it("returns empty string for null/undefined/empty input", () => {
    expect(sanitizeSnippet(null)).toBe("");
    expect(sanitizeSnippet(undefined)).toBe("");
    expect(sanitizeSnippet("")).toBe("");
  });

  it("preserves <mark> tags emitted by ts_headline", () => {
    const input = "the <mark>honour</mark> of the thing";
    expect(sanitizeSnippet(input)).toBe(
      "the <mark>honour</mark> of the thing",
    );
  });

  it("preserves multiple <mark> blocks in a single snippet", () => {
    const input = "<mark>honour</mark> and <mark>virtue</mark>";
    expect(sanitizeSnippet(input)).toBe(
      "<mark>honour</mark> and <mark>virtue</mark>",
    );
  });

  it("escapes <script> tags and any other HTML the backend never emits", () => {
    const out = sanitizeSnippet("<script>alert(1)</script>");
    expect(out).toBe("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(out.includes("<script>")).toBe(false);
  });

  it("escapes <img> tags including event handlers", () => {
    const out = sanitizeSnippet('<img src=x onerror="alert(1)">');
    expect(out).toBe('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;'.replace(
      /&quot;/g,
      '"',
    ));
    expect(out.includes("<img")).toBe(false);
  });

  it("escapes <mark> openings with attributes (only bare <mark> survives)", () => {
    // The backend never emits attribute-bearing <mark>; if anything
    // sneaks in, it should render as literal text rather than HTML.
    const out = sanitizeSnippet("<mark class=evil>x</mark>");
    expect(out.startsWith("&lt;mark class=evil&gt;")).toBe(true);
    // The closing </mark> after the literal opening still gets
    // restored, but with no live opening tag the browser sees only
    // a stray close tag, which is harmless.
    expect(out.endsWith("</mark>")).toBe(true);
  });

  it("escapes ampersands so URLs in snippets don't get interpreted as entities", () => {
    expect(sanitizeSnippet("Cromwell & Caesar")).toBe(
      "Cromwell &amp; Caesar",
    );
  });

  it("handles snippets that mix marks and dangerous HTML", () => {
    const input = '<mark>honour</mark> <script>evil()</script>';
    const out = sanitizeSnippet(input);
    expect(out.includes("<mark>honour</mark>")).toBe(true);
    expect(out.includes("<script>")).toBe(false);
    expect(out.includes("&lt;script&gt;")).toBe(true);
  });
});
