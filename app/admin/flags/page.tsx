import { PageHeader } from "@/components/dashboard/PageHeader";
import { FlagToggle } from "@/components/admin/FlagToggle";
import { listFlags } from "@/lib/feature-flags";

export const metadata = { title: "Feature Flags — MigraHub Admin" };
export const dynamic = "force-dynamic";

export default async function AdminFlagsPage() {
  const flags = await listFlags();

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Feature Flags"
        subtitle="Changes take effect immediately for every user — no deploy needed."
      />
      <div className="flex flex-col gap-4">
        {flags.map((flag) => (
          <FlagToggle key={flag.key} flag={flag} />
        ))}
      </div>
    </div>
  );
}
