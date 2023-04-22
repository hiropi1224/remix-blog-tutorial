import { prisma } from "~/db.server";
import type { Post } from "@prisma/client";

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.upsert({
    where: {
      slug: post.slug,
    },
    update: {
      title: post.title,
      slug: post.slug,
      markdown: post.markdown,
    },
    create: {
      title: post.title,
      slug: post.slug,
      markdown: post.markdown,
    },
  });
}
