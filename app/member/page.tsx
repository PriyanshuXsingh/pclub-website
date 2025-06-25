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

export default function memberPage() {
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
      <div className="flex flex-col items-center space-y-3 rounded-xl border border-gray-700 bg-[#1a1a1a] p-6 text-white shadow-lg">
        {member.profile_picture && (
          <Image
            src={member.profile_picture}
            alt={`${member.name}'s profile`}
            width={96}
            height={96}
            className="h-24 w-24 rounded-full border-2 border-blue-500 object-cover"
          />
        )}

        <div className="space-y-1 text-center">
          <p className="text-lg font-semibold">{member.name}</p>
          <p className="text-sm text-gray-400">{member.roll_no}</p>
          <p className="text-sm text-gray-400">{member.email}</p>
          <p className="text-sm">
            {member.branch} - Year {member.year}
          </p>
        </div>

        <div className="mt-2 flex gap-4 text-xl text-blue-400">
          {/* target="_blank": opens link in new tab and rel="noopener noreferrer": prevents the new tab from having access to your window object via window.opener */}
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

        <div className="mt-4 flex gap-3">
          <button
            className="rounded-lg bg-yellow-600 px-4 py-2 font-medium text-white hover:bg-yellow-700"
            onClick={() => setEditMember(member)}
          >
            Edit
          </button>
          <button
            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
            onClick={() => onDeleteMember(member.id)}
          >
            Delete
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-10 text-white">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        {/* open the modal with an empty Member object */}
        <button
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow hover:bg-blue-700"
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
          Add a Member
        </button>

        <div className="search mr-4 w-full sm:w-auto">
          <form className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by name"
              name="search"
              className="rounded-lg border border-gray-700 bg-[#1f1f1f] px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <button
              type="submit"
              className="rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
            >
              <i className="fa fa-search"></i>
            </button> */}
          </form>
        </div>
      </div>

      <div className="memlist grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
  )
}
