import React from 'react';
import { FiFolder, FiTrash2 } from 'react-icons/fi';

const CategoryManager = ({ categories, uncategorizedCategory, onDeleteCategory }) => {
    return (
        <section className="rounded-[10px] border border-[#eadcc4] bg-white shadow-sm">
            <div className="border-b border-[#eadcc4] px-5 py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-black text-[#7c3aed]">סיווגים</p>
                        <h2 className="mt-1 text-2xl font-black">ניהול קטגוריות</h2>
                        <p className="mt-2 text-sm leading-6 text-stone-600">
                            מחיקת קטגוריה מעבירה את הספות ל“ללא קטגוריה” ולא מוחקת אותן.
                        </p>
                    </div>
                    <span className="rounded-full bg-[#7c3aed]/10 px-4 py-2 text-sm font-black text-[#7c3aed]">
                        {categories.length} קטגוריות
                    </span>
                </div>
            </div>

            <div className="grid gap-3 p-5">
                {categories.map((category) => {
                    const isUncategorized =
                        category.he === uncategorizedCategory.he &&
                        category.ru === uncategorizedCategory.ru;

                    return (
                        <article
                            key={category.key}
                            className="grid gap-4 rounded-[10px] border border-[#eadcc4] bg-[#fffdf8] p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                        >
                            <div className="flex gap-3">
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#7c3aed]/10 text-[#7c3aed]">
                                    <FiFolder />
                                </span>
                                <div>
                                    <h3 className="font-black text-[#151312]">{category.he}</h3>
                                    {category.ru && (
                                        <p className="mt-1 text-sm font-semibold text-stone-500">
                                            {category.ru}
                                        </p>
                                    )}
                                    <p className="mt-2 text-xs font-semibold text-stone-500">
                                        {category.count} ספות משויכות
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                disabled={isUncategorized}
                                onClick={() => onDeleteCategory(category)}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                                <FiTrash2 />
                                מחיקה
                            </button>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default CategoryManager;
