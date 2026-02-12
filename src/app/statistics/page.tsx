export default function StatisticsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Статистика</h1>
        <p className="mt-1 text-sm text-gray-600">
          Здесь появятся графики расходов по месяцам и категориям.
        </p>
      </div>
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500">
        В следующих шагах добавим простые диаграммы и затем подключим реальные
        данные из Supabase.
      </div>
    </div>
  );
}

