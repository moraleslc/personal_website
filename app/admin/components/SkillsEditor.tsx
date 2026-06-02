"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";

type SkillCard = {
  id: string;
  title: string;
  emoji: string;
  color: string;
  skills: string[];
  order: number;
};

const empty = (): Omit<SkillCard, "id"> => ({
  title: "",
  emoji: "",
  color: "bg-blue-100",
  skills: [],
  order: 0,
});

const SkillsEditor = () => {
  const [items, setItems] = useState<SkillCard[]>([]);
  const [editing, setEditing] = useState<SkillCard | null>(null);
  const [form, setForm] = useState(empty());
  const [skillInput, setSkillInput] = useState("");

  const fetch = async () => {
    const q = query(collection(db, "skills"), orderBy("order"));
    const snap = await getDocs(q);
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as SkillCard)));
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    if (editing) {
      await updateDoc(doc(db, "skills", editing.id), { ...form });
    } else {
      await addDoc(collection(db, "skills"), { ...form });
    }
    setEditing(null);
    setForm(empty());
    setSkillInput("");
    fetch();
  };

  const handleEdit = (item: SkillCard) => {
    setEditing(item);
    setForm({ title: item.title, emoji: item.emoji, color: item.color, skills: item.skills, order: item.order });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "skills", id));
    fetch();
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills.filter(s => s !== skill) });
  };

  return (
    <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] mb-8 max-w-md">
      <h2 className="font-code font-bold text-xl mb-6">Skills</h2>

      <div className="flex flex-col gap-3 mb-8">
        {[
          { label: "Title", key: "title" },
          { label: "Emoji", key: "emoji" },
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
          <label className="font-code text-xs opacity-60">Color</label>
          <select
            value={form.color}
            onChange={e => setForm({ ...form, color: e.target.value })}
            className="border-2 border-black rounded-lg p-2 font-code text-sm"
          >
            <option value="bg-blue-100">Blue</option>
            <option value="bg-pink-100">Pink</option>
            <option value="bg-yellow-100">Yellow</option>
            <option value="bg-green-100">Green</option>
            <option value="bg-purple-100">Purple</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-code text-xs opacity-60">Skills</label>
          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addSkill()}
              placeholder="Type a skill and press Enter"
              className="border-2 border-black rounded-lg p-2 font-code text-sm flex-1"
            />
            <button onClick={addSkill} className="bg-blue-100 border-2 border-black rounded-lg px-3 font-code text-sm hover:bg-blue-200">+</button>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {form.skills.map(skill => (
              <span key={skill} className="font-code text-xs bg-gray-100 border border-black/20 rounded-full px-2 py-0.5 flex items-center gap-1">
                {skill}
                <button onClick={() => removeSkill(skill)} className="opacity-50 hover:opacity-100">×</button>
              </span>
            ))}
          </div>
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
          <button onClick={handleSave} className="bg-green-100 border-2 border-black rounded-lg px-4 py-2 font-code font-bold hover:bg-green-200 transition-colors">
            {editing ? "Update" : "Add"}
          </button>
          {editing && (
            <button onClick={() => { setEditing(null); setForm(empty()); setSkillInput(""); }} className="bg-gray-100 border-2 border-black rounded-lg px-4 py-2 font-code font-bold hover:bg-gray-200 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="flex items-start justify-between gap-4 border-2 border-black/10 rounded-lg p-4">
            <div>
              <p className="font-code font-bold text-sm">{item.emoji} {item.title}</p>
              <p className="font-code text-xs opacity-60">{item.skills.join(", ")}</p>
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

export default SkillsEditor;