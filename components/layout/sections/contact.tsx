"use client"
import React, { useState } from "react"
import { Building2, Clock, Mail, Phone } from "lucide-react"

type FormDataType = {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

type FormErrorType = Partial<Record<keyof FormDataType, string>>

type InputType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

export const ContactSection = () => {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "Web Development",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrorType>({})

  const validateForm = () => {
    const newErrors: FormErrorType = {}

    if (!formData.firstName.trim() || formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }
    if (!formData.lastName.trim() || formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: InputType) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name in errors) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      const { firstName, lastName, email, subject, message } = formData
      const mailToLink = `mailto:leomirandadev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hello, I am ${firstName} ${lastName}.\n\nEmail: ${email}\n\nMessage:\n${message}`)}`

      window.location.href = mailToLink
    }
  }

  const subjects = [
    "Web Development",
    "Mobile Development",
    "Figma Design",
    "REST API",
    "FullStack Project",
  ]

  return (
    <section
      className="flex min-h-screen items-center justify-center bg-[#2c2e48] px-4 py-12"
      id="contact"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-24">
        {/* Contact Form - Left Side */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Get In Touch
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full rounded-md border border-orange-600 bg-white px-4 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
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
                  className="w-full rounded-md border border-orange-600 bg-white px-4 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
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
                className="w-full rounded-md border border-orange-600 bg-white px-4 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full rounded-md border border-orange-600 bg-white px-4 py-3 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full resize-none rounded-md border border-orange-600 bg-white px-4 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-md bg-[#db6654] px-6 py-3 font-medium text-white transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info - Right Side */}
        <div className="text-white">
          <div className="mb-8">
            <p className="mb-2 text-sm uppercase tracking-wider text-orange-500">
              CONTACT
            </p>
            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Contact Us</h1>
            <p className="text-lg leading-relaxed text-gray-300">
              We are passionate about innovation, luxury, and ready to
              collaborate. Chats where you belong. Let&apos;s code, create and
              conquer the world of technology together.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-300">@uietchd</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-300">pclubuiet@gmail.com</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-300">pclubuiet@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
