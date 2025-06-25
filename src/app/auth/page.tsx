'use client';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Navbar from "@/components/Navbar";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-4">
            <Navbar />
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    {isLogin ? 'Login to Markinzy' : 'Create Your Account'}
                </h2>

                <button
                    className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition text-gray-700 font-medium"
                >
                    <FcGoogle className="text-xl mr-2" />
                    Continue with Google
                </button>

                <div className="flex items-center gap-2 my-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-500">or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <form className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border px-4 py-2 rounded-md placeholder-gray-500 text-gray-800"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border px-4 py-2 rounded-md placeholder-gray-500 text-gray-800"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border px-4 py-2 rounded-md placeholder-gray-500 text-gray-800"
                    />

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </section>
    );
}
