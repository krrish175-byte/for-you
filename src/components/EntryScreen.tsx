import { motion } from 'framer-motion';

interface EntryScreenProps {
    onEnter: () => void;
}

export function EntryScreen({ onEnter }: EntryScreenProps) {
    return (
        <div className="fixed inset-0 bg-[#f5f5f0] flex flex-col items-center justify-center text-[#2c302e] z-50">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="flex flex-col items-center max-w-md w-full px-6 text-center"
            >
                <div className="w-12 h-[1px] bg-[#d3d9d0] mx-auto mb-10"></div>

                <h1 className="text-2xl md:text-3xl font-serif italic mb-6 tracking-widest uppercase">
                    SECURITY CLEARANCE REQUIRED
                </h1>

                <p className="text-[#646b66] leading-relaxed font-light mb-12 text-sm italic">
                    Warning: Do not proceed if your friends are currently looking over your shoulder.
                    This deployment requires strict screen privacy. Proceed only when the perimeter is secure.
                </p>

                <button
                    onClick={onEnter}
                    className="border border-[#b8c2b5] text-[#4a4f4c] hover:bg-white/50 transition-colors px-10 py-4 rounded tracking-[0.2em] font-light text-xs uppercase relative group overflow-hidden"
                >
                    <span className="relative z-10">The perimeter is secure</span>
                </button>
            </motion.div>
        </div>
    );
}
