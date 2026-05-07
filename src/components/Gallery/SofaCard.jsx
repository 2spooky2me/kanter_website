import React from 'react';
import { useSelector } from 'react-redux';
import { getTranslations } from '../../i18n/translations';
import { getLocalizedSofa } from '../../utils/localization';

const SofaCard = ({ sofa, onClick }) => {
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);
    const t = getTranslations(currentLanguage);
    const localizedSofa = getLocalizedSofa(sofa, currentLanguage);

    return (
        <article
            className="group h-full overflow-hidden rounded-[8px] border border-[#eadcc4] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-950/10"
            onClick={onClick}
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f3eadb]">
                <img
                    src={sofa.image}
                    alt={localizedSofa.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-x-4 top-4 flex justify-start">
                    <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#151312] shadow-sm backdrop-blur">
                        {localizedSofa.category}
                    </span>
                </div>
            </div>
            <div className="space-y-3 p-5 text-start">
                <h3 className="text-xl font-black text-[#151312]">{localizedSofa.name}</h3>
                <p className="min-h-[3.5rem] text-sm leading-7 text-stone-600">{localizedSofa.description}</p>
                <span className="inline-flex items-center text-sm font-black text-[#7c3aed]">
                    {t.gallery.viewDetails}
                </span>
            </div>
        </article>
    );
};

export default SofaCard;
