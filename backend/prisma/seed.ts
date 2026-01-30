import prisma from "./client";
import axios from "axios";
import * as cheerio from "cheerio";

async function main() {
  const response = await axios.get("https://unsplash.com/fr/s/photos/trucks");
  const $ = cheerio.load(response.data);
  const images = $("figure").find("img");

  for (let image of images) {
    await prisma.post.create({
      data: {
        caption: image.attribs["alt"],
        imageUrl: image.attribs["src"],
        likesCount: 0,
        author: { connect: { id: "cljvgyv630004s8avqimq27ks" } },
      },
    });
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
