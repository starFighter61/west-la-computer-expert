// Email configuration
const emailConfig = {
    userId: process.env.EMAILJS_USER_ID,
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateIdCustomer: process.env.EMAILJS_TEMPLATE_ID_CUSTOMER,
    templateIdAdmin: process.env.EMAILJS_TEMPLATE_ID_ADMIN
};

// Export configurations
module.exports = {
    emailConfig
};
