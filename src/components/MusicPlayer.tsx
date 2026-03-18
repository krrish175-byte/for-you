import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Song } from '../App';

interface Props {
    song: Song | null;
    isPlaying: boolean;
    progress: number;
    onTogglePlay: () => void;
}

export function MusicPlayer({ song, isPlaying, progress, onTogglePlay }: Props) {
    return (
        <AnimatePresence>
            {song && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 h-20 bg-white/70 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-between px-4 md:px-6 z-40 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.05)]"
                >
                    <div className="flex items-center gap-3 w-1/3 min-w-[120px]">
                        <div className="w-12 h-12 bg-[#d3d9d0] rounded overflow-hidden shadow-sm shrink-0 hidden sm:block">
                            <img src={song.coverUrl} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="truncate">
                            <div className="text-[#2c302e] font-serif text-[16px] md:text-[18px] truncate">{song.title}</div>
                            <div className="text-[#8b9987] text-[11px] md:text-xs truncate font-light">{song.artist}</div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center w-1/3 gap-1 md:gap-2">
                        <div className="flex items-center gap-4 md:gap-6">
                            <button className="text-[#aeb5ab] hover:text-[#2c302e] transition-colors hidden sm:block cursor-not-allowed">
                                <Shuffle className="w-3.5 h-3.5" />
                            </button>
                            <button className="text-[#8b9987] hover:text-[#2c302e] transition-colors cursor-not-allowed">
                                <SkipBack className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" />
                            </button>

                            <button
                                onClick={onTogglePlay}
                                className="w-8 h-8 md:w-9 md:h-9 bg-[#2c302e] text-white rounded-full flex items-center justify-center hover:bg-[#3a3f3c] transition-colors shadow-sm"
                            >
                                {isPlaying ? (
                                    <Pause className="w-3.5 h-3.5" fill="currentColor" />
                                ) : (
                                    <Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" />
                                )}
                            </button>

                            <button className="text-[#8b9987] hover:text-[#2c302e] transition-colors cursor-not-allowed">
                                <SkipForward className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" />
                            </button>
                            <button className="text-[#aeb5ab] hover:text-[#2c302e] transition-colors hidden sm:block cursor-not-allowed">
                                <Repeat className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="w-full max-w-[300px] flex items-center gap-2 hidden md:flex">
                            <span className="text-[10px] text-[#aeb5ab] w-8 text-right">
                                0:00
                            </span>
                            <div className="h-1 flex-1 bg-[#e4e9e3] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#8b9987] rounded-full transition-all duration-200 ease-linear"
                                    style={{ width: `${progress * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-[10px] text-[#aeb5ab] w-8">
                                {song.time}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 w-1/3">
                        <Volume2 className="w-4 h-4 text-[#8b9987] hidden sm:block" />
                        <div className="w-20 h-1 bg-[#e4e9e3] rounded-full overflow-hidden hidden sm:block">
                            <div className="w-2/3 h-full bg-[#8b9987] rounded-full"></div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
