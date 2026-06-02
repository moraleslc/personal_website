"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";

type Experience = {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
  sticky?: string;
  order: number;
};

const empty = (): Omit<Experience, "id"> => ({
  date: "",
  role: "",
  company: "",
  description: "",
  sticky: "",
  order: 0,
});

const ExperienceEditor = () => {
  const [items, setItems] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState(empty());

  const fetch = async () => {
    const q = query(collection(db, "experience"), orderBy("order"));
    const snap = await getDocs(q);
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Experience)));
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    if (editing) {
      await updateDoc(doc(db, "experience", editing.id), { ...form });
    } else {
      await addDoc(collection(db, "experience"), { ...form });
    }
    setEditing(null);
    setForm(empty());
    fetch();
  };

  const handleEdit = (item: Experience) => {
    setEditing(item);
    setForm({ date: item.date, role: item.role, company: item.company, description: item.description, sticky: item.sticky ?? "", order: item.order });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "experience", id));
    fetch();
  };

  return (
    <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] mb-8 max-w-md">
      <h2 className="font-code font-bold text-xl mb-6">Experience</h2>

      {/* Form */}
      <div className="flex flex-col gap-3 mb-8 max-w-md">
        {[
          { label: "Date", key: "date" },
          { label: "Role", key: "role" },
          { label: "Company", key: "company" },
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
          <label className="font-code text-xs opacity-60">Description</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="border-2 border-black rounded-lg p-2 font-code text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-code text-xs opacity-60">Sticky Note</label>
          <input
            value={form.sticky}
            onChange={e => setForm({ ...form, sticky: e.target.value })}
            className="border-2 border-black rounded-lg p-2 font-code text-sm"
          />
        </div>
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
          <button
            onClick={handleSave}
            className="bg-green-100 border-2 border-black rounded-lg px-4 py-2 font-code font-bold hover:bg-green-200 transition-colors"
          >
            {editing ? "Update" : "Add"}
          </button>
          {editing && (
            <button
              onClick={() => { setEditing(null); setForm(empty()); }}
              className="bg-gray-100 border-2 border-black rounded-lg px-4 py-2 font-code font-bold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="flex items-start justify-between gap-4 border-2 border-black/10 rounded-lg p-4">
            <div>
              <p className="font-code font-bold text-sm">{item.role}</p>
              <p className="font-code text-xs opacity-60">{item.company} · {item.date}</p>
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

export default ExperienceEditor;