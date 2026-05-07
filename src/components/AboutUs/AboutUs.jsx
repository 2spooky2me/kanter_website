import React from 'react';
import { useSelector } from 'react-redux';
import { FiCheckCircle } from 'react-icons/fi';
import HeaderV2 from '../NavBar/HeaderV2';
import FadeInOnScroll from '../common/FadeInOnScroll';
import Footer from '../Footer';
import { getLanguageMeta, getTranslations } from '../../i18n/translations';

const AboutUs = () => {
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);
    const t = getTranslations(currentLanguage);
    const { dir } = getLanguageMeta(currentLanguage);

    return (
        <div className="min-h-screen bg-[#fff8ec] text-[#151312]" dir={dir}>
            <HeaderV2 />
            <main>
                <section className="bg-white py-16 md:py-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8">
                        <FadeInOnScroll>
                            <span className="text-sm font-black text-[#7c3aed]">{t.aboutPage.eyebrow}</span>
                            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                                {t.aboutPage.title}
                            </h1>
                        </FadeInOnScroll>
                        <FadeInOnScroll className="space-y-5 text-lg leading-9 text-stone-600" delay={120}>
                            {t.aboutPage.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </FadeInOnScroll>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-5 md:px-8">
                        <div className="grid gap-6 md:grid-cols-3">
                            {t.aboutPage.values.map(([title, text], index) => (
                                <FadeInOnScroll key={title} delay={index * 120}>
                                    <article className="h-full rounded-[8px] border border-[#eadcc4] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                                        <FiCheckCircle className="text-3xl text-[#7c3aed]" />
                                        <h2 className="mt-5 text-2xl font-black">{title}</h2>
                                        <p className="mt-4 leading-8 text-stone-600">{text}</p>
                                    </article>
                                </FadeInOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
