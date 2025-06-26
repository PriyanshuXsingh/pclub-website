"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState({ email: "", password: "" })
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (searchParams.get("login") === "success") {
      toast.success("Login successful!")
    }
  }, [searchParams])

  const onLogin = async () => {
    setLoad(true)

    const res = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    })

    setLoad(false)

    if (res?.ok) {
      const response = await fetch("/api/auth/session")
      const session = await response.json()

      const role = session?.user?.role
      const approved = session?.user?.approved

      if (!approved) {
        toast.error("User not approved.")
        return
      }

      if (role === "ADMIN" || role === "ROOT_ADMIN") {
        toast.success("Login successful!")
        router.push("/admin")
      } else {
        toast.error("You are not authorized.")
      }
    } else {
      toast.error("Invalid credentials or not approved.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h2>

        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              className="mt-1 w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              className="mt-1 w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>

          {/* Manual Login */}
          <button
            disabled={load}
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition duration-200 hover:bg-blue-700"
            onClick={onLogin}
          >
            {load ? "Processing..." : "Login"}
          </button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={() =>
              signIn("google", { callbackUrl: "/admin?login=success" })
            }
            className="w-full rounded-lg bg-red-600 py-2 font-semibold text-white transition duration-200 hover:bg-red-700"
          >
            Sign in with Google
          </button>

          {/* GitHub Login */}
          <button
            onClick={() =>
              signIn("github", { callbackUrl: "/admin?login=success" })
            }
            className="w-full rounded-lg bg-gray-800 py-2 font-semibold text-white transition duration-200 hover:bg-gray-900"
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  )
}
