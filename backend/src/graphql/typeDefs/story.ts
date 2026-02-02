import { objectType, extendType, nonNull, stringArg } from "nexus";
import StoryService from "../../services/story.service";
import { context } from "../../utils/types";

export const Story = objectType({
    name: "Story",
    definition(t) {
        t.string("id");
        t.string("imageUrl");
        t.field("createdAt", { type: "DateTime" });
        t.field("expiresAt", { type: "DateTime" });
        t.field("author", {
            type: "User",
            resolve: (parent, _args, ctx) => {
                return ctx.db.story
                    .findUnique({ where: { id: parent.id } })
                    .author();
            },
        });
    },
});

export const StoryQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getStories", {
            type: "Story",
            resolve: async (_, __, ctx: context) => {
                return StoryService.getStories(ctx);
            },
        });
    },
});

export const StoryMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createStory", {
            type: "Story",
            args: {
                imageUrl: nonNull(stringArg()),
            },
            resolve: async (_, args, ctx: context) => {
                return StoryService.createStory(args, ctx);
            },
        });
    },
});
