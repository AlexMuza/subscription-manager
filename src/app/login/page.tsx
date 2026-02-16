import { LoginClient } from './LoginClient';
import { sanitizeRedirectTo } from '@/lib/auth/redirect';

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const redirectRaw = resolvedSearchParams.redirectTo;
  const redirectTo = sanitizeRedirectTo(redirectRaw);

  return <LoginClient redirectTo={redirectTo} />;
}

