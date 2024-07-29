"use client";
import { googleSignUp, signIn, signUp } from "@/lib/auth";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState<string>("");

    const handleGoogleSignUp = async () => {
        try {
            const user = await googleSignUp();
            router.push("/");
        } catch (error) {
            setError("Failed to sign up");
        }
    };

    const handleSignIn = async () => {
        try {
            await signIn(email, password);
        } catch (error) {
            setError("Failed to Sign In");
        }
    };

    return (
        <div className="h-screen">
            <div className="flex flex-col items-center mt-4">
                <div className="text-3xl text-bold mb-4">Login</div>
                <div className="flex flex-col gap-y-2">
                    <input
                        className="w-64 py-1 px-2 rounded-md ring-1 ring-gray-400"
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                        type="email"
                    />
                    <input
                        placeholder="Password"
                        className="w-64 py-1 px-2 rounded-md ring-1 ring-gray-400"
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                    />

                    <div className="flex justify-center">
                        <button
                            onClick={handleSignIn}
                            className="mt-2 bg-green-700 hover:bg-green-600/90 w-48 text-white py-1.5 font-medium rounded-lg text-sm px-"
                        >
                            Sign In
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleGoogleSignUp}
                            className="text-white w-48 bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-between mb-2"
                        >
                            <svg
                                className="mr-2 -ml-1 w-4 h-4"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="google"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 488 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                ></path>
                            </svg>
                            Sign In with Google
                        </button>
                    </div>
                    <div className="text-center mt-2 text-red-600 font-semibold">
                        {error && <p>{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
