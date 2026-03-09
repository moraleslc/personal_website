import { client } from "@/sanity/client";
import { postBySlugQuery } from "@/sanity/queries";
import { Post } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch<Post>(postBySlugQuery, { slug });

  if (!post) return <div className="px-20 py-16">Post not found.</div>;

  return (
    <div className="relative w-screen px-20 py-16 max-w-3xl mx-auto">
      <Link href="/#blog" className="inline-flex items-center gap-2 font-code text-sm mb-8 hover:-translate-x-1 transition-transform duration-200">
        ← Back to Blog
      </Link>
      <div>
        <span className="font-code text-xs text-gray-400">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
          })}
        </span>
        <h1 className="h1 font-handwriting text-left mt-2 mb-8">{post.title}</h1>
        {post.coverImage && (
          <img
            src={post.coverImage.asset.url}
            alt={post.title}
            className="w-full h-72 object-cover rounded-xl mb-10 border-2 border-black"
          />
        )}
        <div className="prose prose-lg">
          <PortableText value={post.body} />
        </div>
      </div>
    </div>
  );
}