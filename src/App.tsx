import { useState, useRef, useEffect } from 'react';
import { EntryScreen } from './components/EntryScreen';
import { LetterScreen } from './components/LetterScreen';
import { PlaylistScreen } from './components/PlaylistScreen';
import { DecisionScreen } from './components/DecisionScreen';
import { ThingsIAdore } from './components/ThingsIAdore';
import { MusicPlayer } from './components/MusicPlayer';
import { PanicScreen } from './components/PanicScreen';
import { AnimatePresence, motion } from 'framer-motion';
import { Cat, X } from 'lucide-react';

export interface Song {
    id: number;
    title: string;
    artist: string;
    album: string;
    time: string;
    coverUrl: string;
    audioUrl: string;
}

function App() {
    const [entered, setEntered] = useState(false);
    const [currentStep, setCurrentStep] = useState<'content' | 'decision' | 'panic'>('content');
    const [showMonologue, setShowMonologue] = useState(false);

    // Audio state
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [allAdoreRevealed, setAllAdoreRevealed] = useState(false);

    const handlePlaySong = (song: Song) => {
        if (currentSong?.id === song.id) {
            togglePlay();
        } else {
            setCurrentSong(song);
            setIsPlaying(true);
        }
    };

    const togglePlay = () => {
        if (currentSong) {
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play().catch(e => {
                console.error("Audio playback failed:", e);
                setIsPlaying(false);
            });
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying, currentSong]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            setProgress(duration ? current / duration : 0);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
    };

    return (
        <div className="min-h-screen bg-gradient-radial text-[#2c302e] font-sans selection:bg-[#d3d9d0] relative pb-32">
            <audio
                ref={audioRef}
                src={currentSong?.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />

            <AnimatePresence>
                {!entered && (
                    <motion.div
                        key="entry"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f5f0]"
                    >
                        <EntryScreen onEnter={() => setEntered(true)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {entered && currentStep === 'content' && (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <LetterScreen />
                    <PlaylistScreen
                        currentSong={currentSong}
                        isPlaying={isPlaying}
                        onPlaySong={handlePlaySong}
                    />

                    <ThingsIAdore onAllRevealed={() => setAllAdoreRevealed(true)} />

                    <div className="max-w-4xl mx-auto px-6 pb-20 flex justify-center mt-8">
                        <AnimatePresence>
                            {allAdoreRevealed && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center gap-6"
                                >
                                    <button
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            setCurrentStep('decision');
                                        }}
                                        className="bg-[#8b9987] text-white px-10 py-5 rounded tracking-[0.15em] uppercase text-sm hover:bg-[#72806e] transition-colors shadow-sm"
                                    >
                                        Continue to final step
                                    </button>

                                    <button
                                        onClick={() => setShowMonologue(true)}
                                        className="text-[#aeb5ab] hover:text-[#8b9987] text-[10px] uppercase tracking-[0.2em] italic underline underline-offset-4 transition-colors"
                                    >
                                        *Read my internal panic log while coding this*
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}

            <AnimatePresence>
                {showMonologue && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-[#f5f5f0]/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white border border-[#d3d9d0] w-full max-w-lg rounded-2xl shadow-xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-[#f5f5f0]">
                                <div className="flex items-center gap-3">
                                    <Cat className="w-5 h-5 text-[#8b9987]" />
                                    <h3 className="font-serif text-xl italic text-[#2c302e]">Developer's Log</h3>
                                </div>
                                <button
                                    onClick={() => setShowMonologue(false)}
                                    className="p-1 hover:bg-[#f5f5f0] rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-[#8b9987]" />
                                </button>
                            </div>

                            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
                                {[
                                    { day: "Day 1", text: "We are literally CS majors. Is making a website to ask her out too cliché? Will she just grade my UI/UX?" },
                                    { day: "Day 2", text: "Time spent prompting AI to help build the boilerplate: 5 minutes. Time spent overthinking every single word on this page: 4 hours." },
                                    { day: "Day 2", text: "Practiced asking her out in the mirror. Looked weird. Deploying a Vercel app is definitely the safer option." },
                                    { day: "Day 3", text: "Added a music player. If the code breaks, at least the vibes will be immaculate." },
                                    { day: "Launch", text: "Hovering over the send link button. Heart rate: 140bpm. If she says no, I'm changing my major to forestry." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#8b9987] w-14 shrink-0 pt-1">
                                            {item.day}
                                        </div>
                                        <div className="text-sm text-[#4a4f4c] font-light leading-relaxed">
                                            "{item.text}"
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {entered && currentStep === 'decision' && (
                <motion.div
                    key="decision"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative z-10 pt-20"
                >
                    <DecisionScreen onPanic={() => setCurrentStep('panic')} />
                </motion.div>
            )}

            {entered && currentStep === 'panic' && (
                <PanicScreen onBack={() => setCurrentStep('decision')} />
            )}

            {entered && (
                <MusicPlayer
                    song={currentSong}
                    isPlaying={isPlaying}
                    progress={progress}
                    onTogglePlay={togglePlay}
                />
            )}
        </div>
    );
}

export default App;
