import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosCloseCircle } from 'react-icons/io';
import HeaderV2 from '../NavBar/HeaderV2';
import GalleryGrid from '../Gallery/GalleryGrid';
import FadeInOnScroll from '../common/FadeInOnScroll';
import Footer from '../Footer';
import { getLanguageMeta, getTranslations } from '../../i18n/translations';
import { getLocalizedSofa } from '../../utils/localization';

const ImageGallery = () => {
    const sofas = useSelector((state) => state.furniture.items || []);
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);
    const [selectedItem, setSelectedItem] = useState(null);
    const t = getTranslations(currentLanguage);
    const { dir } = getLanguageMeta(currentLanguage);
    const localizedSelectedItem = selectedItem
        ? getLocalizedSofa(selectedItem, currentLanguage)
        : null;

    return (
        <div className="min-h-screen bg-[#fff8ec] text-[#151312]" dir={dir}>
            <HeaderV2 />
            <main>
                <section className="bg-white py-16 md:py-24">
                    <FadeInOnScroll className="mx-auto max-w-7xl px-5 text-center md:px-8">
                        <span className="text-sm font-black text-[#7c3aed]">{t.gallery.pageEyebrow}</span>
                        <h1 className="mt-4 text-4xl font-black md:text-6xl">{t.gallery.pageTitle}</h1>
                        <p className="mx-auto mt-5 max-w-2xl text-lg leading-9 text-stone-600">
                            {t.gallery.pageDescription}
                        </p>
                    </FadeInOnScroll>
                </section>

                <section className="py-12 md:py-20">
                    <div className="mx-auto max-w-7xl px-5 md:px-8">
                        <GalleryGrid sofas={sofas} onSelect={setSelectedItem} />
                    </div>
                </section>
            </main>

            {localizedSelectedItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="relative max-h-[92vh] w-full max-w-4xl overflow-auto rounded-[8px] bg-white shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="absolute left-4 top-4 z-10 rounded-full bg-white/90 text-4xl text-[#151312] shadow transition hover:text-[#7c3aed]"
                            onClick={() => setSelectedItem(null)}
                            aria-label={t.gallery.close}
                            type="button"
                        >
                            <IoIosCloseCircle />
                        </button>
                        <img
                            src={localizedSelectedItem.image}
                            alt={localizedSelectedItem.name}
                            className="max-h-[70vh] w-full object-cover"
                        />
                        <div className="p-6 text-start md:p-8">
                            <span className="text-sm font-black text-[#7c3aed]">{localizedSelectedItem.category}</span>
                            <h2 className="mt-3 text-3xl font-black text-[#151312]">{localizedSelectedItem.name}</h2>
                            <p className="mt-4 text-lg leading-8 text-stone-600">{localizedSelectedItem.description}</p>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ImageGallery;
