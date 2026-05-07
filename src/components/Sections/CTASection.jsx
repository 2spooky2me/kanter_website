import React from 'react';
import { useSelector } from 'react-redux';
import { FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getTranslations } from '../../i18n/translations';
import FadeInOnScroll from '../common/FadeInOnScroll';

const phone = '0547001926';

const CTASection = () => {
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);
    const t = getTranslations(currentLanguage);

    return (
        <section className="bg-[#151312] py-20 text-white">
            <FadeInOnScroll className="mx-auto grid max-w-7xl items-center gap-8 px-5 md:grid-cols-[1fr_auto] md:px-8">
                <div>
                    <span className="text-sm font-black text-[#c7a76c]">{t.cta.eyebrow}</span>
                    <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
                        {t.cta.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
                        {t.cta.description}
                    </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                        href={`https://wa.me/972${phone.slice(1)}`}
                        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#7c3aed] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#6d28d9]"
                    >
                        <FaWhatsapp />
                        WhatsApp
                    </a>
                    <a
                        href={`tel:${phone}`}
                        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-[#151312]"
                    >
                        <FiPhone />
                        {t.cta.phone}
                    </a>
                </div>
            </FadeInOnScroll>
        </section>
    );
};

export default CTASection;
