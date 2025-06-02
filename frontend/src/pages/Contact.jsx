import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const userId = import.meta.env.VITE_EMAILJS_USER_ID;

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });

  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setError('');
    setSent(false);

    try {
      const res = await emailjs.send(
        serviceId,
        templateId,
        formData,
        userId
      );

      console.log(res.text);
      setSent(true);
      setFormData({ from_name: '', from_email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to send message. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>

        {error && <p className="text-red-600 font-medium mb-4">❌ {error}</p>}

        <form onSubmit={handleSend} className="space-y-4">
          <input
            type="text"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-lime-400"
            required
          />

          <input
            type="email"
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-lime-400"
            required
          />

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-lime-400"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-lime-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-lime-400 hover:bg-lime-700 text-white font-medium py-2 rounded-md transition-all duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
