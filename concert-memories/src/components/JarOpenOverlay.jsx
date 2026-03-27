import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./JarOpenOverlay.css";

// Generate spark particles with random angles/distances
function generateSparks(count = 14) {
    return Array.from({ length: count }, (_, i) => {
        const angle = (360 / count) * i + (Math.random() * 24 - 12);
        const dist = 80 + Math.random() * 60;
        const rad = (angle * Math.PI) / 180;
        return {
            id: i,
            tx: Math.cos(rad) * dist,
            // bias upward: negate y so positive = up, allow some sideways sparks
            ty: -(Math.abs(Math.sin(rad)) * dist + 30 + Math.random() * 40),
            size: 4 + Math.random() * 6,
            delay: Math.random() * 0.12,
            duration: 0.45 + Math.random() * 0.25,
        };
    });
}

const sparks = generateSparks(16);

export default function JarOpenOverlay({ jar, onDone }) {
    const navigate = useNavigate();
    const doneRef = useRef(false);

    // After the full sequence (~1.6s) navigate to gallery
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!doneRef.current) {
                doneRef.current = true;
                navigate(`/gallery/${jar.id}`);
                onDone?.();
            }
        }, 1650);
        return () => clearTimeout(timer);
    }, [jar.id, navigate, onDone]);

    return (
        <AnimatePresence>
            <motion.div
                className="overlay-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {/* Flash layer — appears last */}
                <motion.div
                    className="overlay-flash"
                    style={{ background: jar.glowColor }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 0, 0.85, 1] }}
                    transition={{ duration: 1.65, times: [0, 0.55, 0.7, 0.88, 1], ease: "easeIn" }}
                />

                {/* Centered stage — jar body + lid + sparks */}
                <div className="overlay-stage">

                    {/* ── Spark particles ── */}
                    {sparks.map(spark => (
                        <motion.span
                            key={spark.id}
                            className="spark"
                            style={{
                                width: spark.size,
                                height: spark.size,
                                background: jar.color,
                                boxShadow: `0 0 ${spark.size * 2}px ${jar.glowColor}`,
                            }}
                            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                            animate={{
                                x: spark.tx,
                                y: spark.ty,
                                scale: [1, 1.4, 0],
                                opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                                delay: 0.55 + spark.delay,   // sparks start after lid flies off
                                duration: spark.duration,
                                ease: "easeOut",
                            }}
                        />
                    ))}

                    {/* ── Jar body (static, glows) ── */}
                    <motion.div
                        className="overlay-jar"
                        initial={{ scale: 0.7, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        <svg
                            viewBox="0 0 120 160"
                            xmlns="http://www.w3.org/2000/svg"
                            className="overlay-jar-svg"
                            style={{ filter: `drop-shadow(0 0 32px ${jar.glowColor})` }}
                        >
                            {/* Jar body */}
                            <rect x="18" y="22" width="84" height="124" rx="12" fill="rgba(10,6,20,0.65)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
                            {/* Inner glow */}
                            <rect x="22" y="26" width="76" height="116" rx="10" fill={jar.color} opacity="0.22" />
                            {/* Highlight */}
                            <rect x="28" y="36" width="14" height="44" rx="7" fill="rgba(255,255,255,0.15)" />
                        </svg>

                        {/* Emoji */}
                        <motion.span
                            className="overlay-emoji"
                            initial={{ y: 0, scale: 1 }}
                            animate={{ y: [-2, -28, -60, -120], scale: [1, 1.4, 1.2, 0.6], opacity: [1, 1, 1, 0] }}
                            transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
                        >
                            {jar.emoji}
                        </motion.span>

                        {/* ── Lid — flies off ── */}
                        <motion.svg
                            viewBox="0 0 120 26"
                            xmlns="http://www.w3.org/2000/svg"
                            className="overlay-lid"
                            style={{ originX: "60px", originY: "13px" }}
                            initial={{ rotate: 0, y: 0, opacity: 1 }}
                            animate={{
                                rotate: [-2, -30, -90, -140],
                                y: [0, -40, -130, -220],
                                x: [0, -10, -30, -60],
                                opacity: [1, 1, 0.8, 0],
                            }}
                            transition={{ delay: 0.25, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <rect x="12" y="8" width="96" height="14" rx="4" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                            <rect x="18" y="2" width="84" height="10" rx="3" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.32)" strokeWidth="1" />
                        </motion.svg>
                    </motion.div>

                    {/* Artist label */}
                    <motion.p
                        className="overlay-label"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.3 }}
                    >
                        Opening <strong>{jar.artist}</strong>…
                    </motion.p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
