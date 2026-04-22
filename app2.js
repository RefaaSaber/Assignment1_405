async function searchCountry() {
    const query = document.getElementById('searchInput').value.trim();
    const results = document.getElementById('results');
    const status  = document.getElementById('statusMsg');

    if (!query) {
        status.textContent = 'Please enter a country name.';
        return;
    }

    results.innerHTML = '<p class="state-msg">Searching...</p>';
    status.textContent = '';

    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();

        status.textContent = `${data.length} result${data.length !== 1 ? 's' : ''} found`;
        results.innerHTML = '';

        const grid = document.createElement('div');
        grid.className = 'countries-grid';

        data.forEach((country) => {
            const name    = country.name?.common || 'N/A';
            const capital = country.capital?.[0] || 'N/A';
            const region  = country.region || 'N/A';
            const pop     = country.population ? country.population.toLocaleString() : 'N/A';
            const flag    = country.flags?.png || country.flags?.svg || '';
            const lang    = country.languages ? Object.values(country.languages)[0] : 'N/A';

            const card = document.createElement('div');
            card.className = 'country-card';
            card.innerHTML = `
                <div class="flag-wrap">
                    ${flag ? `<img src="${flag}" alt="Flag of ${name}" loading="lazy"/>` : '🏳️'}
                </div>
                <div class="card-body">
                    <h4>${name}</h4>
                    <div class="card-meta">
                        <span>🏛 ${capital}</span>
                        <span>🌐 ${region}</span>
                        <span>👥 ${pop}</span>
                        <span>🗣 ${lang}</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        results.appendChild(grid);

    } catch (err) {
        results.innerHTML = '<p class="state-msg">No countries found. Try a different name.</p>';
        status.textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') searchCountry();
    });
});