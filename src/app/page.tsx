import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">
          Менеджер цифровых подписок
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Начни с дашборда, чтобы увидеть сводку по подпискам, или перейди сразу
          к списку подписок.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href="/dashboard"
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
          >
            Дашборд
          </Link>
          <Link
            href="/subscriptions"
            className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Подписки
          </Link>
        </div>
      </div>
    </div>
  );
}

