// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up event listeners');

    // Button functionality
    function showDiagnosticModal() {
        console.log('Showing diagnostic modal');
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
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
                    <button class="close-modal flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200">
                        Close
                    </button>
                    <button class="book-appointment flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                        Book Appointment
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add click handler to close button
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.remove();
        });

        // Add click handler to book appointment button
        modal.querySelector('.book-appointment').addEventListener('click', function() {
            modal.remove();
            const bookingForm = document.getElementById('booking-form');
            if (bookingForm) {
                bookingForm.scrollIntoView({ behavior: 'smooth' });
                // Pre-fill service type if available
                const serviceSelect = document.getElementById('booking-service');
                if (serviceSelect) {
                    serviceSelect.value = 'System Optimization';
                }
            }
        });
    }

    function handleFileUpload(input) {
        const resultDiv = document.getElementById('visual-analysis-result');
        if (!resultDiv) return;

        resultDiv.innerHTML = `
            <div class="animate-pulse">
                <p class="font-semibold mb-2">Analyzing image...</p>
                <div class="h-2 bg-blue-200 rounded w-3/4 mb-2"></div>
                <div class="h-2 bg-blue-200 rounded w-1/2"></div>
            </div>
        `;
        resultDiv.classList.remove('hidden');

        setTimeout(() => {
            resultDiv.innerHTML = `
                <div>
                    <p class="font-semibold mb-2">Analysis Complete</p>
                    <p class="text-green-600 mb-2">✓ Issue Identified: Blue Screen Error</p>
                    <div class="bg-gray-50 p-3 rounded">
                        <p class="font-medium">Recommended Actions:</p>
                        <ul class="list-disc ml-4 mt-1">
                            <li>Update graphics drivers</li>
                            <li>Run memory diagnostic</li>
                            <li>Check for Windows updates</li>
                        </ul>
                    </div>
                    <button class="book-service bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full mt-4">
                        Book Repair Service
                    </button>
                </div>
            `;

            // Add click handler to book service button
            resultDiv.querySelector('.book-service').addEventListener('click', function() {
                document.getElementById('booking-form').scrollIntoView({behavior: 'smooth'});
            });
        }, 2000);
    }

    function startPredictiveAnalysis() {
        console.log('Starting predictive analysis...');
        
        // Get all health bars and status elements
        const healthBars = document.querySelectorAll('.health-bar');
        const healthStatuses = document.querySelectorAll('.health-status');
        
        // Simulate analysis with random values
        healthBars.forEach(bar => {
            const width = Math.floor(Math.random() * 100);
            console.log('Setting health bar width:', width);
            
            // Animate the bar
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width + '%';
            
            // Update color based on health
            if (width < 50) {
                bar.classList.remove('bg-green-600');
                bar.classList.add('bg-red-600');
            } else {
                bar.classList.remove('bg-red-600');
                bar.classList.add('bg-green-600');
            }
        });

        // Update status text
        healthStatuses.forEach(status => {
            const rand = Math.random();
            const newStatus = rand > 0.7 ? 'Good' : rand > 0.3 ? 'Fair' : 'Poor';
            console.log('Setting health status:', newStatus);
            status.textContent = newStatus;
            
            // Add color to status text
            if (newStatus === 'Good') {
                status.className = 'health-status text-green-600 font-medium';
            } else if (newStatus === 'Fair') {
                status.className = 'health-status text-yellow-600 font-medium';
            } else {
                status.className = 'health-status text-red-600 font-medium';
            }
        });
    }

    function calculateEstimate() {
        const issueType = document.getElementById('issue-type').value;
        const urgencyLevel = document.getElementById('urgency-level').value;
        const description = document.getElementById('issue-description').value;

        // Calculate base price based on issue type
        let basePrice = 0;
        switch (issueType) {
            case 'Hardware Problem':
                basePrice = 150;
                break;
            case 'Software Issue':
                basePrice = 100;
                break;
            case 'Network Problem':
                basePrice = 120;
                break;
            case 'Data Recovery':
                basePrice = 200;
                break;
            default:
                basePrice = 100;
        }

        // Apply urgency multiplier
        let urgencyMultiplier = 1;
        switch (urgencyLevel) {
            case 'Urgent':
                urgencyMultiplier = 1.5;
                break;
            case 'Emergency':
                urgencyMultiplier = 2;
                break;
            default:
                urgencyMultiplier = 1;
        }

        // Calculate final price
        const total = Math.round(basePrice * urgencyMultiplier);

        // Create and show estimate modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">Price Estimate</h3>
                <div class="mb-4">
                    <p class="font-semibold mb-2">Issue Details:</p>
                    <ul class="list-none space-y-2">
                        <li><span class="font-medium">Type:</span> ${issueType}</li>
                        <li><span class="font-medium">Urgency:</span> ${urgencyLevel}</li>
                        <li><span class="font-medium">Description:</span> ${description || 'Not provided'}</li>
                    </ul>
                    <p class="text-2xl font-bold text-green-600 mt-4">Estimated Cost: $${total}</p>
                    <p class="text-sm text-gray-500 mt-2">*Final price may vary based on detailed diagnosis</p>
                </div>
                <div class="flex gap-4">
                    <button class="close-modal bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 flex-1">
                        Close
                    </button>
                    <button class="book-service bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex-1">
                        Book Service
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add click handlers
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            modal.remove();
        });

        const bookButton = modal.querySelector('.book-service');
        bookButton.addEventListener('click', function() {
            modal.remove();
            document.getElementById('booking-form').scrollIntoView({behavior: 'smooth'});
        });
    }

    // System Health Scanner
    const scanButton = document.getElementById('start-scan');
    if (scanButton) {
        scanButton.addEventListener('click', startSystemScan);
    }

    function startSystemScan() {
        // Disable button
        const button = document.getElementById('start-scan');
        button.disabled = true;
        button.textContent = 'Scanning...';
        button.classList.add('opacity-50');

        // Generate random health values
        const cpuHealth = Math.floor(Math.random() * 30) + 70; // 70-100
        const memoryHealth = Math.floor(Math.random() * 40) + 40; // 40-80
        const diskHealth = Math.floor(Math.random() * 50) + 30; // 30-80

        // Update the UI after a short delay
        setTimeout(() => {
            updateHealthMetrics(cpuHealth, memoryHealth, diskHealth);
            showResultsModal(cpuHealth, memoryHealth, diskHealth);
            
            // Re-enable button
            button.disabled = false;
            button.textContent = 'Start System Scan';
            button.classList.remove('opacity-50');
        }, 1500);
    }

    function updateHealthMetrics(cpu, memory, disk) {
        // Update percentages
        document.getElementById('cpu-health').textContent = cpu + '%';
        document.getElementById('memory-health').textContent = memory + '%';
        document.getElementById('disk-health').textContent = disk + '%';

        // Update bars
        document.getElementById('cpu-bar').style.width = cpu + '%';
        document.getElementById('memory-bar').style.width = memory + '%';
        document.getElementById('disk-bar').style.width = disk + '%';

        // Update colors
        updateHealthColors('cpu', cpu);
        updateHealthColors('memory', memory);
        updateHealthColors('disk', disk);
    }

    function updateHealthColors(type, value) {
        const bar = document.getElementById(type + '-bar');
        const text = document.getElementById(type + '-health');
        
        let color;
        if (value >= 80) {
            color = 'green';
        } else if (value >= 60) {
            color = 'yellow';
        } else {
            color = 'red';
        }

        // Remove all color classes
        bar.classList.remove('bg-green-600', 'bg-yellow-500', 'bg-red-500');
        text.classList.remove('text-green-600', 'text-yellow-500', 'text-red-500');

        // Add appropriate color class
        bar.classList.add(`bg-${color}-${color === 'green' ? '600' : '500'}`);
        text.classList.add(`text-${color}-${color === 'green' ? '600' : '500'}`);
    }

    function showResultsModal(cpu, memory, disk) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
        
        const getStatus = (value) => value >= 80 ? '✓ Good' : value >= 60 ? '⚠ Fair' : '⚠ Poor';
        const getColor = (value) => value >= 80 ? 'text-green-600' : value >= 60 ? 'text-yellow-500' : 'text-red-500';

        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">System Health Report</h3>
                <div class="mb-4">
                    <p class="font-semibold mb-2">Scan Results:</p>
                    <ul class="list-none space-y-3">
                        <li>
                            <span class="font-medium">CPU Health:</span>
                            <span class="ml-2 ${getColor(cpu)}">
                                ${cpu}% ${getStatus(cpu)}
                            </span>
                        </li>
                        <li>
                            <span class="font-medium">Memory Status:</span>
                            <span class="ml-2 ${getColor(memory)}">
                                ${memory}% ${getStatus(memory)}
                            </span>
                        </li>
                        <li>
                            <span class="font-medium">Disk Health:</span>
                            <span class="ml-2 ${getColor(disk)}">
                                ${disk}% ${getStatus(disk)}
                            </span>
                        </li>
                    </ul>
                    <div class="mt-4 p-3 ${Math.min(cpu, memory, disk) < 60 ? 'bg-red-50' : 'bg-gray-50'} rounded">
                        <p class="font-medium">Recommendations:</p>
                        <ul class="list-disc ml-4 mt-1">
                            ${cpu < 80 ? '<li>Optimize running processes</li>' : ''}
                            ${memory < 80 ? '<li>Clear unused memory</li>' : ''}
                            ${disk < 80 ? '<li>Run disk cleanup and defragmentation</li>' : ''}
                            ${Math.min(cpu, memory, disk) < 60 ? '<li>Schedule a maintenance service</li>' : ''}
                        </ul>
                    </div>
                </div>
                <div class="flex gap-4">
                    <button class="close-modal bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 flex-1">
                        Close
                    </button>
                    <button class="book-service bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex-1">
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
            document.getElementById('booking-form').scrollIntoView({behavior: 'smooth'});
        });
    }

    // AI Issue Analyzer
    const initAIAnalyzer = () => {
        const analyzeButton = document.getElementById('analyze-issue');
        const issueTextarea = document.getElementById('issue-description');
        
        if (!analyzeButton || !issueTextarea) {
            console.error('AI Analyzer elements not found:', {
                button: !!analyzeButton,
                textarea: !!issueTextarea
            });
            return;
        }

        analyzeButton.onclick = (e) => {
            e.preventDefault();
            const description = issueTextarea.value.trim();
            
            if (!description) {
                alert('Please describe your issue first.');
                return;
            }

            // Disable button
            analyzeButton.disabled = true;
            analyzeButton.textContent = 'Analyzing...';
            analyzeButton.classList.add('opacity-50');

            // Analysis logic
            const analysis = {
                diagnosis: '',
                solutions: [],
                severity: { level: 0, text: '', color: '' }
            };

            // Analyze the issue
            if (description.toLowerCase().includes('slow')) {
                analysis.diagnosis = 'Your computer is experiencing performance issues.';
                analysis.solutions = [
                    'Close unnecessary background applications',
                    'Run disk cleanup',
                    'Check for malware',
                    'Consider upgrading RAM'
                ];
                analysis.severity = { level: 60, text: 'Moderate', color: 'yellow-500' };
            } else if (description.toLowerCase().includes('virus')) {
                analysis.diagnosis = 'Potential malware infection detected.';
                analysis.solutions = [
                    'Run full system scan',
                    'Update antivirus',
                    'Remove suspicious programs',
                    'Consider professional cleaning'
                ];
                analysis.severity = { level: 90, text: 'High', color: 'red-500' };
            } else {
                analysis.diagnosis = 'General system issue detected.';
                analysis.solutions = [
                    'Run system diagnostics',
                    'Check for updates',
                    'Verify connections',
                    'Consider professional inspection'
                ];
                analysis.severity = { level: 40, text: 'Low', color: 'green-600' };
            }

            // Create modal
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
            modal.innerHTML = `
                <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                    <h3 class="text-xl font-bold mb-4">AI Analysis Results</h3>
                    <div class="mb-6">
                        <div class="mb-4">
                            <h4 class="font-semibold mb-2">Your Issue:</h4>
                            <p class="text-gray-700 bg-gray-50 p-3 rounded">${description}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="font-semibold mb-2">Diagnosis:</h4>
                            <p class="text-gray-700">${analysis.diagnosis}</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="font-semibold mb-2">Solutions:</h4>
                            <ul class="list-disc ml-4 space-y-2">
                                ${analysis.solutions.map(solution => `<li>${solution}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="bg-blue-50 p-3 rounded">
                            <h4 class="font-semibold mb-2">Severity:</h4>
                            <div class="flex items-center">
                                <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                                    <div class="bg-${analysis.severity.color} rounded-full h-2" 
                                         style="width: ${analysis.severity.level}%"></div>
                                </div>
                                <span class="text-${analysis.severity.color} font-medium">
                                    ${analysis.severity.text}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <button class="close-modal bg-gray-500 text-white py-2 px-4 rounded-md 
                                     hover:bg-gray-600 flex-1">Close</button>
                        <button class="book-service bg-blue-600 text-white py-2 px-4 rounded-md 
                                     hover:bg-blue-700 flex-1">Book Service</button>
                    </div>
                </div>
            `;

            // Add modal to page
            document.body.appendChild(modal);

            // Add button handlers
            modal.querySelector('.close-modal').onclick = () => {
                modal.remove();
                issueTextarea.value = '';
            };

            modal.querySelector('.book-service').onclick = () => {
                modal.remove();
                document.getElementById('booking-form').scrollIntoView({behavior: 'smooth'});
            };

            // Reset button
            analyzeButton.disabled = false;
            analyzeButton.textContent = 'Analyze Issue';
            analyzeButton.classList.remove('opacity-50');
        };
    };

    // Initialize AI Analyzer when script loads
    initAIAnalyzer();

    // Add click event listeners to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Button clicked:', this.textContent.trim());
        });
    });

    // Add change event listener to file input
    const fileInput = document.getElementById('visual-diagnostic-upload');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            console.log('File selected');
            handleFileUpload(this);
        });
    }

    // Find the diagnostic button
    const diagnosticButton = document.getElementById('start-diagnostic');
    console.log('Diagnostic button:', diagnosticButton);
    if (diagnosticButton) {
        console.log('Adding click listener to diagnostic button');
        diagnosticButton.addEventListener('click', function() {
            console.log('Diagnostic button clicked');
            showDiagnosticModal();
        });
    } else {
        console.error('Diagnostic button not found in DOM');
    }

    // Performance Optimizer button
    const startOptimizeBtn = document.getElementById('start-optimize');
    console.log('Optimize button:', startOptimizeBtn);
    if (startOptimizeBtn) {
        console.log('Adding click listener to optimize button');
        startOptimizeBtn.addEventListener('click', function() {
            console.log('Optimize button clicked');
            startPredictiveAnalysis();
        });
    } else {
        console.error('Optimize button not found in DOM');
    }

    // Start Predictive Analysis button
    const predictiveBtn = document.getElementById('start-prediction');
    console.log('Predictive button:', predictiveBtn);
    if (predictiveBtn) {
        console.log('Adding click listener to predictive button');
        predictiveBtn.addEventListener('click', startPredictiveAnalysis);
    } else {
        console.error('Predictive button not found in DOM');
    }

    // Get Estimate button
    const estimateBtn = document.getElementById('get-estimate');
    console.log('Estimate button:', estimateBtn);
    if (estimateBtn) {
        console.log('Adding click listener to estimate button');
        estimateBtn.addEventListener('click', calculateEstimate);
    } else {
        console.error('Estimate button not found in DOM');
    }

    // Book Now buttons
    document.querySelectorAll('.book-service-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('booking-form').scrollIntoView({behavior: 'smooth'});
        });
    });

    // Booking form submission
    const bookingForm = document.getElementById('service-booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Form submitted');

            // Disable submit button to prevent double submission
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Submitting...';

            try {
                // Validate form data
                const formData = {
                    name: document.getElementById('booking-name').value.trim(),
                    email: document.getElementById('booking-email').value.trim(),
                    phone: document.getElementById('booking-phone').value.trim(),
                    service: document.getElementById('booking-service').value.trim(),
                    date: document.getElementById('booking-date').value.trim(),
                    time: document.getElementById('booking-time').value.trim(),
                    notes: document.getElementById('booking-notes').value.trim() || 'None'
                };

                // Check required fields
                const requiredFields = ['name', 'email', 'phone', 'service', 'date', 'time'];
                const missingFields = requiredFields.filter(field => !formData[field]);

                if (missingFields.length > 0) {
                    throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
                }

                console.log('Form data validated:', formData);

                const bookingId = 'BK' + Date.now().toString().slice(-6);
                console.log('Generated booking ID:', bookingId);

                // Prepare admin notification data
                const adminData = {
                    from_name: formData.name,
                    from_email: formData.email,
                    customer_phone: formData.phone,
                    service: formData.service,
                    date: formData.date,
                    time: formData.time,
                    booking_id: bookingId,
                    notes: formData.notes
                };

                console.log('Admin email data:', adminData);

                // Send admin notification
                console.log('Sending admin email...');
                const adminResponse = await emailjs.send(
                    emailConfig.serviceId,
                    emailConfig.templateIdAdmin,
                    adminData
                );
                console.log('Admin email sent:', adminResponse);

                // Prepare customer notification data
                const customerData = {
                    to_name: formData.name,
                    to_email: formData.email,
                    booking_id: bookingId,
                    service: formData.service,
                    date: formData.date,
                    time: formData.time
                };

                console.log('Customer email data:', customerData);

                // Send customer notification
                console.log('Sending customer email...');
                const customerResponse = await emailjs.send(
                    emailConfig.serviceId,
                    emailConfig.templateIdCustomer,
                    customerData
                );

                console.log('Customer email sent:', customerResponse);

                if (customerResponse.status === 200 && adminResponse.status === 200) {
                    // Save booking to localStorage
                    const bookingsData = localStorage.getItem('bookings');
                    console.log('Current bookings data:', bookingsData);
                    
                    const bookings = bookingsData ? new Map(JSON.parse(bookingsData)) : new Map();
                    console.log('Parsed bookings:', bookings);
                    
                    const bookingData = {
                        customerName: formData.name,
                        customerEmail: formData.email,
                        customerPhone: formData.phone,
                        service: formData.service,
                        date: formData.date,
                        time: formData.time,
                        notes: formData.notes,
                        status: 'pending',
                        createdAt: new Date().toISOString()
                    };
                    
                    console.log('Adding new booking:', bookingId, bookingData);
                    bookings.set(bookingId, bookingData);
                    
                    const bookingsToSave = Array.from(bookings.entries());
                    console.log('Saving bookings:', bookingsToSave);
                    localStorage.setItem('bookings', JSON.stringify(bookingsToSave));
                    
                    // Show success modal
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
                    modal.innerHTML = `
                        <div class="bg-white rounded-lg p-8 max-w-lg w-full">
                            <div class="mb-6">
                                <p class="font-semibold mb-4">Thank you for booking with us. Here are your booking details:</p>
                                <ul class="space-y-2">
                                    <li><span class="font-medium">Name:</span> ${formData.name}</li>
                                    <li><span class="font-medium">Email:</span> ${formData.email}</li>
                                    <li><span class="font-medium">Phone:</span> ${formData.phone}</li>
                                    <li><span class="font-medium">Service:</span> ${formData.service}</li>
                                    <li><span class="font-medium">Date:</span> ${formData.date}</li>
                                    <li><span class="font-medium">Time:</span> ${formData.time}</li>
                                    <li><span class="font-medium">Booking ID:</span> ${bookingId}</li>
                                    ${formData.notes !== 'None' ? `<li><span class="font-medium">Notes:</span> ${formData.notes}</li>` : ''}
                                </ul>
                                <p class="text-sm text-gray-600 mt-4">
                                    A confirmation email has been sent to ${formData.email}. We'll contact you to confirm your appointment.
                                </p>
                                <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <p class="font-medium mb-2">If you need to reach us:</p>
                                    <p>Email: support@westlacomputerexpert.tech</p>
                                    <p>Phone: (310) 850-8093</p>
                                </div>
                            </div>
                            <button onclick="this.parentElement.parentElement.remove()" class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                Close
                            </button>
                        </div>
                    `;
                    document.body.appendChild(modal);

                    // Reset form
                    this.reset();
                } else {
                    throw new Error('Failed to send confirmation emails');
                }
            } catch (error) {
                console.error('Booking error:', error);
                alert('Sorry, there was a problem submitting your booking: ' + error.message);
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.innerHTML = 'Submit Booking';
            }
        });
    }

    // Book service buttons
    document.querySelectorAll('.book-service-btn').forEach(button => {
        button.addEventListener('click', function() {
            const service = this.dataset.service;
            const serviceSelect = document.getElementById('booking-service');
            if (serviceSelect) {
                // Set the service in the dropdown if it matches
                Array.from(serviceSelect.options).forEach(option => {
                    if (option.value.toLowerCase().includes(service)) {
                        serviceSelect.value = option.value;
                    }
                });
            }
            document.getElementById('booking-form').scrollIntoView({behavior: 'smooth'});
        });
    });
});
