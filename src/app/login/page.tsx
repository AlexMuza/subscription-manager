import { LoginClient } from './LoginClient';

type SearchParams = { [key: string]: string | string[] | undefined };

export default function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const redirectRaw = searchParams.redirectTo;
  const redirectTo =
    typeof redirectRaw === 'string' && redirectRaw.length > 0
      ? redirectRaw
      : '/dashboard';

  return <LoginClient redirectTo={redirectTo} />;
}

