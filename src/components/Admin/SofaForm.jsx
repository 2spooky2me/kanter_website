import React, { useEffect, useMemo, useState } from 'react';
import { FiImage, FiPlus, FiSave, FiX } from 'react-icons/fi';
import { toSofaFormData } from '../../utils/sofaStorage';

const NEW_CATEGORY = '__new_category__';

const emptyForm = {
    nameHe: '',
    nameRu: '',
    descriptionHe: '',
    descriptionRu: '',
    categoryHe: '',
    categoryRu: '',
    image: '',
};

const getCategoryKey = (category) => `${category.he || ''}::${category.ru || ''}`;

const inputClass =
    'rounded-[8px] border border-[#d9c9ad] bg-white px-4 py-3 font-normal outline-none transition focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/10';

const SofaForm = ({ initialSofa, categories = [], onSave, onCancel }) => {
    const [formData, setFormData] = useState(emptyForm);
    const [imageName, setImageName] = useState('');
    const [selectedCategoryKey, setSelectedCategoryKey] = useState(NEW_CATEGORY);

    const categoryOptions = useMemo(
        () => categories.map((category) => ({ ...category, key: getCategoryKey(category) })),
        [categories]
    );

    useEffect(() => {
        const nextForm = initialSofa ? toSofaFormData(initialSofa) : { ...emptyForm };
        const matchingCategory = categoryOptions.find(
            (category) =>
                category.he === nextForm.categoryHe &&
                category.ru === nextForm.categoryRu
        );

        if (!initialSofa && categoryOptions.length > 0) {
            const firstCategory = categoryOptions[0];
            setFormData({
                ...nextForm,
                categoryHe: firstCategory.he,
                categoryRu: firstCategory.ru,
            });
            setSelectedCategoryKey(firstCategory.key);
        } else {
            setFormData(nextForm);
            setSelectedCategoryKey(matchingCategory?.key || NEW_CATEGORY);
        }

        setImageName('');
    }, [categoryOptions, initialSofa]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedCategoryKey(value);

        if (value === NEW_CATEGORY) {
            setFormData((previous) => ({
                ...previous,
                categoryHe: '',
                categoryRu: '',
            }));
            return;
        }

        const selectedCategory = categoryOptions.find((category) => category.key === value);
        if (selectedCategory) {
            setFormData((previous) => ({
                ...previous,
                categoryHe: selectedCategory.he,
                categoryRu: selectedCategory.ru,
            }));
        }
    };

    const handleImage = (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setFormData((previous) => ({ ...previous, image: reader.result }));
            setImageName(file.name);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({
            id: formData.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            name: {
                he: formData.nameHe,
                ru: formData.nameRu || formData.nameHe,
            },
            description: {
                he: formData.descriptionHe,
                ru: formData.descriptionRu || formData.descriptionHe,
            },
            category: {
                he: formData.categoryHe,
                ru: formData.categoryRu || formData.categoryHe,
            },
            image: formData.image,
        });

        setFormData(emptyForm);
        setSelectedCategoryKey(categoryOptions[0]?.key || NEW_CATEGORY);
        setImageName('');
    };

    const isNewCategory = selectedCategoryKey === NEW_CATEGORY;

    return (
        <form onSubmit={handleSubmit} className="overflow-hidden rounded-[10px] border border-[#eadcc4] bg-white shadow-sm">
            <div className="border-b border-[#eadcc4] bg-[#151312] px-5 py-5 text-white">
                <p className="text-xs font-black text-[#c7a76c]">גלריית ספות</p>
                <h2 className="mt-1 text-2xl font-black">
                    {initialSofa ? 'עריכת ספה' : 'הוספת ספה חדשה'}
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                    מלאו שם, בחרו קטגוריה והעלו תמונה. התיאור אופציונלי.
                </p>
            </div>

            <div className="grid gap-5 p-5">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <label className="grid gap-2 text-sm font-bold text-stone-800">
                        שם בעברית
                        <input name="nameHe" value={formData.nameHe} onChange={handleChange} required className={inputClass} />
                    </label>
                    <label className="grid gap-2 text-sm font-bold text-stone-800">
                        שם ברוסית
                        <input name="nameRu" value={formData.nameRu} onChange={handleChange} className={inputClass} />
                    </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <label className="grid gap-2 text-sm font-bold text-stone-800">
                        תיאור בעברית
                        <textarea name="descriptionHe" rows="3" value={formData.descriptionHe} onChange={handleChange} className={inputClass} />
                    </label>
                    <label className="grid gap-2 text-sm font-bold text-stone-800">
                        תיאור ברוסית
                        <textarea name="descriptionRu" rows="3" value={formData.descriptionRu} onChange={handleChange} className={inputClass} />
                    </label>
                </div>

                <label className="grid gap-2 text-sm font-bold text-stone-800">
                    קטגוריה
                    <select value={selectedCategoryKey} onChange={handleCategoryChange} className={inputClass}>
                        {categoryOptions.map((category) => (
                            <option key={category.key} value={category.key}>
                                {category.he}{category.ru ? ` / ${category.ru}` : ''}
                            </option>
                        ))}
                        <option value={NEW_CATEGORY}>+ יצירת קטגוריה חדשה</option>
                    </select>
                </label>

                {isNewCategory ? (
                    <div className="grid gap-4 rounded-[10px] border border-dashed border-[#d9c9ad] bg-[#fff8ec] p-4">
                        <p className="text-sm font-black text-[#151312]">קטגוריה חדשה</p>
                        <label className="grid gap-2 text-sm font-bold text-stone-800">
                            שם קטגוריה בעברית
                            <input name="categoryHe" value={formData.categoryHe} onChange={handleChange} required placeholder="לדוגמה: ספות פינתיות" className={inputClass} />
                        </label>
                        <label className="grid gap-2 text-sm font-bold text-stone-800">
                            שם קטגוריה ברוסית
                            <input name="categoryRu" value={formData.categoryRu} onChange={handleChange} placeholder="Например: Угловые диваны" className={inputClass} />
                        </label>
                    </div>
                ) : (
                    <p className="rounded-[8px] bg-[#fff8ec] p-3 text-sm font-semibold text-stone-600">
                        קטגוריה נבחרת: <span className="font-black text-[#151312]">{formData.categoryHe}</span>
                    </p>
                )}

                <label className="grid gap-2 text-sm font-bold text-stone-800">
                    תמונה
                    <span className="flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-dashed border-[#d9c9ad] bg-[#fff8ec] px-4 py-5 text-sm font-black text-[#7c3aed] transition hover:border-[#7c3aed] hover:bg-white">
                        <FiImage />
                        בחירת תמונה
                        <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                    </span>
                </label>

                {imageName && <p className="text-sm font-semibold text-stone-500">נבחרה תמונה: {imageName}</p>}
                {formData.image && (
                    <img src={formData.image} alt="תצוגה מקדימה" className="h-52 w-full rounded-[10px] object-cover" />
                )}

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#151312] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#7c3aed]">
                        {initialSofa ? <FiSave /> : <FiPlus />}
                        {initialSofa ? 'שמירת שינויים' : 'הוספת ספה'}
                    </button>
                    {initialSofa && (
                        <button type="button" onClick={onCancel} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d9c9ad] px-6 py-3 text-sm font-bold text-[#151312] transition hover:border-[#7c3aed] hover:text-[#7c3aed]">
                            <FiX />
                            ביטול עריכה
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default SofaForm;
