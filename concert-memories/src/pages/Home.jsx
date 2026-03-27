import { useState, useMemo, useCallback } from "react";
import Jar from "../components/Jar";
import Filters from "../components/Filters";
import JarOpenOverlay from "../components/JarOpenOverlay";
import jarsData from "../data/jars.json";
import "./Home.css";

export default function Home() {
    const [filter, setFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("All");
    const [selectedJar, setSelectedJar] = useState(null);

    const filteredJars = useMemo(() => {
        return jarsData.filter(jar => {
            const matchesSearch =
                jar.artist.toLowerCase().includes(filter.toLowerCase()) ||
                jar.location.toLowerCase().includes(filter.toLowerCase());
            const matchesYear =
                yearFilter === "All" || jar.date.includes(yearFilter);
            return matchesSearch && matchesYear;
        });
    }, [filter, yearFilter]);

    const handleOpen = useCallback((jar) => {
        setSelectedJar(jar);
    }, []);

    return (
        <div className="home">
            {/* Starfield background */}
            <div className="starfield" aria-hidden="true">
                {Array.from({ length: 60 }).map((_, i) => (
                    <span key={i} className="star" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                        width: `${1 + Math.random() * 2}px`,
                        height: `${1 + Math.random() * 2}px`,
                    }} />
                ))}
            </div>

            {/* Hero header */}
            <header className="home-hero">
                <h1 className="home-title">Concert Memory Journal</h1>
                <p className="home-subtitle">Preserve your magical moments in glass jars of light</p>
            </header>

            {/* Filters */}
            <section className="home-filters" aria-label="Search and filter concerts">
                <Filters
                    filter={filter}
                    setFilter={setFilter}
                    yearFilter={yearFilter}
                    setYearFilter={setYearFilter}
                />
            </section>

            {/* Jar grid */}
            <main className="home-grid-wrapper">
                {filteredJars.length > 0 ? (
                    <div className="jar-grid" role="list">
                        {filteredJars.map(jar => (
                            <div key={jar.id} role="listitem">
                                <Jar
                                    {...jar}
                                    onOpen={() => handleOpen(jar)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <span className="no-results-icon">🫙</span>
                        <p>No memories found. Try a different search.</p>
                    </div>
                )}
            </main>

            {/* Jar open animation overlay */}
            {selectedJar && (
                <JarOpenOverlay
                    jar={selectedJar}
                    onDone={() => setSelectedJar(null)}
                />
            )}
        </div>
    );
}