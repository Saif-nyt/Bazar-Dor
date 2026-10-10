const Loading = () => {
  return (
    <main className="min-h-[calc(100vh-160px)] bg-[#f0f5f0] px-4 py-10">
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <div className="h-48 rounded-2xl bg-gray-200" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-40 rounded-2xl bg-gray-200" />
          ))}
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
