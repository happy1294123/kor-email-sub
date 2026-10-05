import Image from "next/image";
import SubscribeForm from "./subscribe-form";

export default function Home() {
	return (
		<div className="flex-1 flex p-3 sm:p-8">
			<main className="flex-1 flex flex-col items-center border border-kor-gold/20 px-6 pt-16 pb-10 sm:pt-20 text-center">
				{/* Logo: cropped to the glyph so the PNG padding doesn't push content down */}
				<div className="relative w-[72px] sm:w-[89px] aspect-[408/720] overflow-hidden">
					<Image
						src="/brand/kor-logo-gold.png"
						alt="KOR Taipei"
						width={1201}
						height={1201}
						priority
						className="absolute max-w-none w-[294.4%] left-[-97.5%] top-[-33.3%] mix-blend-lighten"
					/>
				</div>

				<div className="mt-12 flex items-center gap-4 sm:gap-5">
					<span className="h-px w-10 sm:w-16 bg-kor-gold" />
					<h1 className="font-display text-kor-gold text-[11px] sm:text-xs tracking-[0.5em] uppercase pl-[0.5em]">
						Thank You
					</h1>
					<span className="h-px w-10 sm:w-16 bg-kor-gold" />
				</div>

				<section className="mt-12 flex flex-col items-center gap-6 font-cjk font-light">
					<p className="text-base sm:text-lg tracking-[0.08em] text-white">
						感謝您對 <span className="font-sans">KOR</span> 的長期支持
					</p>
					<p className="text-base sm:text-lg tracking-[0.08em] leading-[2.1] text-kor-light-gray">
						若想收到未來的第一手消息
						<br />
						歡迎填入 email 並按下訂閱按鈕
					</p>
					<p className="text-base sm:text-lg tracking-[0.08em] text-white">
						感謝您的支持
					</p>
				</section>

				<span className="my-10 h-px w-8 bg-kor-dark-gray" />

				<section className="flex flex-col items-center gap-4 font-sans text-sm tracking-[0.03em]">
					<p className="text-white">
						Thank you for your long-standing support of KOR.
					</p>
					<p className="text-kor-light-gray leading-relaxed">
						To hear first about what comes next,
						<br />
						enter your email and press Subscribe.
					</p>
					<p className="text-white">Thank you for your support.</p>
				</section>

				<div className="mt-12 w-full flex justify-center">
					<SubscribeForm />
				</div>

				<footer className="mt-auto pt-16 font-display text-kor-dark-gray text-[11px] tracking-[0.4em] uppercase">
					KOR · Taipei
				</footer>
			</main>
		</div>
	);
}
