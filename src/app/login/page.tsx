import { LoginClient } from './LoginClient';
import { sanitizeRedirectTo } from '@/lib/auth/redirect';

type SearchParams = { [key: string]: string | string[] | undefined };

export default function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const redirectRaw = searchParams.redirectTo;
  const redirectTo = sanitizeRedirectTo(redirectRaw);

  return <LoginClient redirectTo={redirectTo} />;
}

