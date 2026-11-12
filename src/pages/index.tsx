import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthLayout from "@/components/AuthLayout";
import { useUser } from "@/hooks/useUser";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/training-logs");
    }
  }, [user, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/user/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json()
      if (!res.ok) {
        setError("Incorrect email or password");
        return;
      }
      login({ id: data.id, fullName: data.fullName, admin: data.admin });
      router.push("/training-logs");
    } catch {
      setError("Something went wrong, please try again");
    }
  }
  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value )}
          required
          className="border-b-2 border-brand py-2 text-lg outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value )}
          required
          className="border-b-2 border-brand py-2 text-lg outline-none"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="mt-4 rounded-lg bg-brand py-3 text-lg font-semibold text-white hover:bg-brand-dark">
          Log in
        </button>
      </form>
      <p className="mt-6 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-bold hover:text-brand">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}