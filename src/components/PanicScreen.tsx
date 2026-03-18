import { motion } from 'framer-motion';

interface Props {
    onBack: () => void;
}

export function PanicScreen({ onBack }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#1a1c1b] flex flex-col items-center justify-center text-center p-6"
        >
            <div className="max-w-md w-full space-y-8">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="w-full aspect-video rounded-lg overflow-hidden border border-white/10"
                >
                    <img
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z2Nnd6bm50ZzB6Z3ZzemZ6Z3ZzemZ6Z3ZzemZ6Z3ZzemZ6Z3ZzJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/jUwpNzg9IcyrK/giphy.gif"
                        alt="Homer Simpson retreating into bushes"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl font-serif text-white italic">Understandable, have a great day.</h1>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">
                        I'll just go back to admiring you from a respectful distance. No weirdness, promise.
                    </p>
                </div>

                <button
                    onClick={onBack}
                    className="mt-8 text-white/50 hover:text-white text-xs uppercase tracking-widest underline decoration-white/20 underline-offset-8 transition-colors"
                >
                    Wait, take me back
                </button>
            </div>
        </motion.div>
    );
}
