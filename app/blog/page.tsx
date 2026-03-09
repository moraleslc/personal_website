import { client } from "@/sanity/client";
import { allPostsQuery } from "@/sanity/queries";
import { Post } from "@/sanity/types";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await client.fetch<Post[]>(allPostsQuery);

  return (
    <div className="relative w-screen px-20 py-16">
      <h2 className="h2 font-code text-left mb-12">Blog</h2>
      <div className="flex flex-wrap gap-8">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`}>
            <div className="w-72 border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] bg-white hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
              {post.coverImage && (
                <img
                  src={post.coverImage.asset.url}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <span className="font-code text-xs text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric"
                })}
              </span>
              <h3 className="font-bold text-lg mt-1">{post.title}</h3>
              {post.excerpt && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.excerpt}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}