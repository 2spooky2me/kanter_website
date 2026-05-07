import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu, FiPhone, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { setLanguage } from '../../store/furnitureSlice';
import { getLanguageMeta, getTranslations, languages } from '../../i18n/translations';

const phone = '0547001926';

const HeaderV2 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);
    const t = getTranslations(currentLanguage);
    const { dir } = getLanguageMeta(currentLanguage);

    const links = [
        { to: '/', label: t.nav.home },
        { to: '/gallery', label: t.nav.gallery },
        { to: '/about-us', label: t.nav.about },
        { to: '/contact', label: t.nav.contact },
    ];

    const handleLanguageChange = (language) => {
        dispatch(setLanguage(language));
        setIsOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 border-b border-[#eadcc4] bg-[#fff8ec]/92 backdrop-blur-xl" dir={dir}>
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
                <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[#151312] text-lg font-black text-white shadow-sm">
                        K
                    </span>
                    <span>
                        <span className="block text-xl font-black text-[#151312]">{t.brand.name}</span>
                        <span className="block text-xs font-semibold text-stone-500">{t.brand.tagline}</span>
                    </span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `text-sm font-bold transition ${
                                    isActive ? 'text-[#7c3aed]' : 'text-stone-700 hover:text-[#7c3aed]'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <div className="flex rounded-full border border-[#d9c9ad] bg-white p-1">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                type="button"
                                onClick={() => handleLanguageChange(language.code)}
                                className={`rounded-full px-3 py-2 text-xs font-black transition ${
                                    currentLanguage === language.code
                                        ? 'bg-[#7c3aed] text-white'
                                        : 'text-stone-600 hover:text-[#7c3aed]'
                                }`}
                            >
                                {language.shortLabel}
                            </button>
                        ))}
                    </div>
                    <a
                        href={`tel:${phone}`}
                        className="inline-flex h-11 items-center gap-2 rounded-full border border-[#d9c9ad] px-5 text-sm font-bold text-[#151312] transition hover:border-[#7c3aed] hover:text-[#7c3aed]"
                    >
                        <FiPhone />
                        {phone}
                    </a>
                    <a
                        href={`https://wa.me/972${phone.slice(1)}`}
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-[#7c3aed] px-5 text-sm font-bold text-white transition hover:bg-[#6d28d9]"
                    >
                        <FaWhatsapp />
                        {t.nav.whatsapp}
                    </a>
                </div>

                <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-full border border-[#d9c9ad] text-[#151312] md:hidden"
                    onClick={() => setIsOpen((value) => !value)}
                    aria-label={t.nav.menu}
                >
                    {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </nav>

            {isOpen && (
                <div className="border-t border-[#eadcc4] bg-[#fff8ec] px-5 py-5 md:hidden">
                    <div className="grid gap-3">
                        <div className="mb-2 flex rounded-full border border-[#d9c9ad] bg-white p-1">
                            {languages.map((language) => (
                                <button
                                    key={language.code}
                                    type="button"
                                    onClick={() => handleLanguageChange(language.code)}
                                    className={`flex-1 rounded-full px-3 py-2 text-xs font-black transition ${
                                        currentLanguage === language.code
                                            ? 'bg-[#7c3aed] text-white'
                                            : 'text-stone-600'
                                    }`}
                                >
                                    {language.label}
                                </button>
                            ))}
                        </div>
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `rounded-[8px] px-4 py-3 text-base font-bold ${
                                        isActive ? 'bg-[#7c3aed] text-white' : 'text-[#151312]'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <a
                            href={`https://wa.me/972${phone.slice(1)}`}
                            className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#7c3aed] text-sm font-bold text-white"
                        >
                            <FaWhatsapp />
                            {t.nav.whatsappFull}
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default HeaderV2;
