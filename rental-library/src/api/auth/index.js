const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const sign_up = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Sign-up failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error during sign-up:', error);
        throw error;
    }
};

export const login = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
