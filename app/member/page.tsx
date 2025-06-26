"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"
import { NextResponse, NextRequest } from "next/server"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import EditMemberModal from "@/components/ui/EditMemberModal"
import AddMemberModal from "@/components/ui/AddMemberModal"

type Member = {
  id: string
  name: string
  email: string
  roll_no: string
  role: string
  branch: string
  year: number
  socials: Record<string, string>
  profile_picture: string
}

export default function MemberPage() {
  const router = useRouter()
  const [members, setMembers] = useState<Member[]>([])
  const [editMember, setEditMember] = React.useState<Member | null>(null)
  const [addMember, setAddMember] = React.useState<Member | null>(null)
  const [search, setSearch] = React.useState("")

  // fetching the member list on page load
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const allData = await axios.get("/api/member/getMember")
        setMembers(allData.data)
      } catch (error: any) {
        toast.error("Failed to fetch members")
      }
    }
    fetchMembers()
  }, [])

  useEffect(() => {
    const isModalOpen = !!addMember || !!editMember

    if (isModalOpen) {
      // Disable scroll
      document.body.style.overflow = "hidden"
    } else {
      // Re-enable scroll
      document.body.style.overflow = "auto"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [addMember, editMember])

  const onDeleteMember = async (memberID: string) => {
    try {
      const deletedUser = await axios.delete("/api/member/deleteMember", {
        data: { id: memberID },
      })
      toast.success("Member deleted successfully")
      // update the members state -- update UI of members page
      setMembers((prev) => prev.filter((m) => m.id !== memberID))
    } catch (error: any) {
      console.log(error.message)
      toast.error("Failed to delete member")
    }
  }

  const handleAddMember = async (newMember: Member) => {
    setMembers((prev) => [...prev, newMember])
  }

  // used after editing a member in the modal, to update the frontend state so that the changes immediately reflect in the UI without reloading the page
  // prev is the previous list of all members (an array)
  const handleEditMember = async (updatedMember: Member) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === updatedMember.id ? updatedMember : m)),
    )
  }

  const Card: React.FC<{ member: Member }> = ({ member }) => {
    return (
      <div className="group relative overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex flex-col items-center space-y-4 px-6 py-6 text-center text-gray-800">
          {member.profile_picture && (
            <Image
              src={member.profile_picture}
              alt={`${member.name}'s profile`}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full border-2 border-blue-500 object-cover"
            />
          )}

          <div className="space-y-1">
            <p className="text-lg font-semibold">{member.name}</p>
            <p className="text-sm text-gray-500">{member.roll_no}</p>
            <p className="text-sm text-gray-500">{member.email}</p>
            <p className="text-sm">
              {member.branch} - Year {member.year}
            </p>
          </div>

          <div className="mt-3 flex gap-4 text-xl text-blue-600">
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            )}
            {member.socials.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-2 flex justify-center gap-4 px-6 pb-5">
          <button
            className="rounded-md bg-yellow-500 px-5 py-2 text-sm text-white transition hover:bg-yellow-600"
            onClick={() => setEditMember(member)}
          >
            Edit
          </button>
          <button
            className="rounded-md bg-red-500 px-5 py-2 text-sm text-white transition hover:bg-red-600"
            onClick={() => onDeleteMember(member.id)}
          >
            Delete
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf3ef] to-[#e7dbdc] px-6 py-16 text-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header buttons */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <button
            className="rounded-lg bg-[#ec684a] px-6 py-3 text-white shadow-md transition hover:bg-[#d65732]"
            onClick={() =>
              setAddMember({
                id: "",
                name: "",
                email: "",
                roll_no: "",
                role: "",
                branch: "",
                year: 1,
                socials: {},
                profile_picture: "",
              })
            }
          >
            Add Member
          </button>

          <div className="w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search by name"
              name="search"
              className="w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {members
            .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
            .map((member: Member) => (
              <Card key={member.id} member={member} />
            ))}
        </div>

        {editMember && (
          <EditMemberModal
            member={editMember}
            onClose={() => setEditMember(null)}
            onEdit={handleEditMember}
          />
        )}

        {addMember && (
          <AddMemberModal
            member={addMember}
            onClose={() => setAddMember(null)}
            onAdd={handleAddMember}
          />
        )}
      </div>
    </div>
  )
}
