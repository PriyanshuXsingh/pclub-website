"use client"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import { NextResponse, NextRequest } from "next/server"

type User = {
  id: string
  name: string
  email: string
  role: string
  approved: boolean
  createdAt: string
}

export default function AdminPage() {
  const router = useRouter()

  const [pendingUser, setPendingUser] = React.useState<User[]>([])
  const [approveUser, setApproveUser] = React.useState<User[]>([])
  const [rejectUser, setRejectUser] = React.useState<User[]>([])

  // Fetch Data from Server
  const fetchData = async () => {
    try {
      const pendingRes = await axios.get("/api/admin/pending_user")
      const approveRes = await axios.get("/api/admin/getApprovedUsers")
      const rejectRes = await axios.get("/api/admin/getRejectedUsers")

      setPendingUser(pendingRes.data)
      setApproveUser(approveRes.data)
      setRejectUser(rejectRes.data)
    } catch (error: any) {
      console.log(error.message)
      toast.error("Error loading admin data")
    }
  }

  // When this page loads, it calls fetchData() once to get all the user data
  useEffect(() => {
    fetchData()
  }, [])

  const onApproveUser = async (id: string) => {
    try {
      await axios.post("/api/admin/approve_user", { id })
      toast.success("User approved")
      fetchData()
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const onRejectUser = async (id: string) => {
    try {
      await axios.post("/api/admin/reject_user", { id })
      toast.error("User rejected")
      fetchData() // After we approve or reject a user, our backend (database) changes, hence reload the latest user list
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const Card: React.FC<{ user: User; actions?: boolean }> = ({
    user,
    actions,
  }) => {
    return (
      <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-md">
        <p>
          <strong>Name:</strong> {user.name || "Unknown"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        {actions && (
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => onApproveUser(user.id)}
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => onRejectUser(user.id)}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-8">
      <section className="mb-12 w-full max-w-5xl">
        <h2 className="mb-4 text-xl font-semibold">Pending Requests</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pendingUser.length ? (
            pendingUser.map((user) => (
              <Card key={user.id} user={user} actions />
            ))
          ) : (
            <p className="col-span-full">No pending requests</p>
          )}
        </div>
      </section>

      <section className="mb-12 w-full max-w-5xl">
        <h2 className="mb-4 text-xl font-semibold">Approved Admins</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {approveUser.length ? (
            approveUser.map((user) => <Card key={user.id} user={user} />)
          ) : (
            <p className="col-span-full">No admins yet</p>
          )}
        </div>
      </section>

      <section className="w-full max-w-5xl">
        <h2 className="mb-4 text-xl font-semibold">Rejected Users</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rejectUser.length ? (
            rejectUser.map((user) => <Card key={user.id} user={user} />)
          ) : (
            <p className="col-span-full">No rejected users</p>
          )}
        </div>
      </section>
    </div>
  )
}
