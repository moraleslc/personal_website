"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  publishedAt: string;
  order: number;
};

const empty = (): Omit<Post, "id"> => ({
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  publishedAt: new Date().toISOString().split("T")[0],
  order: 0,
});

const BlogEditor = () => {
  const [items, setItems] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState(empty());

  const fetch = async () => {
    const snapshot = await getDocs(collection(db, "post"));
    setItems(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Post)));
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    if (editing) {
      await updateDoc(doc(db, "post", editing.id), { ...form });
    } else {
      await addDoc(collection(db, "post"), { ...form });
    }
    setEditing(null);
    setForm(empty());
    fetch();
  };

  const handleEdit = (item: Post) => {
    setEditing(item);
    setForm({ title: item.title, slug: item.slug, excerpt: item.excerpt, body: item.body, publishedAt: item.publishedAt, order: item.order });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "post", id));
    fetch();
  };

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setForm({
      ...form,
      title: val,
      slug: val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    });
  };

  return (
    <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] mb-8 max-w-md">
      <h2 className="font-code font-bold text-xl mb-6">Blog Posts</h2>

      <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-col gap-1">
          <label className="font-code text-xs opacity-60">Title</label>
          <input
            value={form.title}
            onChange={e => handleTitleChange(e.target.value)}
            className="border-2 border-black rounded-lg p-2 font-code text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-code text-xs opacity-60">Slug (auto-generated)</label>
          <input
            value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value })}
            className="border-2 border-black rounded-lg p-2 font-code text-sm opacity-60"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-code text-xs opacity-60">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={e => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className="border-2 border-black rounded-lg p-2 font-code text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-code text-xs opacity-60">Body (Markdown)</label>
          <textarea
            value={form.body}
            onChange={e => setForm({ ...form, body: e.target.value })}
            rows={8}
            className="border-2 border-black rounded-lg p-2 font-code text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-code text-xs opacity-60">Published At</label>
          <input
            type="date"
            value={form.publishedAt}
            onChange={e => setForm({ ...form, publishedAt: e.target.value })}
            className="border-2 border-black rounded-lg p-2 font-code text-sm"
          />
        </div>
        <div className="flex gap-3 mt-2">
          <button onClick={handleSave} className="bg-green-100 border-2 border-black rounded-lg px-4 py-2 font-code font-bold hover:bg-green-200 transition-colors">
            {editing ? "Update" : "Publish"}
          </button>
          {editing && (
            <button onClick={() => { setEditing(null); setForm(empty()); }} className="bg-gray-100 border-2 border-black rounded-lg px-4 py-2 font-code font-bold hover:bg-gray-200 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="flex items-start justify-between gap-4 border-2 border-black/10 rounded-lg p-4">
            <div>
              <p className="font-code font-bold text-sm">{item.title}</p>
              <p className="font-code text-xs opacity-60">{item.publishedAt}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleEdit(item)} className="bg-yellow-100 border-2 border-black rounded-lg px-3 py-1 font-code text-xs hover:bg-yellow-200">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="bg-red-100 border-2 border-black rounded-lg px-3 py-1 font-code text-xs hover:bg-red-200">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogEditor;