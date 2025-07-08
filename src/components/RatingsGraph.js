import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const RatingsGraph = ({ ratings }) => {
    const chartRef = useRef();

    useEffect(() => {
        if (!ratings || ratings.length === 0) return;

        const ctx = chartRef.current.getContext('2d');

        // Gradient fill
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(255, 206, 86, 0.8)');
        gradient.addColorStop(0.5, 'rgba(75, 192, 192, 0.8)');
        gradient.addColorStop(1, 'rgba(54, 162, 235, 0.8)');

        const ratingData = Array.from({ length: 11 }, (_, index) => {
            const ratingValue = index * 0.5;
            const count = ratings.filter((rating) => rating === ratingValue).length;
            return count;
        });

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({ length: 11 }, (_, index) => index * 0.5),
                datasets: [{
                    label: 'Number of Movies',
                    data: ratingData,
                    backgroundColor: gradient,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                }],
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            // Customize tick marks
                            callback: function(value) {
                                if (value === 1) return '★';
                                if (value === 10) return '★★★★★';
                                return ''; // Return an empty string for all other values
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                    },
                    y: {
                        display: false,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const rating = context.label;
                                return `${context.parsed.y} movie(s) rated ${'★'.repeat(rating) + (rating % 1 ? '½' : '')}`;
                            }
                        }
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        // Clean up chart instance on unmount
        return () => chart.destroy();
    }, [ratings]);

    return (
        <div style={{ position: "relative", height: "150px", width: "350px" }}>
            <canvas ref={chartRef} />
        </div>
    );
};
