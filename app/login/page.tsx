"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { NextResponse, NextRequest } from "next/server";
import { signIn } from "next-auth/react";

export default function loginPage() {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [load, setLoad] = useState(false);

    const onLogin = async () => {
        setLoad(true);

        const res = await signIn("credentials", {
            email: user.email,
            password: user.password,
            redirect: false,
        });

        setLoad(false);

        if (res?.ok) {
            // Session is available, now get role
            const response = await fetch("api/auth/session");
            const session = await response.json();

            if (!session?.user?.role) {
                toast.error("Something went wrong. Please try again.");
                return;
            }

            const role = session?.user?.role;

            if (role === "ROOT_ADMIN" || role === "ADMIN") {
                toast.success("Login success");
                router.push("/admin");
            } else {
                toast.error("You are not authorized.");
            }
        }

        else {
            toast.error("Invalid credentials or not approved");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        disabled={load}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                        onClick={onLogin}
                    >
                        {load ? "Processing" : "Login"}
                    </button>

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
                        onClick={() => signIn("google")}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-200">
                        Sign in with Google
                    </button>

                    {/* GitHub Login */}
                    <button
                        onClick={() => signIn("github")}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition duration-200">
                        Sign in with GitHub
                    </button>

                </div>


            </div>
        </div>
    );
}
