import { Elysia } from "elysia";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "./db";

const R2_URL =
  "https://38d51e3fbe318c5a9501ab750c094f7e.r2.cloudflarestorage.com";

const R2_ACCESS_KEY = process.env.R2_ACCESS_KEY!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;

const S3 = new S3Client({
  region: "auto",
  endpoint: R2_URL,
  credentials: {
    accessKeyId: R2_ACCESS_KEY,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const app = new Elysia()
  .get("/get-presigned-url", async () => {
    const path = `random-folder/${Math.random()}.mp4`;

    const putUrl = await getSignedUrl(
      S3,
      new PutObjectCommand({
        Bucket: "test",
        Key: path,
      }),
      { expiresIn: 3600 },
    );

    return { putUrl, path };
  })

  .post("/upload-final-url", async ({ body }) => {
    const { path } = body as { path: string };

    await prisma.post.create({
      data: { url: path },
    });

    return "Video uploaded";
  })

  .listen(3000);

export type app = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
