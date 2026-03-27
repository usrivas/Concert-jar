import "./Filters.css";

const YEARS = ["All", "2026", "2025", "2024", "2023"];

export default function Filters({ filter, setFilter, yearFilter, setYearFilter }) {
    return (
        <div className="filters-wrapper">
            {/* Search bar */}
            <div className="search-bar">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search by artist or location..."
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    aria-label="Search concerts by artist or location"
                    className="search-input"
                />
            </div>

            {/* Year filters */}
            <div className="year-filters" role="group" aria-label="Filter by year">
                <span className="filter-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Filter:
                </span>
                {YEARS.map(year => (
                    <button
                        key={year}
                        className={`year-pill ${yearFilter === year ? "active" : ""}`}
                        onClick={() => setYearFilter(year)}
                        aria-pressed={yearFilter === year}
                    >
                        {year}
                    </button>
                ))}
            </div>
        </div>
    );
}
