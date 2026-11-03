import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from './sanitizeHtml';

describe('sanitizeHtml', () => {
  it('leaves plain text as it is', () => {
    expect(sanitizeHtml('A ledger entry')).toBe('A ledger entry');
  });

  it('keeps formatting, lists and line breaks', () => {
    const html = '<b>Bold</b> and <em>stressed</em><br><ul><li>one</li></ul>';
    expect(sanitizeHtml(html)).toBe(html);
  });

  it('keeps escaped characters escaped', () => {
    expect(sanitizeHtml('Under &lt;100 ms &amp; more')).toBe('Under &lt;100 ms &amp; more');
  });

  it('removes scripts, styles and frames with their content', () => {
    expect(sanitizeHtml('a<script>alert(1)</script>b<style>p{}</style><iframe src="https://example.com"></iframe>c')).toBe('abc');
  });

  it('removes event handlers and unsafe links', () => {
    expect(sanitizeHtml('<img src="x" onerror="alert(1)">')).toBe('<img>');
    expect(sanitizeHtml('<a href="javascript:alert(1)">link</a>')).toBe('<a>link</a>');
  });

  it('keeps web links and opens them in a new tab', () => {
    expect(sanitizeHtml('<a href="https://example.com/terms" onclick="x()">terms</a>')).toBe(
      '<a href="https://example.com/terms" target="_blank" rel="noopener noreferrer">terms</a>'
    );
  });

  it('keeps the text of unknown elements', () => {
    expect(sanitizeHtml('<custom-tag>kept</custom-tag> <font color="red">too</font>')).toBe('kept too');
  });
});
