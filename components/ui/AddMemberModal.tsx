import axios from "axios"
import { NextResponse } from "next/server"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import toast from "react-hot-toast"

export default function AddMemberModal({ member, onClose, onAdd }: any) {
  const [load, setLoad] = React.useState(false)

  const [formData, setFormData] = React.useState({
    name: member.email,
    roll_no: member.roll_no,
    email: member.email,
    branch: member.branch,
    year: member.year,
    role: member.role,
    profile_picture: member.profile_picture,
    socials: member.socials,
  })

  const [socials, setSocials] = React.useState([{ name: "", url: "" }])

  const addSocial = () => {
    if (socials.length < 3) {
      setSocials([...socials, { name: "", url: "" }])
    } else {
      toast.custom("You can only add up to 3 social links.")
    }
  }

  const removeSocial = (index: number) => {
    const newSocials = socials.filter((_, i) => i !== index)
    setSocials(newSocials)
  }

  const handleSocialChange = (
    index: number,
    field: "name" | "url",
    value: string,
  ) => {
    const newSocial = [...socials]
    newSocial[index][field] = value
    setSocials(newSocial)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value, // Convert year to number
    }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare socialJson object from current socials state
    const socialJson: Record<string, string> = {}
    socials.forEach(({ name, url }) => {
      if (name && url) socialJson[name] = url
    })

    if (
      formData.name.trim().length === 0 ||
      formData.roll_no.trim().length === 0 ||
      formData.email.trim().length === 0 ||
      formData.branch.trim().length === 0 ||
      formData.year === 0 ||
      Object.keys(socialJson).length === 0
    ) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      setLoad(true)
      const { name, email, roll_no, branch, year, role, profile_picture } =
        formData
      const newMember = {
        name,
        email,
        roll_no,
        branch,
        year,
        role,
        profile_picture,
        socials: socialJson,
      }

      const res = await axios.post("/api/member/addMember", newMember)
      const savedMember = res.data // includes generated ID from backend
      onAdd(savedMember)
      toast.success("Member added!")
      onClose()
    } catch (error: any) {
      toast.error("Failed to add member")
      console.error(error)
    } finally {
      setLoad(false)
    }
  }

  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-70 px-4 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative mb-8 mt-8 max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-[#1e1e1e] p-8 text-white shadow-2xl">
        <h2 className="mb-6 text-center text-2xl font-semibold">Add Member</h2>

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-xl text-gray-400 hover:text-white"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-[#2a2a2a] p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Roll Number"
            name="roll_no"
            value={formData.roll_no}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-[#2a2a2a] p-3 text-white placeholder-gray-500"
          />

          <input
            type="email"
            placeholder="abc@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-[#2a2a2a] p-3 text-white placeholder-gray-500"
          />

          <input
            type="text"
            placeholder="CSE, BIO, EEE, ECE, MECH, IT"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-[#2a2a2a] p-3 text-white placeholder-gray-500"
          />

          <input
            type="number"
            placeholder="1, 2, 3, 4"
            name="year"
            min={1}
            max={4}
            value={formData.year}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-[#2a2a2a] p-3 text-white placeholder-gray-500"
          />

          <input
            type="text"
            placeholder="President, Core, Member, Team Lead"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-[#2a2a2a] p-3 text-white placeholder-gray-500"
          />

          <input
            type="text"
            placeholder="Image URL"
            name="profile_picture"
            value={formData.profile_picture}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-[#2a2a2a] p-3 text-white placeholder-gray-500"
          />

          {/* Socials Section */}
          <div className="socialLinks">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="socials" className="font-medium">
                Socials
              </label>
              <button
                type="button"
                onClick={addSocial}
                aria-label="Add Social"
                className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-400"
              >
                <FontAwesomeIcon icon={faPlus} /> Add Social
              </button>
            </div>

            {socials.map((social, index) => (
              <div key={index} className="mb-2 flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Platform (e.g. Github)"
                  value={social.name}
                  onChange={(e) =>
                    handleSocialChange(index, "name", e.target.value)
                  }
                  className="w-1/2 rounded-lg border border-gray-600 bg-[#2a2a2a] p-2 text-white placeholder-gray-500"
                />
                <input
                  type="url"
                  placeholder="Link"
                  value={social.url}
                  onChange={(e) =>
                    handleSocialChange(index, "url", e.target.value)
                  }
                  className="w-1/2 rounded-lg border border-gray-600 bg-[#2a2a2a] p-2 text-white placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => removeSocial(index)}
                  aria-label="Remove Social"
                  className="text-sm text-red-400 hover:text-red-500"
                >
                  <FontAwesomeIcon icon={faMinus} /> Remove
                </button>
              </div>
            ))}
          </div>

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
