import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './NavBar/Header';
import GalleryGrid from './Gallery/GalleryGrid';
import HeroSection from './Sections/HeroSection';
import AboutSection from './Sections/AboutSection';
import CTASection from './Sections/CTASection';
import FadeInOnScroll from './common/FadeInOnScroll';
import Footer from './Footer';
import { getLanguageMeta, getTranslations } from '../i18n/translations';
import { getLocalizedSofa } from '../utils/localization';

const Home = () => {
    const sofas = useSelector((state) => state.furniture.items);
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);
    const [selectedSofa, setSelectedSofa] = useState(null);
    const heroSofa = sofas[1] || sofas[0];
    const t = getTranslations(currentLanguage);
    const { dir } = getLanguageMeta(currentLanguage);
    const localizedSelectedSofa = selectedSofa
        ? getLocalizedSofa(selectedSofa, currentLanguage)
        : null;

    return (
        <div className="min-h-screen bg-[#fff8ec] text-[#151312]" dir={dir}>
            <Header />

            <main>
                <HeroSection sofa={heroSofa} />
                <AboutSection />

                <section className="bg-white py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-5 md:px-8">
                        <FadeInOnScroll className="mx-auto mb-12 max-w-2xl text-center">
                            <span className="text-sm font-black text-[#7c3aed]">{t.gallery.eyebrow}</span>
                            <h2 className="mt-4 text-3xl font-black text-[#151312] md:text-5xl">
                                {t.gallery.title}
                            </h2>
                            <p className="mt-4 text-lg leading-8 text-stone-600">
                                {t.gallery.description}
                            </p>
                        </FadeInOnScroll>

                        <GalleryGrid sofas={sofas} onSelect={setSelectedSofa} featured />

                        <div className="mt-12 text-center">
                            <Link
                                to="/gallery"
                                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#d9c9ad] bg-[#fff8ec] px-8 py-4 text-sm font-bold text-[#151312] transition hover:-translate-y-0.5 hover:border-[#7c3aed] hover:text-[#7c3aed] hover:shadow-lg"
                            >
                                {t.gallery.allCollection}
                            </Link>
                        </div>
                    </div>
                </section>

                <CTASection />
            </main>

            {localizedSelectedSofa && (
                <button
                    type="button"
                    className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4"
                    onClick={() => setSelectedSofa(null)}
                >
                    <span className="block w-full max-w-3xl overflow-hidden rounded-[8px] bg-white text-start shadow-2xl">
                        <img
                            src={localizedSelectedSofa.image}
                            alt={localizedSelectedSofa.name}
                            className="max-h-[70vh] w-full object-cover"
                        />
                        <span className="block p-6">
                            <span className="text-sm font-black text-[#7c3aed]">{localizedSelectedSofa.category}</span>
                            <span className="mt-2 block text-2xl font-black text-[#151312]">
                                {localizedSelectedSofa.name}
                            </span>
                            <span className="mt-3 block leading-8 text-stone-600">
                                {localizedSelectedSofa.description}
                            </span>
                        </span>
                    </span>
                </button>
            )}

            <Footer />
        </div>
    );
};

export default Home;
