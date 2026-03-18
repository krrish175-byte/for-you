import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MessageCircle } from 'lucide-react';
import { notify } from '../App';

interface Props {
    onPanic: () => void;
}

export function DecisionScreen({ onPanic }: Props) {
    const [needTime, setNeedTime] = useState(false);
    const [yesPressedOnce, setYesPressedOnce] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const handleNo = () => {
        notify('I NEED TIME');
        setNeedTime(true);
    };

    const handleYes = () => {
        if (!yesPressedOnce) {
            notify('YES (Initial)');
            setYesPressedOnce(true);
        } else {
            notify('FINAL YES CONFIRMED!');
            setAccepted(true);
            triggerConfetti();
        }
    };

    const triggerConfetti = () => {
        const end = Date.now() + 3 * 1000;
        const colors = ['#f5f5f0', '#d3d9d0', '#8b9987', '#2c302e'];

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
                shapes: ['circle']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
                shapes: ['circle']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    if (needTime) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-transparent">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="max-w-md w-full"
                >
                    <div className="w-12 h-[1px] bg-[#d3d9d0] mx-auto mb-8"></div>
                    <h1 className="text-3xl md:text-4xl font-serif text-[#2c302e] mb-6 italic">Take all the time you need.</h1>
                    <p className="text-[#646b66] leading-relaxed font-light mb-10">
                        I am just glad I got to tell you.
                    </p>

                    <a
                        href="https://wa.me/917864887037?text=Hey,%20I%20need%20some%20time%20to%20think%20about%20everything."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white border border-[#d3d9d0] text-[#4a4f4c] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#f5f5f0] transition-colors shadow-sm group"
                    >
                        <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                        Text me whenever you're ready
                    </a>
                </motion.div>
            </div>
        );
    }

    if (accepted) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center p-6 bg-[#f5f5f0] overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="z-10 max-w-xl w-full"
                >
                    <div className="text-6xl mb-8 opacity-90">🌿🕊️🤍</div>
                    <h1 className="text-5xl md:text-7xl font-serif text-[#2c302e] mb-8 italic">Thank You.</h1>
                    <p className="text-lg md:text-xl text-[#4a4f4c] leading-relaxed font-light mb-12">
                        You just made me the happiest guy ever. I promise to keep every word I said.
                    </p>

                    <a
                        href="https://wa.me/917864887037?text=Yes!%20I've%20just%20seen%20your%20message%20and%20I'm%20smiling.%20🤍"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white border border-[#d3d9d0] text-[#4a4f4c] px-8 py-4 rounded-full text-sm font-medium hover:bg-white/80 transition-all hover:scale-105 shadow-sm group"
                    >
                        <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                        Tell me on WhatsApp
                    </a>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 pb-40">
            <div className="w-12 h-[1px] bg-[#d3d9d0] mx-auto mb-16"></div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={yesPressedOnce ? 'serious' : 'decide'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center w-full max-w-2xl"
                >
                    <h1 className="text-3xl md:text-4xl font-serif text-[#2c302e] mb-4 italic">
                        {yesPressedOnce
                            ? "Are you really serious?"
                            : "What did you decide?"}
                    </h1>

                    {!yesPressedOnce && (
                        <p className="text-[#8b9987] text-sm uppercase tracking-widest mb-12">Take your time, there's no rush</p>
                    )}

                    <div className={`flex flex-col items-center justify-center w-full ${yesPressedOnce ? 'mt-8' : ''}`}>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
                            <button
                                onClick={handleYes}
                                className="bg-[#2c302e] text-white px-10 py-4 rounded font-light tracking-wide shadow-sm hover:bg-[#3a3f3c] transition-all duration-500 w-full md:w-auto min-w-[200px]"
                            >
                                {yesPressedOnce ? "Yes, I am! 🤍" : "Yes"}
                            </button>

                            <button
                                onClick={handleNo}
                                className="bg-transparent border border-[#d3d9d0] text-[#646b66] px-8 py-4 rounded font-light tracking-wide hover:bg-white/50 transition-all duration-500 w-full md:w-auto min-w-[200px]"
                            >
                                {yesPressedOnce ? "Wait, I clicked by mistake" : "I need some time to think"}
                            </button>
                        </div>

                        {!yesPressedOnce && (
                            <button
                                onClick={onPanic}
                                className="mt-12 text-[#aeb5ab] hover:text-[#8b9987] text-[10px] uppercase tracking-[0.2em] underline underline-offset-4 transition-colors"
                            >
                                Panic button (if this is all too much)
                            </button>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
