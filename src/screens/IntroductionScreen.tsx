import introVideo from "~/assets/videos/intro.mp4";

type IntroductionScreenProps = Readonly<{
    onContinue: () => void;
}>;

export default function IntroductionScreen({ onContinue }: IntroductionScreenProps) {
    return (
        <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
            <div className="absolute inset-0">
                <video autoPlay loop muted className="h-full w-full object-cover">
                    <source src={introVideo} />
                </video>

                <div className="absolute inset-0 bg-dark-900/40 backdrop-blur-sm" />
                <div className="x-asfalt-light-texture absolute inset-0 op-30" />
            </div>

            <div className="relative mx-a h-full max-w-3xl w-full flex flex-col items-center justify-center">
                <div className="animate-vanishIn bungee-regular text-center text-20">
                    Mystic Heist
                </div>

                <div className="mt-10">
                    <button
                        type="button"
                        className="animate-boingInUp animate-delay-1000 border border-emerald rounded-lg bg-emerald-8 px-6 py-2 text-lg font-semibold shadow-xl"
                        onClick={onContinue}
                    >
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    );
}
