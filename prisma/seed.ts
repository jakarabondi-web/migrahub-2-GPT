import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Seed authors for demo community content — not meant to be logged into
// (the password hash is a random placeholder), just FK targets so posts
// have a real author relation instead of a denormalized name string.
const DEMO_AUTHORS = [
  { name: "Amina Kone", email: "seed+amina@migrahub.dev", pathway: "I-485 Applicant" },
  { name: "David Otieno", email: "seed+david@migrahub.dev", pathway: "H-1B Holder" },
  { name: "Grace Mwangi", email: "seed+grace@migrahub.dev", pathway: "F-1 Student" },
];

const DEMO_POSTS = [
  {
    author: "Amina Kone",
    group: "Green Card Journeys",
    title: "What to expect at the Nairobi ASC biometrics appointment",
    body: "Went in for biometrics last week — here's what the process actually looked like and how long it took.",
    replies: ["Thanks for this, exactly what I needed before my appointment next week."],
  },
  {
    author: "David Otieno",
    group: "H-1B Professionals",
    title: "Timeline from OPT to H-1B approval — my experience",
    body: "Sharing my full timeline from OPT start to H-1B approval in case it helps anyone tracking their own case.",
    replies: [
      "This matches my timeline almost exactly.",
      "Did you use premium processing for the transition?",
    ],
  },
  {
    author: "Grace Mwangi",
    group: "Students",
    title: "STEM OPT extension: documents that got mine approved fast",
    body: "My STEM OPT extension got approved in under 3 weeks — here's the exact document checklist I used.",
    replies: [],
  },
];

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

  const adminEmail = "admin@migrahub.dev";
  const adminPassword = "admin12345";
  await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      name: "MigraHub Admin",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: "admin",
      onboardingComplete: true,
    },
    update: {},
  });
  console.log(`Seeded admin account: ${adminEmail} / ${adminPassword} (local dev only).`);

  const passwordHash = await bcrypt.hash(`seed-${Date.now()}-not-a-real-login`, 4);
  const authorIdByName = new Map<string, string>();

  for (const author of DEMO_AUTHORS) {
    const user = await prisma.user.upsert({
      where: { email: author.email },
      create: {
        name: author.name,
        email: author.email,
        passwordHash,
        onboardingComplete: true,
        immigrationGoal: author.pathway,
      },
      update: {},
    });
    authorIdByName.set(author.name, user.id);
  }

  let postsCreated = 0;
  for (const post of DEMO_POSTS) {
    const authorId = authorIdByName.get(post.author)!;
    const existing = await prisma.communityPost.findFirst({ where: { title: post.title } });
    if (existing) continue;

    const created = await prisma.communityPost.create({
      data: { authorId, group: post.group, title: post.title, body: post.body },
    });
    for (const replyBody of post.replies) {
      const replyAuthorId = authorIdByName.get(
        DEMO_AUTHORS.find((a) => a.name !== post.author)?.name ?? post.author,
      )!;
      await prisma.communityReply.create({
        data: { postId: created.id, authorId: replyAuthorId, body: replyBody },
      });
    }
    postsCreated += 1;
  }
  console.log(`Seeded ${postsCreated} community posts.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
