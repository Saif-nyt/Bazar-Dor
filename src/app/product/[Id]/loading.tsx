const Loading = () => {
  return (
    <main className="min-h-screen bg-[#f1f3ee] p-4 md:p-8">
      <div className="mx-auto max-w-5xl animate-pulse space-y-6">
        <div className="h-4 w-64 rounded bg-gray-200" />

        <div className="flex flex-col gap-6 rounded-2xl bg-[#f8f9f6] p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-gray-200" />
            <div className="space-y-2">
              <div className="h-7 w-48 rounded-lg bg-gray-200" />
              <div className="h-3 w-32 rounded bg-gray-200" />
              <div className="h-3 w-40 rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-28 w-full rounded-2xl bg-gray-200 md:w-40" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-28 rounded-2xl bg-gray-200" />
          <div className="h-28 rounded-2xl bg-gray-200" />
          <div className="h-28 rounded-2xl bg-gray-200" />
        </div>

        <div className="h-64 rounded-2xl bg-gray-200" />
      </div>
    </main>
  );
};

export default Loading;
