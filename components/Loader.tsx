export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full bg-black">
            <div className="relative">
                <div className="absolute inset-0 bg-fuchsia-500/20 blur-[40px] rounded-full animate-pulse" />

                <div className="relative flex flex-col items-center">
                    <div className="w-16 h-16 border-t-2 border-r-2 border-[#59c99e]-500 rounded-full animate-spin shadow-[0_0_15px_#59c99e]" />
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <div className="w-32 h-[1px] bg-zinc-800 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#59c99e]-500 to-transparent animate-[shimmer_1.5s_infinite] -translate-x-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
