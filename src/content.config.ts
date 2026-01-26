// import {getCollection, defineCollection, z} from "astro:content";
// import {glob} from "astro/loaders";
//
// const cards = defineCollection({
//     type: "data",
//     schema: z.object({
//         s: z.any(),
//         subtitle: z.string().optional(),
//         tags: z.array(z.string()).optional(),
//         title: z.string(),
//         i: z.any(),
//     }).strict(),
// });
//
// const tags = defineCollection({
//     loader: async () => {
//         const cards = await getCollection("cards");
//         const tagMap = new Map<string, number>();
//         for (const card of cards) {
//             if (card.data.tags) {
//                 for (const tag of card.data.tags) {
//                     tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
//                 }
//             }
//         }
//         return Array.from(tagMap.entries()).map(([slug, count]) => ({
//             id: slug,
//             slug,
//             count
//         }));
//     },
//     loader: glob({pattern: "**/*.yml", base: "./src/content"}),
//     schema: z.object({
//         slug: z.string(),
//         count: z.number(),
//     }),
// });
//
// export const collections = {cards, tags};

export const collections = {};