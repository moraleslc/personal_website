"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, User } from "firebase/auth";
import ExperienceEditor from "./components/ExperienceEditor";
import SkillsEditor from "./components/SkillsEditor";
import CertificationsEditor from "./components/CertificationsEditor";
import BlogEditor from "./components/BlogEditor";

const AdminPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => setUser(u));
        return () => unsub();
    }, []);

    const handleEmailLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            setError("Invalid email or password");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (e) {
            setError("Google sign in failed");
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
                <div className="bg-white border-4 border-black rounded-xl p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] w-80 flex flex-col gap-4">
                    <h1 className="font-code font-bold text-xl text-center">Admin Login</h1>
                    {error && <p className="text-red-500 font-code text-xs text-center">{error}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 border-black rounded-lg p-2 font-code text-sm"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 border-black rounded-lg p-2 font-code text-sm"
                    />
                    <button
                        onClick={handleEmailLogin}
                        className="bg-pink-200 border-2 border-black rounded-lg p-2 font-code font-bold hover:bg-pink-300 transition-colors"
                    >
                        Login
                    </button>
                    <button
                        onClick={handleGoogleLogin}
                        className="bg-blue-100 border-2 border-black rounded-lg p-2 font-code font-bold hover:bg-blue-200 transition-colors"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f0e8] p-12">
            <div className="flex justify-between items-center mb-12">
                <h1 className="font-code font-bold text-3xl">🌵 Admin Dashboard</h1>
                <button
                    onClick={() => signOut(auth)}
                    className="bg-red-100 border-2 border-black rounded-lg px-4 py-2 font-code text-sm hover:bg-red-200 transition-colors"
                >
                    Sign out
                </button>
            </div>
            <p className="font-code text-gray-500">Logged in as {user.email}</p>
            <br></br>
            <div className="grid grid-cols-4 gap-8 items-start">
                <ExperienceEditor />
                <CertificationsEditor />
                <SkillsEditor />
                <BlogEditor />
            </div>
        </div>
    );
};

export default AdminPage;