import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiArrowLeft } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getTranslations } from '../../i18n/translations';
import { getLocalizedSofa } from '../../utils/localization';
import FadeInOnScroll from '../common/FadeInOnScroll';

const phone = '0547001926';

const HeroSection = ({ sofa }) => {
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);
    const t = getTranslations(currentLanguage);
    const localizedSofa = sofa ? getLocalizedSofa(sofa, currentLanguage) : null;

    return (
        <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#151312] text-white">
            {localizedSofa && (
                <img
                    src={localizedSofa.image}
                    alt={localizedSofa.name}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-l from-black/82 via-black/50 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fff8ec] to-transparent" />

            <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-16 md:px-8">
                <FadeInOnScroll className="max-w-3xl">
                    <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-[#f3dfbd] backdrop-blur">
                        {t.hero.eyebrow}
                    </span>
                    <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
                        {t.hero.title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-9 text-stone-100 md:text-xl">
                        {t.hero.description}
                    </p>
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <a
                            href={`https://wa.me/972${phone.slice(1)}`}
                            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#7c3aed] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-purple-950/25 transition hover:-translate-y-0.5 hover:bg-[#6d28d9]"
                        >
                            <FaWhatsapp />
                            {t.hero.whatsapp}
                        </a>
                        <Link
                            to="/gallery"
                            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#151312]"
                        >
                            {t.hero.gallery}
                            <FiArrowLeft />
                        </Link>
                    </div>
                </FadeInOnScroll>
            </div>
        </section>
    );
};

export default HeroSection;
