"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";

type Cert = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  emoji: string;
  href: string;
  order: number;
};

const empty = (): Omit<Cert, "id"> => ({
  name: "",
  issuer: "",
  date: "",
  emoji: "",
  href: "",
  order: 0,
});

const CertificationsEditor = () => {
  const [items, setItems] = useState<Cert[]>([]);
  const [editing, setEditing] = useState<Cert | null>(null);
  const [form, setForm] = useState(empty());

  const fetch = async () => {
    const q = query(collection(db, "certifications"), orderBy("order"));
    const snap = await getDocs(q);
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Cert)));
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    if (editing) {
      await updateDoc(doc(db, "certifications", editing.id), { ...form });
    } else {
      await addDoc(collection(db, "certifications"), { ...form });
    }
    setEditing(null);
    setForm(empty());
    fetch();
  };

  const handleEdit = (item: Cert) => {
    setEditing(item);
    setForm({ name: item.name, issuer: item.issuer, date: item.date, emoji: item.emoji, href: item.href, order: item.order });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "certifications", id));
    fetch();
  };

  return (
    <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] mb-8 max-w-md">
      <h2 className="font-code font-bold text-xl mb-6">Certifications</h2>

      <div className="flex flex-col gap-3 mb-8">
        {[
          { label: "Name", key: "name" },
          { label: "Issuer", key: "issuer" },
          { label: "Date", key: "date" },
          { label: "Emoji", key: "emoji" },
          { label: "Link", key: "href" },
        ].map(({ label, key }) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="font-code text-xs opacity-60">{label}</label>
            <input
              value={form[key as keyof typeof form] as string}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              className="border-2 border-black rounded-lg p-2 font-code text-sm"
            />
          </div>
        ))}
        <div className="flex flex-col gap-1">
          <label className="font-code text-xs opacity-60">Order</label>
          <input
            type="number"
            value={form.order}
            onChange={e => setForm({ ...form, order: Number(e.target.value) })}
            className="border-2 border-black rounded-lg p-2 font-code text-sm w-24"
          />
        </div>
        <div className="flex gap-3 mt-2">
          <button onClick={handleSave} className="bg-green-100 border-2 border-black rounded-lg px-4 py-2 font-code font-bold hover:bg-green-200 transition-colors">
            {editing ? "Update" : "Add"}
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
              <p className="font-code font-bold text-sm">{item.emoji} {item.name}</p>
              <p className="font-code text-xs opacity-60">{item.issuer} · {item.date}</p>
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

export default CertificationsEditor;