import React from 'react';
import { useSelector } from 'react-redux';
import { FiAward, FiPenTool, FiUserCheck } from 'react-icons/fi';
import { getTranslations } from '../../i18n/translations';
import FadeInOnScroll from '../common/FadeInOnScroll';

const icons = [FiPenTool, FiAward, FiUserCheck];

const AboutSection = () => {
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);
    const t = getTranslations(currentLanguage);

    return (
        <section className="bg-[#fff8ec] py-20 md:py-28">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8">
                <FadeInOnScroll>
                    <span className="text-sm font-black text-[#7c3aed]">{t.aboutSection.eyebrow}</span>
                    <h2 className="mt-4 text-3xl font-black leading-tight text-[#151312] md:text-5xl">
                        {t.aboutSection.title}
                    </h2>
                    <p className="mt-6 max-w-xl text-lg leading-9 text-stone-700">
                        {t.aboutSection.description}
                    </p>
                </FadeInOnScroll>

                <div className="grid gap-5 md:grid-cols-3">
                    {t.aboutSection.features.map(({ title, text }, index) => {
                        const Icon = icons[index];
                        return (
                        <FadeInOnScroll key={title} delay={index * 120}>
                            <article className="h-full rounded-[8px] border border-[#eadcc4] bg-white/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#7c3aed]/10 text-2xl text-[#7c3aed]">
                                    <Icon />
                                </span>
                                <h3 className="mt-5 text-xl font-black text-[#151312]">{title}</h3>
                                <p className="mt-3 text-sm leading-7 text-stone-600">{text}</p>
                            </article>
                        </FadeInOnScroll>
                    )})}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
