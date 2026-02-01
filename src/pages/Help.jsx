import React, { useState } from 'react';

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I book a movie ticket?',
      answer: 'Browse through our movie collection, select a movie you want to watch, and click on "Book Tickets" button. You will need to be logged in to complete the booking.',
    },
    {
      id: 2,
      question: 'Can I cancel my booking?',
      answer: 'Currently, ticket cancellation is not available. Please contact our support team for assistance with cancellations.',
    },
    {
      id: 3,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, UPI, and net banking. Payment processing will be available soon.',
    },
    {
      id: 4,
      question: 'How do I create an account?',
      answer: 'Click on the "Sign Up" button in the header, fill in your details, and create your account. It only takes a minute!',
    },
    {
      id: 5,
      question: 'Can I book tickets for multiple movies at once?',
      answer: 'Yes, you can book tickets for multiple movies. Each booking is processed separately.',
    },
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Help & Support</h1>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transform transition-transform ${
                      openFaq === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">support@moviebook.com</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">+91 1800-123-4567</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Business Hours</h3>
              <p className="text-gray-600">Monday - Sunday: 9:00 AM - 9:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
