"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
			const data = await response.json();

			if (!response.ok) {
				setError(data.error ?? "登入失敗 / Login failed");
				setLoading(false);
				return;
			}

			router.push("/kortaipei-admin");
			router.refresh();
		} catch {
			setError("網路連線異常，請稍後再試。/ Network error, please try again.");
			setLoading(false);
		}
	}

	return (
		<main className="flex-1 flex items-center justify-center px-6 py-24 bg-black text-white">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-sm flex flex-col gap-5 border border-kor-light-gray/20 p-8"
			>
				<h1 className="font-display text-xl tracking-[0.2em] uppercase text-kor-gold text-center">
					KOR Taipei Admin
				</h1>

				<label className="flex flex-col gap-1 text-sm text-kor-light-gray">
					帳號 / Username
					<input
						type="text"
						required
						autoComplete="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="bg-transparent border border-kor-light-gray/40 focus:border-kor-gold px-3 py-2 text-white outline-none transition-colors"
					/>
				</label>

				<label className="flex flex-col gap-1 text-sm text-kor-light-gray">
					密碼 / Password
					<input
						type="password"
						required
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="bg-transparent border border-kor-light-gray/40 focus:border-kor-gold px-3 py-2 text-white outline-none transition-colors"
					/>
				</label>

				{error && (
					<p className="text-red-400 text-sm" role="alert">
						{error}
					</p>
				)}

				<button
					type="submit"
					disabled={loading}
					className="bg-kor-gold text-black font-medium tracking-[0.15em] uppercase text-sm px-6 py-3 transition-opacity hover:opacity-85 disabled:opacity-50"
				>
					{loading ? "登入中 / Signing in" : "登入 / Sign In"}
				</button>
			</form>
		</main>
	);
}
