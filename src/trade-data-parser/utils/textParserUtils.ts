export function matchGroup(
  s: string,
  re: RegExp,
  groupIndex = 1,
): string | undefined {
  return s.match(re)?.[groupIndex];
}

export function cleanInboundText(textBody: string) {
  let text = (textBody ?? '').replace(/\r\n/g, '\n');

  // unquote forwarded markers
  text = text.replace(/^\s*>\s?/gm, '');
  text = text.replace(/Begin forwarded message:\s*\n?/i, '');

  // remove URLs
  text = text.replace(/https?:\/\/\S+/g, '');

  // normalize whitespace
  text = text
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return text;
}

export function htmlToText(html?: string | null) {
  if (!html) return '';
  let text = html;
  text = text.replace(/<\s*br\s*\/?>/gi, '\n');
  text = text.replace(/<\/p\s*>/gi, '\n');
  text = text.replace(/<[^>]+>/g, '');
  text = text.replace(/&nbsp;/gi, ' ');
  text = text.replace(/&amp;/gi, '&');
  text = text.replace(/&lt;/gi, '<');
  text = text.replace(/&gt;/gi, '>');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&quot;/gi, '"');
  return text;
}

export function normalizeSubject(rawSubject: string) {
  return (rawSubject ?? '')
    .trim()
    .replace(/^(?:(?:re|fw|fwd)\s*:\s*)+/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parsePercent(s?: string) {
  if (!s) return null;
  const n = Number(s.replace('%', ''));
  return Number.isFinite(n) ? n : null;
}

export function parseMoney(s?: string) {
  if (!s) return null;
  const n = Number(s.replace(/[$,]/g, ''));
  return Number.isFinite(n) ? n : null;
}
