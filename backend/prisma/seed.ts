import prisma from "./client";
import axios from "axios";
import * as cheerio from "cheerio";

async function main() {
  const password = "$2b$10$EpRnTzVlqHNP0zQx.ZUx3.1c4.jNZZ.1c4.jNZZ.1c4.jNZZ.1c4."; // Example hash or use a known one if available, or just a dummy string if auth service handles hashing. 
  // actually better to create a user properly.
  // We'll just upsert a user so it exists.

  const user = await prisma.user.upsert({
    where: { email: "seed@example.com" },
    update: {},
    create: {
      email: "seed@example.com",
      name: "Seed User",
      // username field does not exist in schema
      // Schema check from previous turns: model User { id String @id, fullname String?, name String?, email String @unique, password String }
      // Wait, 'name' in schema is nullable. 'password' is String.
      // I need to provide a password. I'll provide a dummy hashed password.
      password: "$2b$10$EpRnTzVlqHNP0zQx.ZUx3.1c4.jNZZ.1c4.jNZZ.1c4.jNZZ.1c4.", // dummy hash
      fullname: "Seed User Fullname",
    },
  });

  const response = await axios.get("https://unsplash.com/fr/s/photos/trucks");
  const $ = cheerio.load(response.data);
  const images = $("figure").find("img");

  for (let image of images) {
    const src = image.attribs["src"];
    const caption = image.attribs["alt"];

    if (src && caption) {
      await prisma.post.create({
        data: {
          caption: caption,
          imageUrl: src,
          likesCount: 0,
          author: { connect: { id: user.id } },
        },
      });
    }
  }
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
