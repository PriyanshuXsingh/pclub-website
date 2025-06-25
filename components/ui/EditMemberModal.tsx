import axios from "axios"
import { NextResponse } from "next/server"
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import toast from "react-hot-toast"

export default function EditMemberModal({ member, onClose, onEdit }: any) {
  const [load, setLoad] = React.useState(false)

  const [formData, setFormData] = React.useState({
    email: member.email,
    branch: member.branch,
    year: member.year,
  })

  // e is the event triggered when a user types something into an <input> field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target // e.target refers to the input element that triggered the change
    setFormData((prev) => ({
      ...prev, // keep all existing values
      [name]: name === "year" ? Number(value) : value, // update only the field being typed
    }))
  }

  // an asynchronous function called updatedMember which is triggered when the form is submitted
  const updatedMember = async (e: React.FormEvent) => {
    e.preventDefault() // Prevents the default behavior of the form — which would normally try to reload the page

    if (
      formData.email.trim().length === 0 ||
      formData.branch.trim().length === 0 ||
      formData.year === 0
    ) {
      toast.error("Please fill in all fields")
      return // prevents the API call
    }

    try {
      setLoad(true)
      // sends a PUT request to our API to update the member in the database
      const newData = await axios.put("/api/member/updateMember", {
        id: member.id,
        ...formData,
      })

      toast.success("Member updated!")
      onEdit({
        ...member,
        ...formData,
      })
      onClose() // close modal after success
    } catch (error: any) {
      toast.error("Failed to update")
      console.error(error)
    } finally {
      setLoad(false)
    }
  }

  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-70 px-4 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative mb-8 mt-8 max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-xl bg-[#1e1e1e] p-8 text-white shadow-2xl">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Edit Member Confirmation
        </h2>

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-xl text-gray-400 hover:text-white"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <form onSubmit={updatedMember} className="space-y-4">
          <input
            type="email"
            placeholder="Updated email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-[#2a2a2a] p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Updated branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-[#2a2a2a] p-3 text-white placeholder-gray-500"
          />

          <input
            type="number"
            placeholder="Updated year"
            name="year"
            min={1}
            max={4}
            value={formData.year}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-[#2a2a2a] p-3 text-white placeholder-gray-500"
          />

          {load ? (
            <div className="mt-4 flex justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
