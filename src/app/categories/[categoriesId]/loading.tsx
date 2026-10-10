const Loading = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl animate-pulse px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 h-4 w-48 rounded-lg bg-gray-200" />

        <div className="mb-8 flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="h-16 w-16 rounded-2xl bg-gray-200" />

          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-gray-200" />
            <div className="h-7 w-40 rounded-lg bg-gray-200" />
            <div className="h-3 w-32 rounded bg-gray-200" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-40 rounded-2xl bg-gray-200" />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
