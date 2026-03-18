import { Clock, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { Song } from '../App';

interface Props {
    currentSong: Song | null;
    isPlaying: boolean;
    onPlaySong: (song: Song) => void;
}

const songs: Song[] = [
    { id: 1, title: 'Rakhlo Tum Chupake', artist: 'Arpit Bala', album: 'Single', time: '1:35', coverUrl: '/rakhlo_cover.jpg', audioUrl: '/rakhlo.mp3' },
    { id: 2, title: 'Iss Tarah', artist: 'Chaar Diwaari & Sonu Nigam', album: 'Iss Tarah', time: '0:33', coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/6f/0d/2e/6f0d2eef-688a-6855-46c4-56ebd04b69ea/26UMGIM12049.rgb.jpg/100x100bb.jpg', audioUrl: '/iss_tarah.webm' },
    { id: 3, title: 'Barbaad', artist: 'The Rish & Jubin Nautiyal', album: 'Saiyaara', time: '5:57', coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c6/6a/a3/c66aa366-4522-14b8-c629-7cfee5422fc0/Saiyaara_Album_Cover.jpg/100x100bb.jpg', audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ae/de/89/aede8951-2c6b-b213-af40-d1a94b128501/mzaf_10600077031085269332.plus.aac.p.m4a' },
    { id: 4, title: 'Hua Hain Aaj Pehli Baar', artist: 'Amaal Mallik & Palak Muchhal', album: 'Sanam Re', time: '5:09', coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/fe/1d/e4/fe1de42c-cc56-cd1d-fd40-339bbfa8f0f3/8902894357647_cover.jpg/100x100bb.jpg', audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ef/d2/65/efd2653a-c84d-0d27-2908-951337c916c9/mzaf_9756161475334709933.plus.aac.p.m4a' },
    { id: 5, title: 'Jeene Laga Hoon', artist: 'Atif Aslam & Shreya Ghoshal', album: 'Ramaiya Vastavaiya', time: '3:56', coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/0c/f4/ac/0cf4acd9-9510-3c12-b453-50021a4985ec/8901854027637.jpg/100x100bb.jpg', audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/6c/42/27/6c42274a-832c-9c1b-b955-5328aa0e91b6/mzaf_14885254077776408990.plus.aac.p.m4a' },
    { id: 6, title: 'Khat', artist: 'Navjot Ahuja', album: 'Khat - Single', time: '4:56', coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ea/01/29/ea012994-51e8-6883-e1e1-c71fdd51754f/5026854264479.jpg/100x100bb.jpg', audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/41/71/a4/4171a467-7855-a584-6142-52418eee2cd6/mzaf_5236382006187510745.plus.aac.p.m4a' }
];

export function PlaylistScreen({ currentSong, isPlaying, onPlaySong }: Props) {
    const isListPlaying = isPlaying && currentSong !== null;

    return (
        <div className="max-w-4xl mx-auto px-6 pb-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-end gap-10 mb-12"
            >
                <div className="w-56 h-56 bg-[#d3d9d0] rounded flex items-center justify-center shrink-0 overflow-hidden shadow-sm relative group">
                    <img src="https://images.unsplash.com/photo-1518893063132-36e46dbe2428?q=80&w=400&auto=format&fit=crop" alt="Playlist Cover" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                <div className="flex-1 pb-2">
                    <p className="text-[10px] font-semibold tracking-widest text-[#8b9987] uppercase mb-3">Playlist</p>
                    <h1 className="font-serif text-6xl md:text-7xl text-[#2c302e] mb-4 italic">For You</h1>
                    <p className="text-[#646b66] mb-4 text-[15px] font-light">A collection of songs that remind me of you.</p>
                    <p className="text-[#8b9987] text-[10px] font-medium tracking-widest uppercase">Made for you • 6 songs</p>
                </div>
            </motion.div>

            <div className="mb-12">
                <button
                    onClick={() => onPlaySong(songs[0])}
                    className="w-14 h-14 bg-[#2c302e] rounded-full flex items-center justify-center hover:bg-[#3a3f3c] transition-colors shadow-sm"
                >
                    {isListPlaying ? (
                        <Pause className="w-5 h-5 text-white" fill="currentColor" />
                    ) : (
                        <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                    )}
                </button>
            </div>

            <div className="w-full">
                <div className="grid grid-cols-[auto_8fr_4fr_auto] gap-4 mb-4 text-[11px] font-medium text-[#8b9987] tracking-wider uppercase border-b border-[#d3d9d0] pb-3 px-2">
                    <div className="w-8 text-center">#</div>
                    <div>Title</div>
                    <div className="hidden sm:block">Album</div>
                    <div className="w-12 text-center"><Clock className="w-4 h-4 mx-auto opacity-70" /></div>
                </div>

                <div className="flex flex-col space-y-1">
                    {songs.map((song, i) => {
                        const isThisSongPlaying = currentSong?.id === song.id && isPlaying;

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                                key={song.id}
                                onClick={() => onPlaySong(song)}
                                className="grid grid-cols-[auto_8fr_4fr_auto] gap-4 items-center group hover:bg-[#eaeae4] p-2 rounded transition-colors cursor-pointer"
                            >
                                <div className="w-8 text-center text-[#8b9987] text-sm font-light">
                                    {isThisSongPlaying ? (
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                            className="w-2 h-2 bg-[#8b9987] rounded-full mx-auto"
                                        />
                                    ) : (
                                        <span>{song.id}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded overflow-hidden shadow-sm bg-[#d3d9d0] shrink-0">
                                        <img src={song.coverUrl} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className={`font-serif text-[18px] md:text-[20px] truncate ${isThisSongPlaying ? 'text-[#8b9987]' : 'text-[#2c302e]'}`}>
                                            {song.title}
                                        </div>
                                        <div className="text-[#646b66] text-[12px] font-light truncate">{song.artist}</div>
                                    </div>
                                </div>
                                <div className="text-[#646b66] text-[13px] font-light hidden sm:block truncate">{song.album}</div>
                                <div className="w-12 text-center text-[#646b66] text-[13px] font-light">{song.time}</div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
