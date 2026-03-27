import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import jarsData from "../data/jars.json";
import "./GalleryPage.css";

// Placeholder media tiles — in a real app these would be real photo/video assets
const PLACEHOLDER_TILES = [
    { type: "photo", label: "Opening set" },
    { type: "video", label: "First song" },
    { type: "photo", label: "Crowd moment" },
    { type: "photo", label: "Light show" },
    { type: "video", label: "Best moment" },
    { type: "photo", label: "Stage wide" },
    { type: "photo", label: "Close up" },
    { type: "video", label: "Encore" },
    { type: "photo", label: "Setlist" },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.06, delayChildren: 0.2 },
    },
};

const tileVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export default function GalleryPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const jar = jarsData.find(j => String(j.id) === String(id));

    if (!jar) {
        return (
            <div className="gallery-not-found">
                <p>Memory not found. <button onClick={() => navigate("/")}>Go home</button></p>
            </div>
        );
    }

    return (
        <div
            className="gallery-page"
            style={{ "--jar-color": jar.color, "--jar-glow": jar.glowColor }}
        >
            {/* Ambient glow blob behind header */}
            <div className="gallery-glow-blob" aria-hidden="true" />

            {/* Back button */}
            <motion.button
                className="gallery-back"
                onClick={() => navigate("/")}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                aria-label="Back to home"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18" aria-hidden="true">
                    <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All Memories
            </motion.button>

            {/* Concert header */}
            <motion.header
                className="gallery-header"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="gallery-emoji" aria-hidden="true">{jar.emoji}</span>
                <h1 className="gallery-artist">{jar.artist}</h1>
                <p className="gallery-meta">{jar.location} · {jar.date}</p>

                {/* Divider */}
                <div className="gallery-divider" />

                <p className="gallery-count">{PLACEHOLDER_TILES.length} memories captured</p>
            </motion.header>

            {/* Media grid */}
            <motion.div
                className="gallery-grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                role="list"
                aria-label={`Concert memories for ${jar.artist}`}
            >
                {PLACEHOLDER_TILES.map((tile, i) => (
                    <motion.button
                        key={i}
                        className={`gallery-tile tile-${tile.type} ${i === 0 ? "tile-featured" : ""}`}
                        variants={tileVariants}
                        whileHover={{ scale: 1.03, boxShadow: `0 0 32px var(--jar-glow)` }}
                        whileTap={{ scale: 0.97 }}
                        role="listitem"
                        aria-label={`${tile.label} — ${tile.type}`}
                    >
                        {/* Gradient fill */}
                        <div className="tile-bg" />

                        {/* Type badge */}
                        <span className="tile-badge">
                            {tile.type === "video" ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" aria-hidden="true">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            )}
                            {tile.type}
                        </span>

                        {/* Upload placeholder */}
                        <div className="tile-placeholder">
                            <span className="tile-plus">+</span>
                            <span className="tile-label">{tile.label}</span>
                        </div>
                    </motion.button>
                ))}

                {/* Add new memory tile */}
                <motion.button
                    className="gallery-tile tile-add"
                    variants={tileVariants}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Add new memory"
                >
                    <span className="add-icon">+</span>
                    <span className="add-label">Add memory</span>
                </motion.button>
            </motion.div>
        </div>
    );
}