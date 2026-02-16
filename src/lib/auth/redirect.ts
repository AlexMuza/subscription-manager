const DEFAULT_REDIRECT = '/dashboard';

export function sanitizeRedirectTo(redirectTo: unknown): string {
  if (typeof redirectTo !== 'string' || redirectTo.length === 0) {
    return DEFAULT_REDIRECT;
  }

  // Разрешаем только внутренние абсолютные пути вида /foo/bar.
  if (!redirectTo.startsWith('/') || redirectTo.startsWith('//')) {
    return DEFAULT_REDIRECT;
  }

  return redirectTo;
}
