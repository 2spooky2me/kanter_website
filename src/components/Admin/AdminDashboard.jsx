import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    FiEdit3,
    FiExternalLink,
    FiFolder,
    FiGrid,
    FiLogOut,
    FiShield,
    FiTrash2,
} from 'react-icons/fi';
import { createSofa, removeSofa, saveSofa } from '../../store/furnitureSlice';
import { getLocalizedText } from '../../utils/localization';
import AdminCredentialsForm from './AdminCredentialsForm';
import CategoryManager from './CategoryManager';
import SofaForm from './SofaForm';

const UNCATEGORIZED_CATEGORY = {
    he: 'ללא קטגוריה',
    ru: 'Без категории',
};

const TABS = [
    { id: 'sofas', label: 'ספות', icon: FiGrid },
    { id: 'categories', label: 'קטגוריות', icon: FiFolder },
    { id: 'security', label: 'אבטחה', icon: FiShield },
];

const getCategoryKey = (category) => `${category.he || ''}::${category.ru || ''}`;

const AdminDashboard = ({ onLogout }) => {
    const sofas = useSelector((state) => state.furniture.items);
    const status = useSelector((state) => state.furniture.status);
    const error = useSelector((state) => state.furniture.error);
    const dispatch = useDispatch();
    const [editingSofa, setEditingSofa] = useState(null);
    const [activeTab, setActiveTab] = useState('sofas');
    const [adminError, setAdminError] = useState('');

    const categories = useMemo(() => {
        const categoryMap = new Map();

        sofas.forEach((sofa) => {
            const he = getLocalizedText(sofa.category, 'he').trim();
            const ru = getLocalizedText(sofa.category, 'ru').trim();

            if (!he) {
                return;
            }

            const key = getCategoryKey({ he, ru });
            const existingCategory = categoryMap.get(key);

            categoryMap.set(key, {
                key,
                he,
                ru,
                count: (existingCategory?.count || 0) + 1,
            });
        });

        return Array.from(categoryMap.values()).sort((first, second) =>
            first.he.localeCompare(second.he, 'he')
        );
    }, [sofas]);

    const stats = [
        { label: 'ספות בגלריה', value: sofas.length },
        { label: 'קטגוריות פעילות', value: categories.length },
        { label: 'מצב מערכת', value: status === 'loading' ? 'טוען' : 'פעיל' },
    ];

    const handleSave = async (sofa) => {
        setAdminError('');

        try {
            if (editingSofa) {
                await dispatch(saveSofa(sofa)).unwrap();
                setEditingSofa(null);
                setActiveTab('sofas');
                return;
            }

            await dispatch(createSofa(sofa)).unwrap();
            setActiveTab('sofas');
        } catch (saveError) {
            setAdminError('לא הצלחנו לשמור את הספה. בדוק ששרת ה-API פעיל ונסה שוב.');
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('למחוק את הספה מהגלריה?');

        if (!confirmed) {
            return;
        }

        setAdminError('');

        try {
            await dispatch(removeSofa(id)).unwrap();
            setEditingSofa((currentSofa) => (currentSofa?.id === id ? null : currentSofa));
        } catch (deleteError) {
            setAdminError('לא הצלחנו למחוק את הספה. בדוק ששרת ה-API פעיל ונסה שוב.');
        }
    };

    const handleDeleteCategory = async (category) => {
        const matchingSofas = sofas.filter((sofa) => {
            const he = getLocalizedText(sofa.category, 'he').trim();
            const ru = getLocalizedText(sofa.category, 'ru').trim();
            return getCategoryKey({ he, ru }) === category.key;
        });

        if (!matchingSofas.length) {
            return;
        }

        const confirmed = window.confirm(
            `למחוק את הקטגוריה "${category.he}"? ${matchingSofas.length} ספות יעברו ל"ללא קטגוריה".`
        );

        if (!confirmed) {
            return;
        }

        setAdminError('');

        try {
            await Promise.all(
                matchingSofas.map((sofa) =>
                    dispatch(
                        saveSofa({
                            ...sofa,
                            category: UNCATEGORIZED_CATEGORY,
                        })
                    ).unwrap()
                )
            );

            const editedCategoryKey =
                editingSofa &&
                getCategoryKey({
                    he: getLocalizedText(editingSofa.category, 'he').trim(),
                    ru: getLocalizedText(editingSofa.category, 'ru').trim(),
                });

            if (editedCategoryKey === category.key) {
                setEditingSofa(null);
            }
        } catch (deleteCategoryError) {
            setAdminError('לא הצלחנו למחוק את הקטגוריה. בדוק ששרת ה-API פעיל ונסה שוב.');
        }
    };

    const handleEdit = (sofa) => {
        setEditingSofa(sofa);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogout = () => {
        window.sessionStorage.removeItem('kanter_admin_token');
        onLogout();
    };

    return (
        <div className="min-h-screen bg-[#fff8ec] text-[#151312]" dir="rtl">
            <header className="border-b border-[#eadcc4] bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
                    <div>
                        <span className="text-sm font-black uppercase tracking-[0.2em] text-[#7c3aed]">
                            Admin
                        </span>
                        <h1 className="mt-1 text-3xl font-black md:text-4xl">ניהול אתר קנטר</h1>
                        <p className="mt-2 text-sm font-semibold text-stone-500">
                            ניהול גלריית הספות, הקטגוריות ופרטי הכניסה למערכת.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-full border border-[#d9c9ad] bg-white px-5 py-3 text-sm font-bold text-[#151312] transition hover:border-[#7c3aed] hover:text-[#7c3aed]"
                        >
                            <FiExternalLink aria-hidden="true" />
                            צפייה באתר
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 rounded-full bg-[#151312] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7c3aed]"
                            type="button"
                        >
                            <FiLogOut aria-hidden="true" />
                            יציאה
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">
                <section className="grid gap-4 md:grid-cols-3">
                    {stats.map((stat) => (
                        <article
                            className="rounded-[8px] border border-[#eadcc4] bg-white p-5 shadow-sm"
                            key={stat.label}
                        >
                            <p className="text-sm font-bold text-stone-500">{stat.label}</p>
                            <strong className="mt-2 block text-3xl font-black text-[#151312]">
                                {stat.value}
                            </strong>
                        </article>
                    ))}
                </section>

                {(error || adminError) && (
                    <div className="mt-6 rounded-[8px] border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                        {adminError ||
                            'לא הצלחנו לטעון את הספות מהשרת. בדוק ששרת ה-API פעיל.'}
                    </div>
                )}

                <div className="mt-8 grid gap-8 lg:grid-cols-[430px_1fr]">
                    <aside className="lg:sticky lg:top-6 lg:self-start">
                        <SofaForm
                            categories={categories}
                            initialSofa={editingSofa}
                            onSave={handleSave}
                            onCancel={() => setEditingSofa(null)}
                        />
                    </aside>

                    <section className="grid content-start gap-6">
                        <nav
                            aria-label="אזורי ניהול"
                            className="flex flex-wrap items-center gap-2 rounded-[8px] border border-[#eadcc4] bg-white p-2 shadow-sm"
                        >
                            {TABS.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;

                                return (
                                    <button
                                        className={`inline-flex h-11 min-w-28 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-black transition ${
                                            isActive
                                                ? 'bg-[#151312] text-white'
                                                : 'text-stone-600 hover:bg-[#fff8ec] hover:text-[#151312]'
                                        }`}
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        type="button"
                                    >
                                        <Icon aria-hidden="true" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>

                        {activeTab === 'sofas' && (
                            <section className="rounded-[8px] border border-[#eadcc4] bg-white p-5 shadow-sm md:p-6">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <span className="text-sm font-black text-[#7c3aed]">
                                            גלריה
                                        </span>
                                        <h2 className="text-2xl font-black">ספות קיימות</h2>
                                    </div>
                                    {status === 'loading' && (
                                        <p className="text-sm font-semibold text-stone-500">
                                            טוען נתונים מהשרת...
                                        </p>
                                    )}
                                </div>

                                <div className="mt-6 grid gap-4">
                                    {sofas.length === 0 && status !== 'loading' && (
                                        <div className="rounded-[8px] border border-dashed border-[#d9c9ad] bg-[#fff8ec] p-8 text-center">
                                            <h3 className="text-xl font-black">
                                                עדיין אין ספות בגלריה
                                            </h3>
                                            <p className="mt-2 text-sm font-semibold text-stone-500">
                                                הוסף ספה חדשה דרך הטופס בצד.
                                            </p>
                                        </div>
                                    )}

                                    {sofas.map((sofa) => {
                                        const sofaName = getLocalizedText(sofa.name, 'he');
                                        const sofaDescription = getLocalizedText(
                                            sofa.description,
                                            'he'
                                        );

                                        return (
                                            <article
                                                className="grid gap-4 rounded-[8px] border border-[#eadcc4] bg-white p-4 transition hover:border-[#d0b98e] hover:shadow-md sm:grid-cols-[150px_1fr] xl:grid-cols-[150px_1fr_auto]"
                                                key={sofa.id}
                                            >
                                                <img
                                                    src={sofa.image}
                                                    alt={sofaName}
                                                    className="h-36 w-full rounded-[8px] object-cover sm:h-full"
                                                />

                                                <div className="min-w-0">
                                                    <span className="text-xs font-black text-[#7c3aed]">
                                                        {getLocalizedText(sofa.category, 'he')}
                                                    </span>
                                                    <h3 className="mt-2 text-xl font-black">
                                                        {sofaName}
                                                    </h3>
                                                    {sofaDescription && (
                                                        <p className="mt-2 line-clamp-3 text-sm leading-7 text-stone-600">
                                                            {sofaDescription}
                                                        </p>
                                                    )}
                                                    {getLocalizedText(sofa.name, 'ru') && (
                                                        <p className="mt-3 text-xs font-semibold text-stone-500">
                                                            רוסית: {getLocalizedText(sofa.name, 'ru')}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex gap-2 xl:flex-col">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(sofa)}
                                                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#d9c9ad] px-4 py-2 text-sm font-bold text-[#151312] transition hover:border-[#7c3aed] hover:text-[#7c3aed]"
                                                    >
                                                        <FiEdit3 aria-hidden="true" />
                                                        עריכה
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(sofa.id)}
                                                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50"
                                                    >
                                                        <FiTrash2 aria-hidden="true" />
                                                        מחיקה
                                                    </button>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {activeTab === 'categories' && (
                            <CategoryManager
                                categories={categories}
                                uncategorizedCategory={UNCATEGORIZED_CATEGORY}
                                onDeleteCategory={handleDeleteCategory}
                            />
                        )}

                        {activeTab === 'security' && <AdminCredentialsForm />}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
