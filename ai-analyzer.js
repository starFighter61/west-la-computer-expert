// Simple AI Analyzer functionality
window.onload = function() {
    console.log('AI Analyzer script loaded');
    
    // Get elements
    const form = document.getElementById('issue-form');
    const textarea = document.getElementById('issue-description');
    const button = document.getElementById('analyze-issue');
    
    console.log('Elements found:', {
        form: !!form,
        textarea: !!textarea,
        button: !!button
    });
    
    if (!form || !textarea || !button) {
        console.error('Required elements not found');
        return;
    }
    
    // Handle form submission
    form.onsubmit = function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        const description = textarea.value.trim();
        console.log('Description:', description);
        
        if (!description) {
            alert('Please describe your issue first.');
            return false;
        }
        
        // Disable button
        button.disabled = true;
        button.textContent = 'Analyzing...';
        
        // Simple analysis based on keywords
        let analysis = {
            diagnosis: 'General system issue detected.',
            solutions: [
                'Run system diagnostics',
                'Check for updates',
                'Verify connections',
                'Consider professional inspection'
            ],
            severity: {
                level: 40,
                text: 'Low',
                color: 'green-600'
            }
        };
        
        if (description.toLowerCase().includes('slow')) {
            analysis = {
                diagnosis: 'Performance issue detected.',
                solutions: [
                    'Close unnecessary programs',
                    'Run disk cleanup',
                    'Check for malware',
                    'Consider upgrading RAM'
                ],
                severity: {
                    level: 60,
                    text: 'Moderate',
                    color: 'yellow-500'
                }
            };
        } else if (description.toLowerCase().includes('virus')) {
            analysis = {
                diagnosis: 'Potential security threat detected.',
                solutions: [
                    'Run antivirus scan',
                    'Update security software',
                    'Remove suspicious programs',
                    'Consider professional help'
                ],
                severity: {
                    level: 90,
                    text: 'High',
                    color: 'red-500'
                }
            };
        }
        
        // Create and show results
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">Analysis Results</h3>
                <div class="mb-6">
                    <div class="mb-4">
                        <h4 class="font-semibold mb-2">Issue:</h4>
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
        
        document.body.appendChild(modal);
        
        // Add button handlers
        modal.querySelector('.close-modal').onclick = function() {
            modal.remove();
            textarea.value = '';
            button.disabled = false;
            button.textContent = 'Analyze Issue';
        };
        
        modal.querySelector('.book-service').onclick = function() {
            modal.remove();
            document.getElementById('booking-form').scrollIntoView({behavior: 'smooth'});
            button.disabled = false;
            button.textContent = 'Analyze Issue';
        };
        
        return false;
    };
});
