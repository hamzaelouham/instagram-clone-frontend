import { context } from "../utils/types";

class StoryService {
    async createStory(args: { imageUrl: string }, ctx: context) {
        if (!ctx.req.user) {
            throw new Error("You must be logged in to create a story");
        }

        const now = new Date();
        // Expires in 24 hours
        const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        return ctx.db.story.create({
            data: {
                imageUrl: args.imageUrl,
                createdAt: now,
                expiresAt: expiresAt,
                author: {
                    connect: {
                        id: ctx.req.user.userId,
                    },
                },
            },
        });
    }

    async getStories(ctx: context) {
        console.log("getStories called. User:", ctx.req.user?.email);
        if (!ctx.req.user) {
            throw new Error("You must be logged in to view stories");
        }

        const now = new Date();
        console.log("Current time:", now);

        // Get stories from users verification follows? 
        // For now, let's just get stories from all users to keep it simple and populate the UI, 
        // or arguably better: stories from users I follow AND my own stories.
        // The previous implementation of getAllPosts gets everything.
        // Let's mimic the Instagram behavior: Stories from people I follow + my own.

        const following = await ctx.db.user
            .findUnique({
                where: { id: ctx.req.user.userId },
            })
            .following();

        const followingIds = following?.map((u) => u.id) || [];
        followingIds.push(ctx.req.user.userId); // Add myself

        return ctx.db.story.findMany({
            where: {
                authorId: {
                    in: followingIds,
                },
                expiresAt: {
                    gt: now, // Only not expired
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: true,
            },
        });
    }
}

export default new StoryService();
