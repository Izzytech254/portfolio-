export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600" />
          <div
            className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-t-violet-600"
            style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
          />
        </div>
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Loading...
        </p>
      </div>
    </div>
  );
}
