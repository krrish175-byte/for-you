import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdorePoint {
    id: number;
    title: string;
    description: string;
}

const adorePoints: AdorePoint[] = [
    {
        id: 1,
        title: "Your Calmness",
        description: "The way you stay so composed and peaceful, even when everything around is chaotic. It's truly magnetic."
    },
    {
        id: 2,
        title: "Your Focus",
        description: "Seeing you completely immersed in your work, whether it's your laptop or listening in class. Your dedication is inspiring."
    },
    {
        id: 3,
        title: "Your Grace",
        description: "You have a quiet, effortless grace in the way you carry yourself and interact with others."
    },
    {
        id: 4,
        title: "Your Smile",
        description: "The way your whole face lights up. It's rare to see, but when it happens, it's the highlight of my day."
    },
    {
        id: 5,
        title: "Your Kindness",
        description: "Small gestures that show how much you care about the people around you, even if you do it quietly."
    },
    {
        id: 6,
        title: "Your Presence",
        description: "Just being in the same room as you makes everything feel a bit more balanced and bright."
    }
];

interface Props {
    onAllRevealed: () => void;
}

export function ThingsIAdore({ onAllRevealed }: Props) {
    const [revealedIds, setRevealedIds] = useState<number[]>([]);

    const handleCardClick = (id: number) => {
        if (!revealedIds.includes(id)) {
            setRevealedIds(prev => [...prev, id]);
        }
    };

    useEffect(() => {
        if (revealedIds.length === adorePoints.length) {
            onAllRevealed();
        }
    }, [revealedIds, onAllRevealed]);

    return (
        <div className="max-w-4xl mx-auto px-6 py-20 bg-transparent">
            <div className="text-center mb-16">
                <h2 className="text-[#8b9987] uppercase tracking-widest text-[11px] font-semibold mb-4 italic">REFLECTIONS</h2>
                <h1 className="font-serif text-5xl md:text-6xl text-[#2c302e] italic mb-6">Things I Adore</h1>
                <p className="text-[#646b66] font-light text-sm max-w-md mx-auto">
                    Tap each card to reveal a small piece of why you are so special to me.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adorePoints.map((point) => (
                    <motion.div
                        key={point.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: point.id * 0.1 }}
                        onClick={() => handleCardClick(point.id)}
                        className={`cursor-pointer rounded-xl p-8 h-64 flex flex-col items-center justify-center text-center transition-all duration-700 relative overflow-hidden group
              ${revealedIds.includes(point.id)
                                ? 'bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-[#eff3ee]'
                                : 'bg-[#eeeee7] border border-transparent hover:bg-[#e6e6dc]'}`}
                    >
                        <AnimatePresence mode="wait">
                            {revealedIds.includes(point.id) ? (
                                <motion.div
                                    key="description"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="space-y-4"
                                >
                                    <h3 className="font-serif text-xl text-[#2c302e] italic">{point.title}</h3>
                                    <p className="text-[#646b66] text-sm leading-relaxed font-light px-2">
                                        {point.description}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="front"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center space-y-4"
                                >
                                    <div className="w-10 h-10 rounded-full border border-[#d3d9d0] flex items-center justify-center">
                                        <span className="text-[#8b9987] font-serif text-lg">{point.id}</span>
                                    </div>
                                    <span className="text-[#8b9987] text-[10px] uppercase tracking-widest font-medium">Click to reveal</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!revealedIds.includes(point.id) && (
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ffffff20] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
