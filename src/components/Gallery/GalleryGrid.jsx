import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTranslations } from '../../i18n/translations';
import { getLocalizedText } from '../../utils/localization';
import FadeInOnScroll from '../common/FadeInOnScroll';
import SofaCard from './SofaCard';

const GalleryGrid = ({ sofas, onSelect, featured = false }) => {
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);
    const t = getTranslations(currentLanguage);
    const [activeCategory, setActiveCategory] = useState(t.gallery.all);

    useEffect(() => {
        setActiveCategory(t.gallery.all);
    }, [currentLanguage, t.gallery.all]);

    const categories = useMemo(() => {
        const values = sofas
            .map((sofa) => getLocalizedText(sofa.category, currentLanguage))
            .filter(Boolean);
        return [t.gallery.all, ...Array.from(new Set(values))];
    }, [currentLanguage, sofas, t.gallery.all]);

    const visibleSofas = useMemo(() => {
        const filtered =
            activeCategory === t.gallery.all
                ? sofas
                : sofas.filter(
                    (sofa) => getLocalizedText(sofa.category, currentLanguage) === activeCategory
                );

        return featured ? filtered.slice(0, 6) : filtered;
    }, [activeCategory, currentLanguage, featured, sofas, t.gallery.all]);

    return (
        <div className="space-y-8">
            <FadeInOnScroll>
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => setActiveCategory(category)}
                            className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
                                activeCategory === category
                                    ? 'border-[#7c3aed] bg-[#7c3aed] text-white shadow-lg shadow-purple-950/10'
                                    : 'border-[#d9c9ad] bg-white text-stone-700 hover:border-[#7c3aed] hover:text-[#7c3aed]'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleSofas.map((sofa, index) => (
                    <FadeInOnScroll key={sofa.id} delay={(index % 3) * 120}>
                        <SofaCard sofa={sofa} onClick={() => onSelect?.(sofa)} />
                    </FadeInOnScroll>
                ))}
            </div>
        </div>
    );
};

export default GalleryGrid;
