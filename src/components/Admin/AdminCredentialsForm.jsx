import React, { useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { updateAdminCredentials } from '../../api/sofasApi';

const emptyForm = {
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
};

const inputClass =
    'rounded-[8px] border border-[#d9c9ad] bg-white px-4 py-3 font-normal outline-none transition focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/10';

const AdminCredentialsForm = () => {
    const [formData, setFormData] = useState(emptyForm);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('');
        setError('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError('הסיסמה החדשה ואימות הסיסמה לא תואמים.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await updateAdminCredentials({
                username: formData.username,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });
            window.sessionStorage.setItem('kanter_admin_token', response.token);
            setFormData(emptyForm);
            setStatus('פרטי ההתחברות עודכנו בהצלחה.');
        } catch (updateError) {
            setError('לא הצלחנו לעדכן. בדוק את הסיסמה הנוכחית ונסה שוב.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="rounded-[10px] border border-[#eadcc4] bg-white shadow-sm">
            <div className="border-b border-[#eadcc4] px-5 py-5">
                <p className="text-xs font-black text-[#7c3aed]">אבטחה</p>
                <h2 className="mt-1 text-2xl font-black">פרטי התחברות</h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                    עדכון שם משתמש וסיסמה נשמר בשרת ודורש את הסיסמה הנוכחית.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 p-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-stone-800">
                    שם משתמש חדש
                    <input name="username" value={formData.username} onChange={handleChange} minLength="3" required className={inputClass} />
                </label>
                <label className="grid gap-2 text-sm font-bold text-stone-800">
                    סיסמה נוכחית
                    <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required className={inputClass} />
                </label>
                <label className="grid gap-2 text-sm font-bold text-stone-800">
                    סיסמה חדשה
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} minLength="8" required className={inputClass} />
                </label>
                <label className="grid gap-2 text-sm font-bold text-stone-800">
                    אימות סיסמה חדשה
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} minLength="8" required className={inputClass} />
                </label>

                <div className="md:col-span-2">
                    {status && <p className="mb-3 rounded-[8px] bg-green-50 p-3 text-sm font-semibold text-green-700">{status}</p>}
                    {error && <p className="mb-3 rounded-[8px] bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#151312] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#7c3aed] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FiLock />
                        {isSubmitting ? 'שומר...' : 'עדכון פרטי התחברות'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AdminCredentialsForm;
