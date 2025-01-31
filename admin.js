// Initialize EmailJS
(function() {
    emailjs.init("Qois2JZE0LgoHE4BC");
})();

// Global admin panel instance
let adminPanel;

class AdminPanel {
    constructor() {
        console.log('AdminPanel constructor called');
        this.isLoggedIn = false;
        this.adminEmail = '';
        this.ownerEmail = "support@westlacomputerexpert.tech";
        this.bookings = new Map();
        
        // Bind all methods to this instance
        this.setupEventListeners = this.setupEventListeners.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.showLoginForm = this.showLoginForm.bind(this);
        this.showDashboard = this.showDashboard.bind(this);
        this.loadBookings = this.loadBookings.bind(this);
        this.updateDashboardStats = this.updateDashboardStats.bind(this);
        this.renderBookingsTable = this.renderBookingsTable.bind(this);
        this.updateBookingStatus = this.updateBookingStatus.bind(this);
        this.deleteBooking = this.deleteBooking.bind(this);
        
        // Initialize
        this.setupEventListeners();
        this.checkLoginStatus();
        console.log('AdminPanel initialized');
    }

    setupEventListeners() {
        console.log('Setting up event listeners');
        const loginForm = document.getElementById('login-form');
        const logoutBtn = document.getElementById('logout');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Login form submitted');
                this.handleLogin();
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Expose functions globally
        window.login = (event) => {
            event.preventDefault();
            this.handleLogin();
        };

        window.logout = () => {
            this.handleLogout();
        };
    }

    checkLoginStatus() {
        console.log('Checking login status');
        const storedEmail = localStorage.getItem('adminEmail');
        if (storedEmail && storedEmail.toLowerCase() === this.ownerEmail.toLowerCase()) {
            console.log('Already logged in');
            this.isLoggedIn = true;
            this.adminEmail = storedEmail;
            this.showDashboard();
        } else {
            console.log('Not logged in');
            this.showLoginForm();
        }
    }

    handleLogin() {
        console.log('Handling login...');
        const emailInput = document.getElementById('admin-login-email');
        const email = emailInput.value.trim().toLowerCase();
        console.log('Login attempt with email:', email);

        if (email === this.ownerEmail.toLowerCase()) {
            console.log('Login successful');
            this.isLoggedIn = true;
            this.adminEmail = email;
            localStorage.setItem('adminEmail', email);
            this.showDashboard();
        } else {
            console.log('Login failed - incorrect email');
            alert('Please use the owner email address: support@westlacomputerexpert.tech');
        }
    }

    handleLogout() {
        console.log('Handling logout');
        localStorage.removeItem('adminEmail');
        this.isLoggedIn = false;
        this.adminEmail = '';
        this.showLoginForm();
    }

    showLoginForm() {
        console.log('Showing login form');
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('dashboard-section').classList.add('hidden');
        document.getElementById('logout').classList.add('hidden');
        document.getElementById('admin-email').textContent = '';
    }

    showDashboard() {
        console.log('Showing dashboard');
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('dashboard-section').classList.remove('hidden');
        document.getElementById('logout').classList.remove('hidden');
        document.getElementById('admin-email').textContent = this.adminEmail;
        this.loadBookings();
    }

    loadBookings() {
        console.log('Loading bookings from localStorage');
        const storedBookings = localStorage.getItem('bookings');
        if (storedBookings) {
            try {
                const bookingsArray = JSON.parse(storedBookings);
                console.log('Parsed bookings:', bookingsArray);
                this.bookings = new Map(bookingsArray);
                console.log('Converted to Map:', this.bookings);
            } catch (error) {
                console.error('Error loading bookings:', error);
                this.bookings = new Map();
            }
        } else {
            console.log('No bookings found in localStorage');
            this.bookings = new Map();
        }
        this.updateDashboardStats();
        this.renderBookingsTable();
    }

    renderBookingsTable() {
        console.log('Rendering bookings table');
        const tbody = document.getElementById('bookings-table-body');
        if (!tbody) {
            console.error('Bookings table body not found!');
            return;
        }
        
        tbody.innerHTML = '';

        // Convert bookings to array and sort by date (newest first)
        const sortedBookings = Array.from(this.bookings.entries())
            .sort(([, a], [, b]) => new Date(b.createdAt) - new Date(a.createdAt));
        
        console.log('Sorted bookings:', sortedBookings);

        sortedBookings.forEach(([id, booking]) => {
            console.log('Rendering booking:', id, booking);
            
            const tr = document.createElement('tr');
            
            const bookingDate = new Date(booking.date + 'T00:00:00-08:00').toLocaleDateString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'America/Los_Angeles'
            });

            tr.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${id}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${bookingDate}<br>
                    ${booking.time}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${booking.service}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${booking.customerName}<br>
                    ${booking.customerEmail}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                        ${booking.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="confirm-btn text-blue-600 hover:text-blue-900 mr-4" onclick="adminPanel.updateBookingStatus('${id}')">
                        ${booking.status === 'pending' ? 'Confirm' : 'Mark Pending'}
                    </button>
                    <button class="delete-btn text-red-600 hover:text-red-900" onclick="adminPanel.deleteBooking('${id}')">
                        Delete
                    </button>
                </td>
            `;

            tbody.appendChild(tr);
        });
    }

    updateBookingStatus(id) {
        console.log('Updating booking status for:', id);
        const booking = this.bookings.get(id);
        if (booking) {
            booking.status = booking.status === 'pending' ? 'confirmed' : 'pending';
            this.bookings.set(id, booking);
            localStorage.setItem('bookings', JSON.stringify(Array.from(this.bookings.entries())));
            this.updateDashboardStats();
            this.renderBookingsTable();
        }
    }

    deleteBooking(id) {
        console.log('Delete function called with id:', id);
        if (!id) {
            console.error('No booking ID provided');
            return;
        }

        if (confirm(`Are you sure you want to delete booking ${id}?`)) {
            console.log('User confirmed deletion');
            if (this.bookings.has(id)) {
                console.log('Found booking to delete');
                this.bookings.delete(id);
                localStorage.setItem('bookings', JSON.stringify(Array.from(this.bookings.entries())));
                this.updateDashboardStats();
                this.renderBookingsTable();
                alert('Booking deleted successfully');
            } else {
                console.error('Booking not found:', id);
                alert('Error: Booking not found');
            }
        } else {
            console.log('User cancelled deletion');
        }
    }

    updateDashboardStats() {
        console.log('Updating dashboard stats');
        const stats = {
            today: 0,
            pending: 0,
            total: this.bookings.size
        };

        const today = new Date().toLocaleDateString('en-US', {
            timeZone: 'America/Los_Angeles'
        });
        console.log('Today\'s date:', today);

        this.bookings.forEach((booking) => {
            console.log('Processing booking:', booking);
            
            const bookingDate = new Date(booking.date + 'T00:00:00-08:00').toLocaleDateString('en-US', {
                timeZone: 'America/Los_Angeles'
            });
            console.log('Booking date:', bookingDate);
            
            if (bookingDate === today) {
                stats.today++;
            }
            if (booking.status === 'pending') {
                stats.pending++;
            }
        });

        console.log('Stats:', stats);
        document.getElementById('today-bookings').textContent = stats.today;
        document.getElementById('pending-bookings').textContent = stats.pending;
        document.getElementById('total-bookings').textContent = stats.total;
    }
}

// Initialize admin panel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is ready, initializing admin panel...');
    adminPanel = new AdminPanel();
    window.adminPanel = adminPanel;
});
