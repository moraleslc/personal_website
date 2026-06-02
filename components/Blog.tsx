"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getPosts } from "@/lib/firestore";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getPosts();
      setPosts(data as unknown as Post[]);
    };
    fetch();
  }, []);

  return (
    <div id="blog" className="px-20 py-16">
      <h2 className="h2 font-code text-left mb-12">Blog</h2>
      <div className="flex flex-wrap gap-8">
        {posts.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="w-72 border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] bg-white hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
              <span className="font-code text-xs text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <h3 className="font-bold text-lg mt-1">{post.title}</h3>
              {post.excerpt && <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.excerpt}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;