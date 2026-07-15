function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export function DashboardHeader({
  name,
  progress,
  nextMilestone,
}: {
  name: string;
  progress: number;
  nextMilestone: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-h2 text-text-primary text-balance">
        {greeting()}, {name}.
      </h1>
      <p className="mt-2 text-body text-text-secondary">
        You&apos;re making great progress. {progress}% of your current journey is
        complete. Next milestone: <span className="font-medium text-primary">{nextMilestone}</span>.
      </p>
    </div>
  );
}
