"use client";
import React, { useState } from "react";
import { Building2, Clock, Mail, Phone } from "lucide-react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "Web Development",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim() || formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    if (!formData.lastName.trim() || formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: HTMLFormElement) => {
    e.preventDefault();

    if (validateForm()) {
      const { firstName, lastName, email, subject, message } = formData;
      const mailToLink = `mailto:leomirandadev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hello, I am ${firstName} ${lastName}.\n\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.location.href = mailToLink;
    }
  };

  const subjects = [
    "Web Development",
    "Mobile Development",
    "Figma Design",
    "REST API",
    "FullStack Project",
  ];

  return (
    <section className="min-h-screen bg-[#2c2e48] flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
        {/* Contact Form - Left Side */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Get In Touch
          </h2>

          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-orange-600 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="w-full px-4 py-3 border border-orange-600 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email"
                className="w-full px-4 py-3 border border-orange-600 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-orange-600 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder="Message"
                className="w-full px-4 py-3 border border-orange-600 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#db6654] text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
            >
              Send Message
            </button>
          </div>
        </div>

        {/* Contact Info - Right Side */}
        <div className="text-white">
          <div className="mb-8">
            <p className="text-sm text-orange-500 uppercase tracking-wider mb-2">
              CONTACT
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              We are passionate about innovation, luxury, and ready to
              collaborate. Chats where you belong. Let's code, create and
              conquer the world of technology together.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-300">@pixelbuilt</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-300">@pixelbuilt</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-300">contactpixelb@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
