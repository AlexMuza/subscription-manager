import { describe, expect, it } from 'vitest';
import { sanitizeRedirectTo } from './redirect';

describe('sanitizeRedirectTo', () => {
  it('returns safe relative path as is', () => {
    expect(sanitizeRedirectTo('/subscriptions')).toBe('/subscriptions');
  });

  it('falls back for external absolute URL', () => {
    expect(sanitizeRedirectTo('https://evil.example/phishing')).toBe('/dashboard');
  });

  it('falls back for protocol-relative URL', () => {
    expect(sanitizeRedirectTo('//evil.example')).toBe('/dashboard');
  });

  it('falls back for empty and invalid values', () => {
    expect(sanitizeRedirectTo('')).toBe('/dashboard');
    expect(sanitizeRedirectTo(undefined)).toBe('/dashboard');
    expect(sanitizeRedirectTo('dashboard')).toBe('/dashboard');
  });
});
