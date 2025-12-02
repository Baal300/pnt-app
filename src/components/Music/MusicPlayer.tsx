import { useEffect, useRef, useState } from "react";
import { fetchMusic } from "../../utils/api";
import { API_URL } from "../../constants/constants";
import MutedIcon from "../../assets/no_sound_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react";
import VolumeIcon from "../../assets/volume_up_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react";

export const MusicPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const defaultVolume = 0.2;
    const [volume, setVolume] = useState(defaultVolume);
    const [muted, setMuted] = useState(false);

    const loadBackgroundMusic = async () => {
        const audioSource = await fetchMusic(API_URL);
        if (audioRef.current && audioSource) {
            audioRef.current.src = audioSource;
            audioRef.current.volume = defaultVolume;
            audioRef.current.autoplay = false;
            audioRef.current.loop = true;
        } else {
            console.error("No audio source available");
        }
    };

    useEffect(() => {
        loadBackgroundMusic();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = muted;
        }
    }, [muted]);

    const startStopAudio = () => {
        if (audioRef.current) {
            if (audioRef.current.src === "") {
                throw new Error("No audio source");
            }

            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    };

    const handlePlayPause = () => {
        try {
            startStopAudio();
        } catch (error) {
            console.error(error, "Trying to reload audio");
            loadBackgroundMusic();
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value) / 100;

        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setVolume(newVolume);
    };

    const handleMute = () => {
        if (audioRef.current) {
            if (muted) {
                setMuted(false);
            } else {
                setMuted(true);
            }
        }
    };

    return (
        <div>
            <audio ref={audioRef} />
            <div className="join bg-base-200 rounded-box h-15 w-80 items-center justify-center gap-2 p-2 dark:bg-slate-700">
                <button
                    className="btn btn-circle btn-secondary join-item"
                    onClick={handlePlayPause}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                        />
                    </svg>
                </button>
                <div className="join-item flex items-center px-2">
                    <input
                        type="range"
                        min={0}
                        max="100"
                        value={volume * 100}
                        className="range range-sm range-primary w-40 dark:[--range-bg:var(--color-app-background)]"
                        onChange={handleVolumeChange}
                    />
                </div>
                <span className="join-item text-xs">
                    {Math.round(volume * 100)}
                </span>
                <button
                    className="join-item top-[100px] left-[30px] cursor-pointer"
                    onClick={handleMute}
                >
                    {muted ? (
                        <MutedIcon
                            height={"32px"}
                            width={"32px"}
                            className="dark:fill-gray-200"
                        />
                    ) : (
                        <VolumeIcon
                            height={"32px"}
                            width={"32px"}
                            className="dark:fill-gray-200"
                        />
                    )}
                </button>
            </div>
        </div>
    );
};
