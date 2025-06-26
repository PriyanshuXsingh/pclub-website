import axios from "axios"
import { NextResponse } from "next/server"
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import toast from "react-hot-toast"

export default function EditMemberModal({ member, onClose, onEdit }: any) {
  const [load, setLoad] = useState(false)

  const [formData, setFormData] = useState({
    email: member.email,
    branch: member.branch,
    year: member.year,
  })

  // e is the event triggered when a user types something into an <input> field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }))
  }

  // an asynchronous function called updatedMember which is triggered when the form is submitted
  const updatedMember = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      formData.email.trim().length === 0 ||
      formData.branch.trim().length === 0 ||
      formData.year === 0
    ) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      setLoad(true)
      const newData = await axios.put("/api/member/updateMember", {
        id: member.id,
        ...formData,
      })

      toast.success("Member updated!")
      onEdit({
        ...member,
        ...formData,
      })
      onClose()
    } catch (error: any) {
      toast.error("Failed to update")
      console.error(error)
    } finally {
      setLoad(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-8 py-4 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Member</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-600 hover:text-red-500"
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        <div className="max-h-[calc(90vh-70px)] overflow-y-auto px-8 py-6">
          <form onSubmit={updatedMember} className="space-y-4">
            <input
              type="email"
              placeholder="Updated email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-orange-600 px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Updated branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full rounded-md border border-orange-600 px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Updated year"
              name="year"
              min={1}
              max={4}
              value={formData.year}
              onChange={handleChange}
              className="w-full rounded-md border border-orange-600 px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {load ? (
              <div className="mt-4 flex justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full rounded-md bg-[#db6654] px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[#c25345]"
              >
                Save Changes
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
