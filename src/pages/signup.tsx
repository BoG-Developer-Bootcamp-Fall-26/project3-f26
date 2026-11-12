import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthLayout from "@/components/AuthLayout";
import { useUser } from "@/hooks/useUser";

export default function SignupPage() {
    const router = useRouter();
    const { login } = useUser();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e : FormEvent) {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const res = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password, admin }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error);
                return;
            }

            login({ id: data.id, fullName: data.fullName, admin: data.admin });
            router.push("/training-logs");
        } catch {
            setError("Something went wrong, please try again");
        }
    }

    const inputStyle = "border-b-2 border-brand py-2 text-lg outline-none";

    return (
        <AuthLayout title="Create Account">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required className={inputStyle} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputStyle} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputStyle} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className={inputStyle} />
                <label className="flex items-center gap-3 text-lg">
                    <input type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)} className="h-5 w-5 accent-brand" />
                    Admin access
                </label>
                {error && <p className="text-red-600">{error}</p>}
                <button type="submit" className="mt-2 rounded-lg bg-brand py-3 text-lg font-semibold text-white hover:bg-brand-dark">
                    Sign up
                </button>
            </form>
            <p className="mt-6 text-center">
                Already have an account?{" "}
                <Link href="/" className="font-bold hover:text-brand">
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    );
}