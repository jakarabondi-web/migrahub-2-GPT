import { prisma } from "@/lib/prisma";

export const FLAG_DEFINITIONS = {
  community: {
    name: "Community",
    description: "Show My Community and allow new posts.",
  },
  employer_job_posting: {
    name: "Employer Job Posting",
    description: "Let employers post new jobs to the marketplace.",
  },
} as const;

export type FlagKey = keyof typeof FLAG_DEFINITIONS;

// Flags default to ON — a flag row only needs to exist once someone
// (the seed script or an admin) has actually looked at it. Missing row
// means "never configured," not "off."
export async function isFlagEnabled(key: FlagKey): Promise<boolean> {
  const flag = await prisma.featureFlag.findUnique({ where: { key } });
  return flag?.enabled ?? true;
}

export async function listFlags() {
  const rows = await prisma.featureFlag.findMany();
  const byKey = new Map(rows.map((r) => [r.key, r]));

  return (Object.keys(FLAG_DEFINITIONS) as FlagKey[]).map((key) => {
    const def = FLAG_DEFINITIONS[key];
    const row = byKey.get(key);
    return {
      key,
      name: def.name,
      description: def.description,
      enabled: row?.enabled ?? true,
    };
  });
}
