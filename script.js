// Debug flag
const DEBUG = true;

function debug(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

// EmailJS Configuration
const emailConfig = {
    serviceId: 'service_5i8r67b',
    templateId: 'template_default',
    userId: 'YOUR_USER_ID' // Replace with your actual EmailJS user ID
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    debug('DOM loaded');
    initializeButtons();
    setupEventListeners();
});

function setupEventListeners() {
    // Book service buttons
    const bookButtons = document.querySelectorAll('.book-service-btn');
    debug('Found book service buttons:', bookButtons.length);
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.getAttribute('data-service');
            bookService(service);
        });
    });

    // Booking form submission
    const bookingForm = document.getElementById('service-booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // Issue analyzer
    const analyzeBtn = document.getElementById('analyze-issue-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeMainIssue);
    }
}

function initializeButtons() {
    debug('Initializing buttons...');
    
    // Add click handlers for all interactive elements
    document.querySelectorAll('[data-action]').forEach(element => {
        element.addEventListener('click', handleButtonClick);
    });
}

function handleButtonClick(e) {
    e.preventDefault();
    const action = e.target.getAttribute('data-action');
    
    switch(action) {
        case 'analyze':
            analyzeMainIssue();
            break;
        case 'diagnose':
            showDiagnosticModal();
            break;
        case 'scan':
            startSystemScan();
            break;
        case 'estimate':
            calculateEstimate();
            break;
        default:
            debug('Unknown action:', action);
    }
}

function analyzeMainIssue() {
    const issueInput = document.getElementById('main-issue');
    if (!issueInput) {
        debug('Issue input not found');
        return;
    }

    const issue = issueInput.value.trim();
    if (!issue) {
        alert('Please describe your issue first.');
        return;
    }

    // Show loading state
    const analyzeBtn = document.getElementById('analyze-issue-btn');
    if (analyzeBtn) {
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'Analyzing...';
    }

    // Simulate analysis (replace with actual API call)
    setTimeout(() => {
        const result = generateAnalysis(issue);
        showResultsModal('Analysis Results', result);
        
        // Reset button state
        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyze Issue';
        }
    }, 1500);
}

function generateAnalysis(issue) {
    // Simple analysis logic (replace with actual AI analysis)
    const commonIssues = {
        'slow': 'Your system may need optimization. Recommended actions:\n- Disk cleanup\n- Memory optimization\n- Background process review',
        'crash': 'System stability issues detected. Recommended actions:\n- Check system logs\n- Update drivers\n- Scan for malware',
        'virus': 'Potential security concern. Recommended actions:\n- Run full system scan\n- Update antivirus\n- Check startup programs',
        'default': 'General system check recommended. Our technicians can help diagnose and resolve your issue.'
    };

    const issueType = Object.keys(commonIssues).find(type => issue.toLowerCase().includes(type));
    return commonIssues[issueType] || commonIssues.default;
}

function bookService(service) {
    debug('Booking service:', service);
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.style.display = 'block';
        const serviceInput = document.getElementById('service-type');
        if (serviceInput) {
            serviceInput.value = service;
        }
    }
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    debug('Handling booking submission');

    const form = e.target;
    const formData = new FormData(form);
    
    try {
        const templateParams = {
            service_type: formData.get('service-type'),
            customer_name: formData.get('name'),
            customer_email: formData.get('email'),
            customer_phone: formData.get('phone'),
            message: formData.get('message')
        };

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        // Send email using EmailJS
        await emailjs.send(
            emailConfig.serviceId,
            emailConfig.templateId,
            templateParams,
            emailConfig.userId
        );

        alert('Booking request sent successfully! We will contact you shortly.');
        form.reset();
        document.getElementById('booking-form').style.display = 'none';
    } catch (error) {
        console.error('Booking submission error:', error);
        alert('There was an error sending your booking request. Please try again or contact us directly.');
    } finally {
        // Reset button state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Booking';
        }
    }
}

function showResultsModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 class="text-xl font-semibold mb-4">${title}</h3>
            <div class="mb-6 whitespace-pre-wrap">${content}</div>
            <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Close</button>
        </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector('button').onclick = () => modal.remove();
}

function showDiagnosticModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 class="text-xl font-bold mb-4">Diagnostic Results</h3>
            <div class="mb-6">
                <p class="font-semibold text-red-600 mb-2">System running slower than usual</p>
                <ul class="list-disc ml-4 mb-4 space-y-2 text-gray-700">
                    <li>Multiple startup programs causing slow boot times</li>
                    <li>Low disk space affecting system performance</li>
                    <li>Memory usage above recommended levels</li>
                </ul>
                <div class="bg-blue-50 p-4 rounded-lg">
                    <p class="font-semibold text-blue-800 mb-2">Recommended Actions:</p>
                    <ul class="list-disc ml-4 space-y-2 text-blue-700">
                        <li>Run system optimization</li>
                        <li>Perform disk cleanup</li>
                        <li>Consider RAM upgrade</li>
                    </ul>
                </div>
                <div class="mt-4 p-3 bg-green-50 rounded-lg">
                    <p class="text-green-800 font-medium">Estimated Service Cost: $90</p>
                </div>
            </div>
            <div class="flex gap-3">
                <button class="close-modal flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                    Close
                </button>
                <button class="book-service flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                    Book Service
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Add click handlers
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.querySelector('.book-service').addEventListener('click', () => {
        modal.remove();
        bookService('System Optimization');
    });
}

function handleFileUpload(input) {
    if (!input.files || !input.files[0]) {
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">Visual Analysis Results</h3>
                <img src="${e.target.result}" alt="Uploaded image" class="mb-4 max-h-48 mx-auto">
                <div class="mb-6">
                    <p class="font-semibold text-red-600 mb-2">Issues Detected:</p>
                    <ul class="list-disc ml-4 space-y-2">
                        <li>Hardware malfunction indicators present</li>
                        <li>System error code analysis required</li>
                    </ul>
                </div>
                <div class="flex gap-3">
                    <button class="close-modal flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                        Close
                    </button>
                    <button class="book-service flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                        Book Service
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('.book-service').addEventListener('click', () => {
            modal.remove();
            bookService('Hardware Diagnosis');
        });
    };

    reader.readAsDataURL(file);
}

function startPredictiveAnalysis() {
    const hardwareHealth = document.querySelector('#hardware-health .health-bar');
    const performanceTrend = document.querySelector('#performance-trend .health-bar');
    const securityStatus = document.querySelector('#security-status .health-bar');
    
    if (!hardwareHealth || !performanceTrend || !securityStatus) {
        console.error('Health bars not found');
        return;
    }

    // Reset health bars
    hardwareHealth.style.width = '0%';
    performanceTrend.style.width = '0%';
    securityStatus.style.width = '0%';

    // Simulate analysis
    setTimeout(() => {
        const values = {
            hardware: Math.floor(Math.random() * 40) + 30,
            performance: Math.floor(Math.random() * 30) + 40,
            security: Math.floor(Math.random() * 50) + 30
        };

        // Update health bars
        hardwareHealth.style.width = `${values.hardware}%`;
        performanceTrend.style.width = `${values.performance}%`;
        securityStatus.style.width = `${values.security}%`;

        // Update status text
        document.querySelectorAll('.health-status').forEach((status, index) => {
            const value = Object.values(values)[index];
            status.textContent = value < 50 ? 'Poor' : value < 70 ? 'Fair' : 'Good';
            status.className = `health-status text-sm font-medium ${
                value < 50 ? 'text-red-600' : value < 70 ? 'text-yellow-600' : 'text-green-600'
            }`;
        });

        // Show results modal
        showResultsModal(values.hardware, values.performance, values.security);
    }, 2000);
}

function calculateEstimate() {
    const issueSelect = document.getElementById('issue-type');
    const urgencySelect = document.getElementById('urgency-level');
    const deviceSelect = document.getElementById('device-type');
    
    if (!issueSelect || !urgencySelect || !deviceSelect) {
        console.error('Form elements not found');
        return;
    }

    const basePrice = {
        'software': 80,
        'hardware': 120,
        'network': 100,
        'security': 150
    }[issueSelect.value] || 100;

    const urgencyMultiplier = {
        'low': 1,
        'medium': 1.5,
        'high': 2
    }[urgencySelect.value] || 1;

    const deviceMultiplier = {
        'desktop': 1,
        'laptop': 1.2,
        'server': 2,
        'other': 1.5
    }[deviceSelect.value] || 1;

    const estimate = basePrice * urgencyMultiplier * deviceMultiplier;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 class="text-xl font-bold mb-4">Service Estimate</h3>
            <div class="mb-6">
                <div class="bg-blue-50 p-4 rounded-lg mb-4">
                    <p class="font-semibold text-blue-800">Service Details:</p>
                    <ul class="mt-2 space-y-1 text-blue-700">
                        <li>Issue Type: ${issueSelect.options[issueSelect.selectedIndex].text}</li>
                        <li>Urgency: ${urgencySelect.options[urgencySelect.selectedIndex].text}</li>
                        <li>Device: ${deviceSelect.options[deviceSelect.selectedIndex].text}</li>
                    </ul>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                    <p class="text-2xl font-bold text-green-800">Estimated Cost: $${Math.round(estimate)}</p>
                    <p class="text-sm text-green-600 mt-1">Final price may vary based on actual service requirements</p>
                </div>
            </div>
            <div class="flex gap-3">
                <button class="close-modal flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                    Close
                </button>
                <button class="book-service flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                    Book Service
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.querySelector('.book-service').addEventListener('click', () => {
        modal.remove();
        bookService(issueSelect.value);
    });
}

function startSystemScan() {
    const scanResults = {
        cpu: Math.floor(Math.random() * 40) + 30,
        memory: Math.floor(Math.random() * 30) + 40,
        disk: Math.floor(Math.random() * 50) + 30
    };

    updateHealthMetrics(scanResults.cpu, scanResults.memory, scanResults.disk);
    showResultsModal(scanResults.cpu, scanResults.memory, scanResults.disk);
}

function updateHealthMetrics(cpu, memory, disk) {
    updateHealthColors('cpu', cpu);
    updateHealthColors('memory', memory);
    updateHealthColors('disk', disk);
}

function updateHealthColors(type, value) {
    const element = document.getElementById(`${type}-health`);
    if (!element) return;

    const bar = element.querySelector('.health-bar');
    const status = element.querySelector('.health-status');
    
    if (bar) bar.style.width = `${value}%`;
    
    if (status) {
        status.textContent = value < 50 ? 'Poor' : value < 70 ? 'Fair' : 'Good';
        status.className = `health-status text-sm font-medium ${
            value < 50 ? 'text-red-600' : value < 70 ? 'text-yellow-600' : 'text-green-600'
        }`;
    }
}

function showResultsModal(cpu, memory, disk) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 class="text-xl font-bold mb-4">Scan Results</h3>
            <div class="mb-6">
                <div class="space-y-4">
                    <div>
                        <p class="font-medium">CPU Performance: ${cpu}%</p>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${cpu}%"></div>
                        </div>
                    </div>
                    <div>
                        <p class="font-medium">Memory Usage: ${memory}%</p>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${memory}%"></div>
                        </div>
                    </div>
                    <div>
                        <p class="font-medium">Disk Health: ${disk}%</p>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${disk}%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <p class="font-semibold text-yellow-800">Recommendations:</p>
                    <ul class="list-disc ml-4 mt-2 space-y-1 text-yellow-700">
                        <li>Schedule regular maintenance</li>
                        <li>Optimize system performance</li>
                        <li>Update system drivers</li>
                    </ul>
                </div>
            </div>
            <div class="flex gap-3">
                <button class="close-modal flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                    Close
                </button>
                <button class="book-service flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                    Book Service
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.querySelector('.book-service').addEventListener('click', () => {
        modal.remove();
        bookService('System Maintenance');
    });
}
