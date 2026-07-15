import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { CompanyProfileForm } from "@/components/employer/CompanyProfileForm";

export const metadata = { title: "Company Profile — MigraHub" };
export const dynamic = "force-dynamic";

export default async function CompanyProfilePage() {
  const session = await getServerSession(authOptions);
  const company = session?.user?.id
    ? await prisma.company.findUnique({ where: { ownerId: session.user.id } })
    : null;

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Company Profile" subtitle="Candidates see this when they view your job postings." />
      <CompanyProfileForm
        company={{
          name: company?.name ?? "",
          industry: company?.industry ?? "",
          website: company?.website ?? "",
          description: company?.description ?? "",
        }}
      />
    </div>
  );
}
