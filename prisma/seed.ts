import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JOBS = [
  {
    title: "Senior Software Engineer",
    company: "Microsoft",
    location: "Seattle, WA",
    salaryMin: 180_000,
    salaryMax: 240_000,
    sponsorship: true,
    remote: false,
    industry: "Technology",
  },
  {
    title: "Backend Engineer",
    company: "Stripe",
    location: "Remote (US)",
    salaryMin: 150_000,
    salaryMax: 195_000,
    sponsorship: true,
    remote: true,
    industry: "Technology",
  },
  {
    title: "Data Analyst",
    company: "Ramp",
    location: "New York, NY",
    salaryMin: 110_000,
    salaryMax: 140_000,
    sponsorship: true,
    remote: false,
    industry: "Fintech",
  },
  {
    title: "Product Designer",
    company: "Notion",
    location: "San Francisco, CA",
    salaryMin: 140_000,
    salaryMax: 175_000,
    sponsorship: false,
    remote: false,
    industry: "Software",
  },
  {
    title: "DevOps Engineer",
    company: "Vercel",
    location: "Remote (US)",
    salaryMin: 145_000,
    salaryMax: 185_000,
    sponsorship: true,
    remote: true,
    industry: "Technology",
  },
  {
    title: "Registered Nurse",
    company: "Mercy Health",
    location: "Chicago, IL",
    salaryMin: 78_000,
    salaryMax: 98_000,
    sponsorship: true,
    remote: false,
    industry: "Healthcare",
  },
  {
    title: "Mechanical Engineer",
    company: "Boeing",
    location: "Everett, WA",
    salaryMin: 95_000,
    salaryMax: 130_000,
    sponsorship: true,
    remote: false,
    industry: "Aerospace",
  },
  {
    title: "Frontend Engineer",
    company: "Linear",
    location: "Remote (US)",
    salaryMin: 135_000,
    salaryMax: 170_000,
    sponsorship: false,
    remote: true,
    industry: "Software",
  },
];

async function main() {
  for (const job of JOBS) {
    const existing = await prisma.job.findFirst({
      where: { title: job.title, company: job.company },
    });
    if (!existing) {
      await prisma.job.create({ data: job });
    }
  }
  console.log(`Seeded ${JOBS.length} jobs.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
