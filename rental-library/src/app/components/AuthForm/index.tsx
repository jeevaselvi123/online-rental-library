"use client";
import React, { useState } from "react";

function AuthForm({ is_login }: { is_login: boolean }) {
    const [form_data, set_form_data] = useState({
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_form_data({ ...form_data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here, e.g., send data to backend
        console.log(form_data);
        set_form_data({
            email: "",
            password: "",
            confirm_password: "",
        })
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4"
        >
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={form_data.email}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="******"
                    value={form_data.password}
                    onChange={handleChange}
                />
            </div>
            {!is_login && (
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirm-password"
                        type="confirm-password"
                        name="confirm-password"
                        placeholder="******"
                        value={form_data.confirm_password}
                        onChange={handleChange}
                    />
                </div>
            )}
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    {is_login ? 'Login' : 'Sign Up'}
                </button>
                {is_login && <a href="#" className="text-sm text-blue-500 hover:underline">
                    Forgot Password?
                </a>}
            </div>
        </form>
    );
}

export default AuthForm;
