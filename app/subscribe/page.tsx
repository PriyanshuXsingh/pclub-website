"use client"

import { useState } from "react"

export default function SubscribePage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubscribe = async () => {
    setLoading(true)
    setMessage("")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      setMessage(data.msg || "Something went wrong.")
    } catch (error) {
      setMessage("Subscription failed. Try again.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          📬 Subscribe to Our Blog
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Get the latest updates delivered straight to your inbox.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  )
}
