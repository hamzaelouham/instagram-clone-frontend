import prisma from "./client";

async function main() {
    const hash = "$2b$10$0QEfkw40nPMoeq92IKiwM.agRHal1bixBF2I/1jmxmfTZiqr8zoHe"; // hash for '123'

    console.log("Emptying database...");
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.story.deleteMany();
    await prisma.user.deleteMany();

    console.log("Creating users...");
    const users = await Promise.all([
        prisma.user.create({
            data: {
                email: "seed@example.com",
                name: "seeduser",
                fullname: "Seed User",
                password: hash,
                image: "https://i.pravatar.cc/150?u=seed",
            },
        }),
        prisma.user.create({
            data: {
                email: "alex@example.com",
                name: "alex_dev",
                fullname: "Alex Designer",
                password: hash,
                image: "https://i.pravatar.cc/150?u=alex",
            },
        }),
        prisma.user.create({
            data: {
                email: "sarah@example.com",
                name: "sarah_travels",
                fullname: "Sarah Jenkins",
                password: hash,
                image: "https://i.pravatar.cc/150?u=sarah",
            },
        }),
        prisma.user.create({
            data: {
                email: "mike@example.com",
                name: "mike_fitness",
                fullname: "Mike Peterson",
                password: hash,
                image: "https://i.pravatar.cc/150?u=mike",
            },
        }),
    ]);

    const [seedUser, alex, sarah, mike] = users;

    console.log("Setting up follow relationships...");
    // Seed user follows everyone
    await prisma.user.update({
        where: { id: seedUser.id },
        data: {
            following: {
                connect: [{ id: alex.id }, { id: sarah.id }, { id: mike.id }],
            },
        },
    });

    // Alex follows seed user and sarah
    await prisma.user.update({
        where: { id: alex.id },
        data: {
            following: {
                connect: [{ id: seedUser.id }, { id: sarah.id }],
            },
        },
    });

    console.log("Creating stories...");
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const storyImages = [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    ];

    await Promise.all(
        users.map((user, i) =>
            prisma.story.create({
                data: {
                    imageUrl: storyImages[i],
                    expiresAt: expiresAt,
                    authorId: user.id,
                },
            })
        )
    );

    console.log("Creating posts...");
    const postImages = [
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
        "https://images.unsplash.com/photo-1501854140801-50d01698950b",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    ];

    await Promise.all(
        users.map((user, i) =>
            prisma.post.create({
                data: {
                    caption: `Great day with ${user.name}! #lifestyle`,
                    imageUrl: postImages[i],
                    likesCount: Math.floor(Math.random() * 100),
                    authorId: user.id,
                },
            })
        )
    );

    console.log("✅ Seed completed successfully!");
    console.log("All users password: '123'");
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
