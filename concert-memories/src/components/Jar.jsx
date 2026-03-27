import "./Jar.css";

export default function Jar({ artist, location, date, color, glowColor, emoji, onOpen }) {
    return (
        <button
            className="jar-card"
            style={{ "--jar-color": color, "--jar-glow": glowColor }}
            onClick={onOpen}
            aria-label={`Open memory: ${artist} at ${location} on ${date}`}
        >
            {/* Jar SVG shape */}
            <div className="jar-wrapper">
                <svg
                    className="jar-svg"
                    viewBox="0 0 120 160"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    {/* Lid */}
                    <rect x="30" y="8" width="60" height="14" rx="4" className="jar-lid" />
                    <rect x="36" y="4" width="48" height="10" rx="3" className="jar-lid-top" />

                    {/* Jar body */}
                    <rect x="18" y="22" width="84" height="124" rx="12" className="jar-body" />

                    {/* Inner glow fill */}
                    <rect x="22" y="26" width="76" height="116" rx="10" className="jar-fill" />

                    {/* Shimmer highlight */}
                    <rect x="28" y="34" width="14" height="40" rx="7" className="jar-highlight" />

                    {/* Fireflies / sparkles */}
                    <circle cx="55" cy="80" r="2.5" className="firefly f1" />
                    <circle cx="75" cy="60" r="2" className="firefly f2" />
                    <circle cx="45" cy="110" r="2" className="firefly f3" />
                    <circle cx="80" cy="100" r="1.8" className="firefly f4" />
                    <circle cx="62" cy="55" r="1.5" className="firefly f5" />
                </svg>

                {/* Emoji inside jar */}
                <span className="jar-emoji" aria-hidden="true">{emoji}</span>
            </div>

            {/* Info below jar */}
            <div className="jar-info">
                <p className="jar-artist">✦ {artist}</p>
                <p className="jar-location">{location}</p>
                <p className="jar-date">{date}</p>
            </div>
        </button>
    );
}
