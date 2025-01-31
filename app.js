// AI Diagnostic System
class AIDiagnostic {
    constructor() {
        this.symptoms = [];
        this.commonIssues = {
            'slow_performance': {
                description: 'System running slower than usual',
                solutions: ['Run system optimization', 'Check for malware', 'Upgrade RAM'],
                estimatedCost: 90
            },
            'virus_infection': {
                description: 'Potential virus or malware infection',
                solutions: ['Run antivirus scan', 'Remove malicious software', 'Install security updates'],
                estimatedCost: 90
            },
            'network_issues': {
                description: 'Network connectivity problems',
                solutions: ['Check network settings', 'Reset router', 'Update network drivers'],
                estimatedCost: 90
            }
        };
    }

    addSymptom(symptom) {
        this.symptoms.push(symptom);
    }

    analyzeSystems() {
        // Simulate AI analysis
        return new Promise(resolve => {
            setTimeout(() => {
                const diagnosis = {
                    issues: this.symptoms.map(symptom => ({
                        problem: this.commonIssues[symptom].description,
                        solutions: this.commonIssues[symptom].solutions,
                        estimatedCost: this.commonIssues[symptom].estimatedCost
                    })),
                    totalEstimatedCost: this.symptoms.reduce((acc, symptom) => 
                        acc + this.commonIssues[symptom].estimatedCost, 0
                    )
                };
                resolve(diagnosis);
            }, 1500);
        });
    }

    async scanSystem() {
        try {
            const metrics = await this.getSystemMetrics();
            return {
                cpu: metrics.cpu,
                memory: metrics.memory,
                disk: metrics.disk,
                issues: metrics.issues
            };
        } catch (error) {
            console.error('Error scanning system:', error);
            throw error;
        }
    }

    async getSystemMetrics() {
        // In a real implementation, this would use the Windows Management Instrumentation (WMI)
        // or other system APIs to get actual metrics
        return new Promise((resolve) => {
            // Simulate getting real system metrics
            setTimeout(() => {
                resolve({
                    cpu: {
                        usage: Math.floor(Math.random() * 100),
                        temperature: Math.floor(Math.random() * 40) + 40
                    },
                    memory: {
                        total: 16384, // MB
                        used: Math.floor(Math.random() * 16384),
                        processes: Math.floor(Math.random() * 100) + 50
                    },
                    disk: {
                        total: 512000, // MB
                        free: Math.floor(Math.random() * 512000),
                        health: 'Good'
                    },
                    issues: this.detectIssues()
                });
            }, 2000);
        });
    }

    detectIssues() {
        const issues = [];
        
        // Simulate issue detection based on metrics
        if (Math.random() > 0.7) {
            issues.push({
                type: 'warning',
                component: 'Memory',
                description: 'High memory usage detected',
                solution: 'Consider closing unused applications or upgrading RAM'
            });
        }
        
        if (Math.random() > 0.8) {
            issues.push({
                type: 'error',
                component: 'Disk',
                description: 'Disk fragmentation detected',
                solution: 'Run disk defragmentation'
            });
        }

        return issues;
    }

    async analyzeIssue(description) {
        // In a real implementation, this would use natural language processing
        // to analyze the issue description and provide relevant solutions
        return new Promise((resolve) => {
            setTimeout(() => {
                const keywords = description.toLowerCase();
                const analysis = {
                    probableCauses: [],
                    recommendations: [],
                    severity: 'medium'
                };

                if (keywords.includes('slow') || keywords.includes('freeze')) {
                    analysis.probableCauses.push('System resource exhaustion');
                    analysis.recommendations.push('Check for resource-intensive applications');
                    analysis.recommendations.push('Run system optimization');
                }

                if (keywords.includes('virus') || keywords.includes('malware')) {
                    analysis.probableCauses.push('Potential malware infection');
                    analysis.recommendations.push('Run full system antivirus scan');
                    analysis.severity = 'high';
                }

                if (keywords.includes('internet') || keywords.includes('network')) {
                    analysis.probableCauses.push('Network connectivity issues');
                    analysis.recommendations.push('Check network adapter settings');
                    analysis.recommendations.push('Test connection stability');
                }

                // Default recommendations if no specific keywords found
                if (analysis.probableCauses.length === 0) {
                    analysis.probableCauses.push('General system issue');
                    analysis.recommendations.push('Run system diagnostics');
                    analysis.recommendations.push('Check system logs');
                }

                resolve(analysis);
            }, 1500);
        });
    }

    async optimizeSystem(options) {
        // In a real implementation, this would use system APIs to perform actual optimizations
        return new Promise((resolve) => {
            setTimeout(() => {
                const results = {
                    optimizations: [],
                    improvements: {}
                };

                if (options.startup) {
                    results.optimizations.push({
                        type: 'Startup Programs',
                        action: 'Analyzed and optimized startup items',
                        improvement: Math.floor(Math.random() * 30) + 10 + '% faster boot time'
                    });
                }

                if (options.disk) {
                    results.optimizations.push({
                        type: 'Disk Cleanup',
                        action: 'Removed temporary files and optimized disk space',
                        improvement: Math.floor(Math.random() * 20) + 5 + 'GB freed'
                    });
                }

                if (options.registry) {
                    results.optimizations.push({
                        type: 'Registry',
                        action: 'Cleaned and optimized registry entries',
                        improvement: 'Registry optimization complete'
                    });
                }

                resolve(results);
            }, 3000);
        });
    }

    async analyzeImage(imageFile) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
                // Simulate AI image analysis
                setTimeout(() => {
                    const analysis = {
                        errorType: 'Blue Screen Error',
                        errorCode: 'STOP: 0x0000007B',
                        confidence: 0.92,
                        description: 'System boot device inaccessible',
                        recommendations: [
                            'Check hard drive connections',
                            'Verify boot configuration',
                            'Run disk diagnostics'
                        ],
                        severity: 'high'
                    };
                    resolve(analysis);
                }, 2000);
            };
            reader.readAsDataURL(imageFile);
        });
    }

    async predictMaintenance() {
        // Simulate AI predictive analysis
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    hardware: {
                        status: 'Good',
                        score: 85,
                        predictions: [
                            'RAM usage trending higher than normal',
                            'SSD has 2 years of estimated life remaining'
                        ]
                    },
                    performance: {
                        status: 'Warning',
                        score: 72,
                        predictions: [
                            'System boot time increasing',
                            'Background processes affecting performance'
                        ]
                    },
                    security: {
                        status: 'Good',
                        score: 90,
                        predictions: [
                            'All security measures up to date',
                            'No suspicious activities detected'
                        ]
                    }
                });
            }, 2500);
        });
    }

    calculateEstimate(category, severity, details) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Base prices for different categories
                const basePrices = {
                    hardware: 120,
                    software: 90,
                    network: 100,
                    virus: 80,
                    data: 150
                };

                // Severity multipliers
                const severityMultipliers = {
                    low: 1,
                    medium: 1.5,
                    high: 2
                };

                // Calculate base estimate
                const basePrice = basePrices[category] || 100;
                const multiplier = severityMultipliers[severity] || 1;
                const estimate = basePrice * multiplier;

                // Add complexity based on details
                const words = details.split(' ').length;
                const complexityFactor = Math.min(1.3, 1 + (words / 100));

                const finalEstimate = Math.round(estimate * complexityFactor);

                // Round to nearest 5
                finalEstimate = Math.ceil(finalEstimate / 5) * 5;

                // Estimate hours (1 hour minimum)
                const timeEstimate = Math.max(1, Math.ceil(finalEstimate / 90));

                resolve({
                    estimatedCost: finalEstimate,
                    estimatedHours: timeEstimate,
                    priceRange: {
                        min: Math.round(finalEstimate * 0.8),
                        max: Math.round(finalEstimate * 1.2)
                    },
                    breakdown: {
                        basePrice,
                        severityMultiplier: multiplier,
                        complexityFactor: complexityFactor.toFixed(2)
                    }
                });
            }, 1500);
        });
    }
}

// Chat System
class AIChat {
    constructor() {
        this.isOpen = false;
        this.messages = [];
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.updateUI();
    }

    addMessage(message, isUser = true) {
        this.messages.push({
            text: message,
            isUser,
            timestamp: new Date()
        });
        this.updateUI();
    }

    updateUI() {
        // Update chat UI (to be implemented)
    }

    async getAIResponse(message) {
        // Simulate AI response
        return new Promise(resolve => {
            setTimeout(() => {
                const responses = [
                    "I understand you're having computer issues. Could you describe the symptoms in more detail?",
                    "Based on your description, this sounds like a common issue. Let me help you troubleshoot.",
                    "I recommend starting with a basic system scan. Would you like me to guide you through that?",
                ];
                resolve(responses[Math.floor(Math.random() * responses.length)]);
            }, 1000);
        });
    }
}

// Booking System
class BookingSystem {
    constructor() {
        this.availableSlots = this.generateAvailableSlots();
        this.bookings = new Map(); // Store bookings in memory
        // Store owner's email for notifications
        this.ownerEmail = "support@westlacomputerexpert.tech"; // Replace with your actual email
    }

    generateAvailableSlots() {
        const slots = [];
        const today = new Date();
        
        // Generate slots for the next 7 days
        for (let i = 1; i <= 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Add morning and afternoon slots
            slots.push({
                date: date,
                time: '09:00',
                available: true
            }, {
                date: date,
                time: '14:00',
                available: true
            });
        }
        return slots;
    }

    async bookService(service, slot) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const booking = {
                    id: Math.random().toString(36).substr(2, 9),
                    service: service,
                    date: slot.date,
                    time: slot.time,
                    status: 'pending',
                    createdAt: new Date(),
                    estimatedDuration: '1-2 hours',
                    technician: 'John Smith',
                    location: 'West LA Computer Expert Shop',
                    customerName: document.getElementById('customer-name').value,
                    customerEmail: document.getElementById('customer-email').value,
                    customerPhone: document.getElementById('customer-phone').value,
                    notes: document.getElementById('booking-notes').value
                };
                
                // Store booking in memory and localStorage
                this.bookings.set(booking.id, booking);
                const existingBookings = localStorage.getItem('bookings');
                const bookingsMap = existingBookings ? new Map(JSON.parse(existingBookings)) : new Map();
                bookingsMap.set(booking.id, booking);
                localStorage.setItem('bookings', JSON.stringify(Array.from(bookingsMap.entries())));
                
                // Send email notification
                this.sendBookingNotification(booking);
                
                resolve(booking);
            }, 1000);
        });
    }

    async sendBookingNotification(booking) {
        try {
            // Send notification to the owner
            await emailjs.send(
                "service_5i8r67b",
                "template_91xgo8x",
                {
                    customer_name: booking.customerName,
                    customer_email: booking.customerEmail,
                    customer_phone: booking.customerPhone,
                    service_type: booking.service,
                    preferred_date: new Date(booking.date).toLocaleDateString(),
                    preferred_time: booking.time,
                    booking_id: booking.id,
                    additional_notes: booking.notes || 'No additional notes',
                    to_email: this.ownerEmail
                }
            );

            // Send confirmation to the customer
            await emailjs.send(
                "service_5i8r67b",
                "template_7tcp9kf",
                {
                    to_name: booking.customerName,
                    customer_email: booking.customerEmail,
                    service_type: booking.service,
                    preferred_date: new Date(booking.date).toLocaleDateString(),
                    preferred_time: booking.time,
                    booking_id: booking.id,
                    shop_email: this.ownerEmail,
                    shop_phone: "(310) 850-8093"
                }
            );
        } catch (error) {
            console.error('Failed to send booking notification:', error);
        }
    }

    async getBooking(bookingId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const booking = this.bookings.get(bookingId);
                if (booking) {
                    resolve(booking);
                } else {
                    reject(new Error('Booking not found'));
                }
            }, 500);
        });
    }

    getAvailableSlots() {
        return this.availableSlots.filter(slot => slot.available);
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Initialize diagnostic system
    const diagnostic = new AIDiagnostic();
    
    // Debug: Check if we can find the button
    const startDiagnosticBtn = document.getElementById('startDiagnostic');
    console.log('Start Diagnostic Button:', startDiagnosticBtn);

    if (startDiagnosticBtn) {
        console.log('Adding click handler to button');
        startDiagnosticBtn.onclick = function() {
            console.log('Button clicked!');
            
            // Create a simple modal
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
            modal.innerHTML = `
                <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                    <h3 class="text-xl font-bold mb-4">Diagnostic Results</h3>
                    <div class="mb-4">
                        <div class="mb-3">
                            <p class="font-semibold">System running slower than usual</p>
                            <ul class="list-disc ml-4">
                                <li>Run system optimization</li>
                                <li>Check for malware</li>
                                <li>Upgrade RAM</li>
                            </ul>
                            <p class="text-green-600 mt-2">Estimated Cost: $90</p>
                        </div>
                    </div>
                    <p class="font-bold text-lg">Total Estimated Cost: $90</p>
                    <button onclick="this.closest('.fixed').remove()" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full mt-4">
                        Close
                    </button>
                </div>
            `;
            document.body.appendChild(modal);
            console.log('Modal added to body');
        };
        console.log('Click handler added successfully');
    } else {
        console.error('Could not find diagnostic button!');
    }
});

// UI Helper Functions
function showDiagnosticResults(results) {
    const modalHtml = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">Diagnostic Results</h3>
                <div class="mb-4">
                    ${results.issues.map(issue => `
                        <div class="mb-3">
                            <p class="font-semibold">${issue.problem}</p>
                            <ul class="list-disc ml-4">
                                ${issue.solutions.map(solution => `<li>${solution}</li>`).join('')}
                            </ul>
                            <p class="text-green-600 mt-2">Estimated Cost: $${issue.estimatedCost}</p>
                        </div>
                    `).join('')}
                </div>
                <p class="font-bold text-lg">Total Estimated Cost: $${results.totalEstimatedCost}</p>
                <button onclick="this.closest('.fixed').remove()" class="btn btn-primary w-full mt-4">
                    Close
                </button>
            </div>
        </div>
    `;

    const modalElement = document.createElement('div');
    modalElement.innerHTML = modalHtml;
    document.body.appendChild(modalElement.firstElementChild);
}

function showBookingModal(service, availableSlots) {
    return new Promise((resolve) => {
        const modalHtml = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                    <h3 class="text-xl font-bold mb-4">Book ${service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                    <div class="mb-4">
                        <label class="block mb-2">Select Date and Time:</label>
                        <select class="w-full p-2 border rounded" id="slot-select">
                            ${availableSlots.map(slot => `
                                <option value="${slot.date.toISOString()},${slot.time}">
                                    ${slot.date.toLocaleDateString()} at ${slot.time}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="flex justify-end space-x-2">
                        <button onclick="this.closest('.fixed').remove(); resolve(null)" class="px-4 py-2 border rounded hover:bg-gray-100">
                            Cancel
                        </button>
                        <button onclick="confirmBooking(this)" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Add global function for booking confirmation
        window.confirmBooking = function(button) {
            const select = document.getElementById('slot-select');
            const [date, time] = select.value.split(',');
            const slot = {
                date: new Date(date),
                time: time
            };
            button.closest('.fixed').remove();
            resolve(slot);
        };
    });
}

function showBookingConfirmation(booking) {
    const modalHtml = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">Booking Confirmed!</h3>
                <div class="mb-4">
                    <p>Your booking has been confirmed for ${booking.service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}.</p>
                    <p class="mt-2">Date: ${booking.date.toLocaleDateString()}</p>
                    <p>Time: ${booking.time}</p>
                    <p class="mt-2">Booking ID: ${booking.id}</p>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function showIssuesModal(issues) {
    const modalHtml = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">System Issues Detected</h3>
                <div class="mb-4">
                    ${issues.map(issue => `
                        <div class="mb-3 p-3 ${issue.type === 'error' ? 'bg-red-50' : 'bg-yellow-50'} rounded">
                            <p class="font-semibold">${issue.component}: ${issue.description}</p>
                            <p class="text-gray-600 mt-1">Solution: ${issue.solution}</p>
                        </div>
                    `).join('')}
                </div>
                <button onclick="this.closest('.fixed').remove()" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function showAnalysisModal(analysis) {
    const modalHtml = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">Issue Analysis</h3>
                <div class="mb-4">
                    <div class="mb-3">
                        <h4 class="font-semibold">Severity Level:</h4>
                        <p class="capitalize ${analysis.severity === 'high' ? 'text-red-600' : 'text-yellow-600'}">
                            ${analysis.severity}
                        </p>
                    </div>
                    <div class="mb-3">
                        <h4 class="font-semibold">Probable Causes:</h4>
                        <ul class="list-disc ml-4">
                            ${analysis.probableCauses.map(cause => `<li>${cause}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="mb-3">
                        <h4 class="font-semibold">Recommendations:</h4>
                        <ul class="list-disc ml-4">
                            ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function showOptimizationResults(results) {
    const modalHtml = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">Optimization Results</h3>
                <div class="mb-4">
                    ${results.optimizations.map(opt => `
                        <div class="mb-3 p-3 bg-green-50 rounded">
                            <p class="font-semibold">${opt.type}</p>
                            <p class="text-gray-600">${opt.action}</p>
                            <p class="text-green-600 mt-1">Improvement: ${opt.improvement}</p>
                        </div>
                    `).join('')}
                </div>
                <button onclick="this.closest('.fixed').remove()" class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function updateHealthIndicator(element, status, score) {
    const statusElement = element.querySelector('.health-status');
    const barElement = element.querySelector('.health-bar');
    
    statusElement.textContent = status;
    barElement.style.width = `${score}%`;
    
    // Update color based on score
    if (score >= 80) {
        barElement.classList.remove('bg-yellow-600', 'bg-red-600');
        barElement.classList.add('bg-green-600');
    } else if (score >= 60) {
        barElement.classList.remove('bg-green-600', 'bg-red-600');
        barElement.classList.add('bg-yellow-600');
    } else {
        barElement.classList.remove('bg-green-600', 'bg-yellow-600');
        barElement.classList.add('bg-red-600');
    }
}

function showPredictionReport(prediction) {
    const modalHtml = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">System Health Prediction</h3>
                <div class="space-y-4">
                    <div class="p-3 rounded ${prediction.hardware.score >= 80 ? 'bg-green-50' : 'bg-yellow-50'}">
                        <h4 class="font-semibold">Hardware Health</h4>
                        <p>Status: ${prediction.hardware.status}</p>
                        <ul class="list-disc ml-4 mt-2">
                            ${prediction.hardware.predictions.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="p-3 rounded ${prediction.performance.score >= 80 ? 'bg-green-50' : 'bg-yellow-50'}">
                        <h4 class="font-semibold">Performance Trend</h4>
                        <p>Status: ${prediction.performance.status}</p>
                        <ul class="list-disc ml-4 mt-2">
                            ${prediction.performance.predictions.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="p-3 rounded ${prediction.security.score >= 80 ? 'bg-green-50' : 'bg-yellow-50'}">
                        <h4 class="font-semibold">Security Analysis</h4>
                        <p>Status: ${prediction.security.status}</p>
                        <ul class="list-disc ml-4 mt-2">
                            ${prediction.security.predictions.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function createModal(options) {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50';
    
    modalContainer.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold">${options.title}</h3>
                ${options.showClose ? `
                    <button class="text-gray-400 hover:text-gray-600" onclick="this.closest('.modal-container').remove()">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                ` : ''}
            </div>
            <div class="space-y-4">
                ${options.content}
            </div>
        </div>
    `;

    document.body.appendChild(modalContainer);
}

function showEstimateModal(estimate, category) {
    const modalHtml = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">Service Cost Estimate</h3>
                <div class="space-y-4">
                    <div class="text-lg font-semibold text-blue-600">
                        Estimated Cost: $${estimate.estimatedCost}
                    </div>
                    <div class="space-y-2">
                        <p><strong>Service:</strong> ${category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                        <p><strong>Severity:</strong> ${estimate.severity.charAt(0).toUpperCase() + estimate.severity.slice(1)}</p>
                        <p><strong>Estimated Time:</strong> ${estimate.estimatedHours} hour${estimate.estimatedHours > 1 ? 's' : ''}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg mb-4 text-left">
                        <p class="font-medium mb-2">Price Breakdown:</p>
                        <ul class="mt-2 space-y-1">
                            <li>Base Price: $${estimate.breakdown.basePrice}</li>
                            <li>Severity Multiplier: ${estimate.breakdown.severityMultiplier}x</li>
                            <li>Complexity Factor: ${estimate.breakdown.complexityFactor}x</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-4 flex space-x-2">
                    <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-200 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-300">
                        Close
                    </button>
                    <button onclick="window.location.href='#services'" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                        Book Service
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function showBookingDetails(booking) {
    const bookingDetails = document.getElementById('booking-details');
    const statusColor = booking.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600';
    
    bookingDetails.innerHTML = `
        <div class="border-b pb-4">
            <div class="flex justify-between items-center">
                <h4 class="font-semibold">Booking ID:</h4>
                <span class="font-mono">${booking.id}</span>
            </div>
            <div class="flex justify-between items-center mt-2">
                <h4 class="font-semibold">Status:</h4>
                <span class="${statusColor} font-semibold">${booking.status.toUpperCase()}</span>
            </div>
        </div>
        <div class="py-4 space-y-2">
            <div class="flex justify-between">
                <span class="font-semibold">Service:</span>
                <span>${booking.service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Date:</span>
                <span>${booking.date.toLocaleDateString()}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Time:</span>
                <span>${booking.time}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Duration:</span>
                <span>${booking.estimatedDuration}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Technician:</span>
                <span>${booking.technician}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Location:</span>
                <span>${booking.location}</span>
            </div>
        </div>
        <div class="pt-4 border-t">
            <button onclick="window.location.href='#services'" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full">
                Book Another Service
            </button>
        </div>
    `;
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Create and insert quiz HTML
    const servicesSection = document.getElementById('services');
    const quizSection = document.createElement('section');
    quizSection.id = 'quiz';
    quizSection.className = 'py-16 bg-white';
    quizSection.innerHTML = `
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-8">Test Your Computer Knowledge</h2>
            <form id="quiz-form" class="max-w-2xl mx-auto">
                <div class="quiz-question bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-semibold mb-4">What is the first step you should take when your computer won't turn on?</h3>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-3">
                            <input type="radio" name="q1" value="restart">
                            <span>Force restart the computer</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="radio" name="q1" value="check-power" data-correct="true">
                            <span>Check if it's properly plugged in</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="radio" name="q1" value="call-support">
                            <span>Call technical support</span>
                        </label>
                    </div>
                    <div class="mt-4 space-y-3">
                        <div class="feedback"></div>
                        <button type="button" class="try-again-btn hidden bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Try Again
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `;
    servicesSection.after(quizSection);

    // Add quiz functionality
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        const questions = quizForm.querySelectorAll('.quiz-question');
        
        questions.forEach(question => {
            const options = question.querySelectorAll('input[type="radio"]');
            const feedbackDiv = question.querySelector('.feedback');
            const tryAgainBtn = question.querySelector('.try-again-btn');
            
            // Function to reset the question
            const resetQuestion = () => {
                options.forEach(opt => {
                    opt.checked = false;
                    opt.disabled = false;
                    opt.parentElement.classList.remove('correct-answer', 'incorrect-answer');
                });
                feedbackDiv.textContent = '';
                feedbackDiv.className = 'feedback';
                tryAgainBtn.classList.add('hidden');
            };

            // Add click handler for Try Again button
            tryAgainBtn.addEventListener('click', resetQuestion);
            
            options.forEach(option => {
                option.addEventListener('change', (e) => {
                    // Remove previous feedback
                    options.forEach(opt => {
                        opt.disabled = true; // Disable all options after selection
                        opt.parentElement.classList.remove('correct-answer', 'incorrect-answer');
                    });
                    
                    const isCorrect = option.getAttribute('data-correct') === 'true';
                    
                    // Add appropriate class and feedback
                    if (isCorrect) {
                        option.parentElement.classList.add('correct-answer');
                        feedbackDiv.textContent = 'Correct! Well done!';
                        feedbackDiv.className = 'feedback text-green-600 mt-2';
                    } else {
                        option.parentElement.classList.add('incorrect-answer');
                        feedbackDiv.textContent = 'Incorrect. Try again!';
                        feedbackDiv.className = 'feedback text-red-600 mt-2';
                    }

                    // Show Try Again button
                    tryAgainBtn.classList.remove('hidden');
                });
            });
        });
    }
});
