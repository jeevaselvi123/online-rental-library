"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sign_up, login } from '../../../api/auth';
import Link from "next/link";

interface FormData {
    email: string;
    password: string;
    confirm_password: string;
    name?: string;
    address?: string;
    phone_number?: number;
}

function AuthForm({ is_login }: { is_login: boolean }) {
    const [form_data, set_form_data] = useState<FormData>({
        email: "",
        password: "",
        confirm_password: "",
    });

    const [error_data, set_error_data] = useState({
        email: "",
        password: "",
        confirm_password: "",
    });
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        set_form_data({ ...form_data, [e.target.name]: e.target.value });
    };

    const input_class_names = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;


    const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const PASSWORD_MIN_LENGTH = 6;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = is_login
                ? await login(form_data)
                : await sign_up(form_data);

            if (response?.user) {
                localStorage.setItem('token', response.token);
                router.push('/');
            } else {
                console.error('Unexpected Error Occurred!', response);
            }

        } catch (error) {
            console.error('An error occurred during submission:', error);
        } finally {
            set_form_data({
                email: "",
                password: "",
                confirm_password: "",
            });
        }
    };
    useEffect(() => {
        const error_data: { email: string, password: string, confirm_password: string } = { email: '', password: '', confirm_password: '' };

        const validate_email = () => {
            if (form_data.email && !EMAIL_REGEX.test(form_data.email)) {
                error_data.email = 'Invalid email format';
            }
            else {
                error_data.email = '';
            }
        }

        const validate_password = () => {
            if (form_data.password && form_data.password.length < PASSWORD_MIN_LENGTH) {
                error_data.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
            }
            else {
                error_data.password = '';
            }
        }

        const validate_confirm_password = () => {
            if (form_data.password !== form_data.confirm_password) {
                error_data.confirm_password = "Passwords do not match";
            } else {
                error_data.confirm_password = '';
            }
        };
        validate_email();
        validate_password();
        validate_confirm_password();

        set_error_data(error_data);
    }, [form_data]);

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4"
        >
            <h2 className="text-center text-xl font-bold mb-6">{is_login ? 'Welcome Back!' : 'Welcome to Bookish Bliss'}</h2>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className={input_class_names
                        + (error_data.email ? ' border-red-500' : '')}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={form_data.email}
                    onChange={handleChange}
                />
                {error_data.email && <p className="text-red-600">{error_data.email}</p>}
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className={input_class_names
                        + (error_data.password ? ' border-red-500' : '')}
                    id="password"
                    type="password"
                    name="password"
                    placeholder="******"
                    value={form_data.password}
                    onChange={handleChange}
                />
                {error_data.password && <p className="text-red-600">{error_data.password}</p>}
            </div>
            {!is_login && (
                <><div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Confirm Password
                    </label>
                    <input
                        className={input_class_names
                            + (error_data.confirm_password ? ' border-red-500' : '')}
                        id="confirm-password"
                        type="password"
                        name="confirm_password"
                        placeholder="******"
                        value={form_data.confirm_password}
                        onChange={handleChange} />
                    {error_data.confirm_password && <p className="text-red-600">{error_data.confirm_password}</p>}
                </div><div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            className={input_class_names}
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter Your Name"
                            value={form_data.name ?? ''}
                            onChange={handleChange} />
                        {/* {error_data.name && <p className="text-red-600">{error_data.name}</p>} */}
                    </div><div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="phone"
                        >
                            Phone Number
                        </label>
                        <input
                            className={input_class_names}
                            id="phone"
                            type="tel"
                            name="phone"
                            placeholder="Enter Phone Number"
                            value={form_data.phone_number}
                            onChange={handleChange} />
                        {/* {error_data.phone && <p className="text-red-600">{error_data.phone}</p>} */}
                    </div><div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="address"
                        >
                            Address
                        </label>
                        <textarea
                            className={input_class_names}
                            id="address"
                            name="address"
                            placeholder="Enter Your Address"
                            value={form_data.address ?? ''}
                            onChange={handleChange} />
                        {/* {error_data.address && <p className="text-red-600">{error_data.address}</p>} */}
                    </div></>

            )}
            {is_login && <div className="flex items-center justify-between">
                <p className="text-center text-sm text-gray-500">
                    Don&apos;t have an account? <Link className="text-blue-500 hover:underline" href='/sign-up'>Sign Up!</Link>
                </p>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                    Forgot Password?
                </a>
            </div>}

            <div className="text-center w-full mb-4 p-4">
                <button
                    className="w-3/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    {is_login ? 'Login' : 'Sign Up'}
                </button>
            </div>

        </form>
    );
}

export default AuthForm;
