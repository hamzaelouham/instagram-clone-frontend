import prisma from "./client";

async function main() {
    const email = "seed@example.com";
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        console.error("Seed user not found!");
        process.exit(1);
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

    await prisma.story.create({
        data: {
            imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80", // Cat with sunglasses
            createdAt: now,
            expiresAt: expiresAt,
            authorId: user.id,
        },
    });

    console.log("✅ Created test story for user:", user.email);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
