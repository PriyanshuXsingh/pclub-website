import axios from "axios"
import { NextResponse } from "next/server"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import toast from "react-hot-toast"

enum Status {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export default function AddBlogModal({ blog, onClose, onAdd }: any) {
  const [formData, setFormData] = React.useState({
    title: blog.title,
    content: blog.content,
    desc: blog.desc,
    coverImage: blog.coverImage,
    tags: blog.tags,
    author: blog.author,
    status: blog.status,
    publishedAt: blog.publishedAt,
  })

  const [load, setLoad] = React.useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      formData.title.trim().length === 0 ||
      formData.desc.trim().length === 0 ||
      formData.content.trim().length === 0 ||
      formData.tags.length === 0 ||
      formData.status.trim().length === 0
    ) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      setLoad(true)
      const { title, desc, content, coverImage, tags, author, status } =
        formData
      const newBlog = { title, desc, content, coverImage, tags, author, status }

      const res = await axios.post("/api/blog/addBlog", newBlog)
      const savedBlog = res.data
      onAdd(savedBlog)
      toast.success("Blog Added!")
      onClose()
    } catch (error: any) {
      toast.error("Failed to add blog")
      console.error("Add Blog Error:", error.response?.data || error.message)
    } finally {
      setLoad(false)
    }
  }

  const [uploadingImage, setUploadingImage] = React.useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)

    const formDataUpload = new FormData()
    formDataUpload.append("file", file)
    formDataUpload.append("upload_preset", "Pclubwebsite") // 👈 your preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/da9v08yg8/image/upload",
        {
          method: "POST",
          body: formDataUpload,
        },
      )

      const data = await res.json()
      if (!res.ok || !data.secure_url) {
        alert(
          "Image upload failed: " + (data.error?.message || "Unknown error"),
        )
        return
      }

      setFormData((prev) => ({ ...prev, coverImage: data.secure_url }))
    } catch (err) {
      alert("Failed to upload image")
      console.error("Cloudinary upload error:", err)
    } finally {
      setUploadingImage(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-orange-300 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-orange-200 bg-orange-50 px-8 py-5">
          <h2 className="text-2xl font-bold text-orange-800">Add Blog</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-600 hover:text-red-500"
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto px-6 py-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Enter Title of Blog"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-md border border-orange-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="text"
              name="desc"
              placeholder="Enter Description of Blog"
              value={formData.desc}
              onChange={handleChange}
              className="w-full rounded-md border border-orange-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <textarea
              name="content"
              placeholder="Type your content here..."
              value={formData.content}
              rows={5}
              onChange={handleChange}
              className="w-full rounded-md border border-orange-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            {/* Image Upload */}
            <div>
              <label className="mb-2 block font-medium text-gray-600">
                Upload New Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full cursor-pointer rounded-lg border border-[#ffdfd1] bg-white p-2 text-sm text-gray-700 shadow-sm"
              />
              {uploadingImage && (
                <p className="mt-2 text-sm text-blue-500">Uploading...</p>
              )}
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="Cover"
                  className="mt-3 max-h-60 w-full rounded-lg border border-gray-300 object-contain"
                />
              )}
            </div>

            <input
              type="text"
              name="tags"
              placeholder="Enter tags (e.g.- AI, ML, WebD, etc.)"
              value={formData.tags.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tags: e.target.value.split(",").map((s) => s.trim()),
                }))
              }
              className="w-full rounded-md border border-orange-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="text"
              name="author"
              placeholder="Enter Author of Blog"
              value={formData.author}
              onChange={handleChange}
              className="w-full rounded-md border border-orange-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-md border border-orange-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {Object.values(Status).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {load ? (
              <div className="flex justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full rounded-md bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
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
