"use client";

import { SubmitEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SubscribeForm() {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<Status>("idle");
	const [message, setMessage] = useState<string | null>(null);

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus("loading");
		setMessage(null);

		try {
			const response = await fetch("/api/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			const data = await response.json();

			if (!response.ok) {
				setStatus("error");
				setMessage(data.error ?? "系統發生錯誤，請稍後再試。/ Something went wrong.");
				return;
			}

			setStatus("success");
			setMessage(data.message);
			setEmail("");
		} catch {
			setStatus("error");
			setMessage("網路連線異常，請稍後再試。/ Network error, please try again.");
		}
	}

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-[280px]">
			<div className="flex flex-col gap-3">
				<input
					type="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="your@email.com"
					aria-label="Email"
					disabled={status === "loading"}
					className="w-full bg-transparent border border-kor-dark-gray focus:border-kor-gold rounded-xl px-5 h-[50px] font-sans text-sm text-white placeholder:text-kor-dark-gray outline-none transition-colors disabled:opacity-50"
				/>
				<button
					type="submit"
					disabled={status === "loading"}
					className="flex items-center justify-center gap-3 w-full h-[50px] rounded-xl bg-kor-gold text-black font-sans font-bold text-sm transition-opacity hover:opacity-85 disabled:opacity-50"
				>
					{status === "loading" ? (
						"loading…"
					) : (
						<>
							<span className="font-cjk tracking-[0.1em] mb-1">訂閱</span>
							<span aria-hidden className="h-3.5 w-px bg-black/40" />
							<span className="font-sans tracking-[0.15em] uppercase">Subscribe</span>
						</>
					)}
				</button>
			</div>
			{message && (
				<p
					className={`mt-4 whitespace-pre-line text-sm ${status === "error" ? "text-red-400" : "text-kor-gold"
						}`}
					role="status"
				>
					{message}
				</p>
			)}
		</form>
	);
}
