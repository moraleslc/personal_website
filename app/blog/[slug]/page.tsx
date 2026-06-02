"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/lib/firestore";

type Post = {
  id: string;
  title: string;
  slug: string;
  body: string;
  publishedAt: string;
  excerpt?: string;
};

const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getPostBySlug(slug as string);
      setPost(data as unknown as Post);
    };
    fetch();
  }, [slug]);

  if (!post) return <div className="p-20 font-code">Loading...</div>;

return (
  <div className="min-h-screen px-20 py-16">
    <Link href="/#blog" className="font-code text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
      ← Back to Main Page
    </Link>
    <div className="max-w-2xl mx-auto">
      <span className="font-code text-xs text-gray-400 block mb-2">
        {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </span>
      <h1 className="font-handwriting text-7xl leading-30 text-center mb-8">{post.title}</h1>
      <div className="prose prose-sm font-code">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </div>
  </div>
);
};

export default PostPage;