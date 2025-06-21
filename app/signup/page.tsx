"use client"; // For frontend part - useState, useEffect, window, etc.

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NextResponse } from 'next/server';

export default function Signup() {
    const router = useRouter();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [load, setLoad] = useState(false);
    // const [error, setError] = useState(false) ;


    const onSignup = async () => {
        if (!user.name || !user.email || !user.password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoad(true);
            const response = await axios.post("api/admin/request_access", user);
            console.log("Request sent", response.data);
            toast.success("Request sent. Await admin approval.");
        }
        catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        }
        finally {
            setLoad(false);
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            placeholder="Enter your name"
                        />
                    </div>

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
                        onClick={onSignup}>
                        {!load ? "Signup" : "Processing"}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
