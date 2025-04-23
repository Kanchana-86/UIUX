document.addEventListener('DOMContentLoaded', function() {
    // Initialize metrics with their colors
    const metrics = {
        happiness: { color: '#10B981', data: [] },
        energy: { color: '#F59E0B', data: [] },
        physical: { color: '#3B82F6', data: [] },
        mental: { color: '#8B5CF6', data: [] },
        emotional: { color: '#EC4899', data: [] },
        wellness: { color: '#F97316', data: [] }
    };

    // Generate initial weekly data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    days.forEach(day => {
        Object.keys(metrics).forEach(metric => {
            metrics[metric].data.push(Math.floor(Math.random() * 40) + 60);
        });
    });

    // Set up Chart.js
    const ctx = document.getElementById('trendsChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: Object.keys(metrics).map(metric => ({
                label: metric.charAt(0).toUpperCase() + metric.slice(1),
                data: metrics[metric].data,
                borderColor: metrics[metric].color,
                backgroundColor: metrics[metric].color + '20',
                tension: 0.4,
                fill: true
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#fff',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#374151'
                    },
                    ticks: {
                        color: '#9CA3AF'
                    }
                },
                x: {
                    grid: {
                        color: '#374151'
                    },
                    ticks: {
                        color: '#9CA3AF'
                    }
                }
            }
        }
    });

    // Handle slider changes
    document.querySelectorAll('.metric-slider').forEach(slider => {
        slider.addEventListener('input', function() {
            const metric = this.dataset.metric;
            const value = this.value;
            const card = this.closest('.metric-card');
            
            // Update value display
            card.querySelector('.metric-value').textContent = value + '%';
            
            // Update progress bar
            card.querySelector('.progress').style.width = value + '%';
            
            // Update latest data point in chart
            const datasetIndex = Object.keys(metrics).indexOf(metric);
            chart.data.datasets[datasetIndex].data[6] = parseInt(value);
            chart.update();
            
            // Add subtle animation to the card
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Add hover effects to metric cards
    document.querySelectorAll('.metric-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const metric = this.querySelector('.metric-slider').dataset.metric;
            const datasetIndex = Object.keys(metrics).indexOf(metric);
            
            // Highlight the corresponding chart line
            chart.data.datasets.forEach((dataset, index) => {
                dataset.borderWidth = index === datasetIndex ? 3 : 1;
            });
            chart.update();
        });

        card.addEventListener('mouseleave', function() {
            // Reset all line widths
            chart.data.datasets.forEach(dataset => {
                dataset.borderWidth = 2;
            });
            chart.update();
        });
    });
});