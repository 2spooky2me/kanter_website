import React from 'react';
import { useSelector } from 'react-redux';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import HeaderV2 from '../NavBar/HeaderV2';
import FadeInOnScroll from '../common/FadeInOnScroll';
import Footer from '../Footer';
import { getLanguageMeta, getTranslations } from '../../i18n/translations';

const phone = '0547001926';

const Contact = () => {
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);
    const t = getTranslations(currentLanguage);
    const { dir } = getLanguageMeta(currentLanguage);

    return (
        <div className="min-h-screen bg-[#fff8ec] text-[#151312]" dir={dir}>
            <HeaderV2 />
            <main className="py-16 md:py-24">
                <div className="mx-auto max-w-4xl px-5 md:px-8">
                    <FadeInOnScroll className="text-center">
                        <span className="text-sm font-black text-[#7c3aed]">{t.contact.eyebrow}</span>
                        <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                            {t.contact.title}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-stone-600">
                            {t.contact.description}
                        </p>

                        <div className="mx-auto mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
                            <a
                                href={`https://wa.me/972${phone.slice(1)}`}
                                className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full bg-[#7c3aed] px-6 py-4 font-bold text-white transition hover:bg-[#6d28d9]"
                            >
                                <FaWhatsapp />
                                {t.contact.whatsapp}
                            </a>
                            <a
                                href={`tel:${phone}`}
                                className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full border border-[#d9c9ad] bg-white px-6 py-4 font-bold text-[#151312] transition hover:border-[#7c3aed] hover:text-[#7c3aed]"
                            >
                                <FiPhone />
                                {phone}
                            </a>
                        </div>
                    </FadeInOnScroll>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
