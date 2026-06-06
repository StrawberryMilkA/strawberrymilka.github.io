(function() {
    const colors = ['#e2b04a','#5a8fcf','#6abf69','#e05d5d','#9b59b6','#f39c12','#1abc9c'];
    const datasets = ratingData.students.map((s, idx) => ({
        label: s.name,
        data: s.ratingHistory,
        borderColor: colors[idx % colors.length],
        backgroundColor: colors[idx % colors.length] + '20',
        borderWidth: 2.5,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.2,
        fill: false
    }));

    const ctx = document.getElementById('ratingChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ratingData.labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16 } },
                tooltip: { callbacks: { label: (ctx) => ctx.dataset.label + ': ' + ctx.parsed.y } }
            },
            scales: {
                y: { beginAtZero: false, min: 1300, max: 1700, title: { display: true, text: 'Rating' } }
            }
        }
    });
})();