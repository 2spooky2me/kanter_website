import React, { useState } from 'react';
import { loginAdmin } from '../../api/sofasApi';

const AdminLogin = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const { token } = await loginAdmin(credentials);
            window.sessionStorage.setItem('kanter_admin_token', token);
            onLogin();
        } catch (loginError) {
            setError('שם המשתמש או הסיסמה אינם נכונים.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid min-h-screen place-items-center bg-[#fff8ec] px-5" dir="rtl">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[8px] border border-[#eadcc4] bg-white p-8 shadow-xl">
                <span className="text-sm font-black text-[#7c3aed]">ניהול אתר קנטר</span>
                <h1 className="mt-3 text-3xl font-black text-[#151312]">כניסה למערכת</h1>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                    הכניסה מאומתת מול השרת. פעולות הוספה, עריכה ומחיקה דורשות הרשאת מנהל.
                </p>

                <div className="mt-8 grid gap-5">
                    <label className="grid gap-2 text-sm font-bold text-stone-800">
                        שם משתמש
                        <input
                            value={credentials.username}
                            onChange={(event) => setCredentials((previous) => ({ ...previous, username: event.target.value }))}
                            className="rounded-[8px] border border-[#d9c9ad] px-4 py-3 font-normal outline-none focus:border-[#7c3aed]"
                            autoComplete="username"
                            required
                        />
                    </label>
                    <label className="grid gap-2 text-sm font-bold text-stone-800">
                        סיסמה
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(event) => setCredentials((previous) => ({ ...previous, password: event.target.value }))}
                            className="rounded-[8px] border border-[#d9c9ad] px-4 py-3 font-normal outline-none focus:border-[#7c3aed]"
                            autoComplete="current-password"
                            required
                        />
                    </label>
                    {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-full bg-[#151312] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#7c3aed] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? 'מתחבר...' : 'כניסה'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;
