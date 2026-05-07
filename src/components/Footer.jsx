import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { getTranslations } from '../i18n/translations';

const phone = '0547001926';

const Footer = () => {
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);
    const t = getTranslations(currentLanguage);

    return (
        <footer className="bg-[#151312] text-stone-100">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
                <div>
                    <h2 className="text-2xl font-black">{t.brand.footerName}</h2>
                    <p className="mt-4 max-w-md text-sm leading-7 text-stone-300">
                        {t.footer.text}
                    </p>
                </div>
                <div>
                    <h3 className="text-sm font-black uppercase tracking-wide text-[#c7a76c]">
                        {t.footer.navTitle}
                    </h3>
                    <div className="mt-4 grid gap-3 text-sm">
                        <Link to="/" className="hover:text-[#c7a76c]">{t.nav.home}</Link>
                        <Link to="/gallery" className="hover:text-[#c7a76c]">{t.nav.gallery}</Link>
                        <Link to="/about-us" className="hover:text-[#c7a76c]">{t.nav.about}</Link>
                        <Link to="/contact" className="hover:text-[#c7a76c]">{t.nav.contact}</Link>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-black uppercase tracking-wide text-[#c7a76c]">
                        {t.footer.contactTitle}
                    </h3>
                    <div className="mt-4 grid gap-3 text-sm text-stone-300">
                        <a href={`tel:${phone}`} className="hover:text-[#c7a76c]">{phone}</a>
                        <div className="flex gap-3 pt-2">
                            <a href={`https://wa.me/972${phone.slice(1)}`} aria-label="WhatsApp" className="rounded-full border border-white/15 p-3 transition hover:border-[#7c3aed] hover:bg-[#7c3aed] hover:text-white">
                                <FaWhatsapp />
                            </a>
                            <a href="/" aria-label="Instagram" className="rounded-full border border-white/15 p-3 transition hover:border-[#7c3aed] hover:bg-[#7c3aed] hover:text-white">
                                <FaInstagram />
                            </a>
                            <a href="/" aria-label="Facebook" className="rounded-full border border-white/15 p-3 transition hover:border-[#7c3aed] hover:bg-[#7c3aed] hover:text-white">
                                <FaFacebookF />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-stone-500">
                {t.footer.rights}
            </div>
        </footer>
    );
};

export default Footer;
