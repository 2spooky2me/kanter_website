import { createSlice } from '@reduxjs/toolkit';
import sofa1 from '../images/sofa1.webp';
import sofa2 from '../images/sofa2.webp';
import sofa3 from '../images/sofa3.webp';
import sofa4 from '../images/sofa4.webp';
import sofa10 from '../images/saofa10.webp';
import sofa9 from '../images/sofa9.webp';
import sofa8 from '../images/sofa8.webp';
import sofa7 from '../images/sofa7.webp';
import sofa6 from '../images/sofa6.webp';
import sofa5 from '../images/sofa5.webp';
import sofa11 from '../images/sofa11.webp';
import sofa12 from '../images/sofa12.webp';
import sofa13 from '../images/sofa13.webp';

const furnitureSlice = createSlice({
    name: 'furniture',
    initialState: {
        items: [
            {
                name: {
                    en: "Modern Armchair",
                    he: "כורסה מודרנית",
                    ru: "Современное кресло"
                },
                description: {
                    en: "A stylish and compact armchair with a modern design.",
                    he: "כורסה מודרנית וקומפקטית בעיצוב עכשווי.",
                    ru: "Стильное и компактное кресло с современным дизайном."
                },
                image: sofa1,
            },
            {
                name: {
                    en: "Luxury Sectional Sofa",
                    he: "ספת פינה יוקרתית",
                    ru: "Роскошный секционный диван"
                },
                description: {
                    en: "A spacious sectional sofa perfect for family gatherings.",
                    he: "ספת פינה מרווחת ומושלמת למפגשים משפחתיים.",
                    ru: "Просторный секционный диван, идеально подходящий для семейных встреч."
                },
                image: sofa2,
            },
            {
                name: {
                    en: "Contemporary Loveseat",
                    he: "ספת אהבה עכשווית",
                    ru: "Современный двухместный диван"
                },
                description: {
                    en: "A sleek loveseat offering both comfort and style.",
                    he: "ספת אהבה אלגנטית המספקת נוחות וסגנון.",
                    ru: "Элегантный двухместный диван, обеспечивающий комфорт и стиль."
                },
                image: sofa3,
            },
            {
                name: {
                    en: "Classic Chesterfield Sofa",
                    he: "ספת צ'סטרפילד קלאסית",
                    ru: "Классический диван Честерфилд"
                },
                description: {
                    en: "A timeless Chesterfield sofa with deep tufting and rolled arms.",
                    he: "ספת צ'סטרפילד קלאסית עם תיפורים עמוקים וידיות מעוגלות.",
                    ru: "Вечный диван Честерфилд с глубокими пуговицами и закругленными подлокотниками."
                },
                image: sofa4,
            },
            {
                name: {
                    en: "Reclining Sofa",
                    he: "ספה נפתחת",
                    ru: "Раскладной диван"
                },
                description: {
                    en: "A plush reclining sofa designed for ultimate relaxation.",
                    he: "ספה נפתחת מרופדת, מעוצבת לנוחות מרבית.",
                    ru: "Мягкий раскладной диван, созданный для максимального расслабления."
                },
                image: sofa5,
            },
            {
                name: {
                    en: "Mid-Century Sofa",
                    he: "ספה בסגנון שנות ה-50",
                    ru: "Диван в стиле середины века"
                },
                description: {
                    en: "A retro-inspired sofa with clean lines and tapered legs.",
                    he: "ספה בהשראת שנות ה-50 עם קווים נקיים ורגליים מחודדות.",
                    ru: "Диван в ретро стиле с чистыми линиями и сужающимися ножками."
                },
                image: sofa8,
            },
            {
                name: {
                    en: "Compact Sleeper Sofa",
                    he: "ספה נפתחת קומפקטית",
                    ru: "Компактный раскладной диван"
                },
                description: {
                    en: "A convertible sleeper sofa ideal for small spaces.",
                    he: "ספה נפתחת קומפקטית, אידיאלית לחללים קטנים.",
                    ru: "Раскладной диван, идеально подходящий для небольших помещений."
                },
                image: sofa6,
            },
            {
                name: {
                    en: "L-Shaped Sofa",
                    he: "ספה בצורת L",
                    ru: "Диван L-образной формы"
                },
                description: {
                    en: "A functional L-shaped sofa, perfect for corner arrangements.",
                    he: "ספה בצורת L, מושלמת לסידור פינות.",
                    ru: "Функциональный диван L-образной формы, идеально подходящий для угловых расположений."
                },
                image: sofa7,
            },
            {
                name: {
                    en: "Upholstered Sofa",
                    he: "ספה מרופדת",
                    ru: "Обитый диван"
                },
                description: {
                    en: "An elegant upholstered sofa with soft fabric and rich colors.",
                    he: "ספה מרופדת אלגנטית עם בד רך וצבעים עשירים.",
                    ru: "Элегантный обитый диван с мягкой тканью и насыщенными цветами."
                },
                image: sofa9,
            },
            {
                name: {
                    en: "Large Family Sofa",
                    he: "ספה גדולה למשפחה",
                    ru: "Большой семейный диван"
                },
                description: {
                    en: "A spacious and durable sofa designed for family use.",
                    he: "ספה מרווחת ועמידה, מעוצבת לשימוש משפחתי.",
                    ru: "Просторный и прочный диван, предназначенный для семейного использования."
                },
                image: sofa10,
            },
            {
                name: {
                    en: "Minimalist Sofa",
                    he: "ספה מינימליסטית",
                    ru: "Минималистичный диван"
                },
                description: {
                    en: "A sofa with a minimalist design that blends with modern interiors.",
                    he: "ספה בעיצוב מינימליסטי שמשתלבת עם חללים מודרניים.",
                    ru: "Диван с минималистичным дизайном, который сочетается с современными интерьерами."
                },
                image: sofa11,
            },
            {
                name: {
                    en: "Luxury Recliner Sofa",
                    he: "ספה מפוארת נפתחת",
                    ru: "Роскошный раскладной диван"
                },
                description: {
                    en: "A premium reclining sofa with adjustable seating positions.",
                    he: "ספה מפוארת נפתחת עם אפשרויות ישיבה מתכווננות.",
                    ru: "Премиальный раскладной диван с регулируемыми положениями сидения."
                },
                image: sofa12,
            },
            {
                name: {
                    en: "Bold Accent Sofa",
                    he: "ספת מבטא נועזת",
                    ru: "Яркий акцентный диван"
                },
                description: {
                    en: "A vibrant accent sofa that adds character to any room.",
                    he: "ספת מבטא נועזת שמוסיפה אופי לכל חלל.",
                    ru: "Яркий акцентный диван, который добавляет характер любой комнате."
                },
                image: sofa13,
            },
        ],
        videoModalOpen: false,
        currentLanguage: 'en',
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        toggleVideoModal: (state) => {
            state.videoModalOpen = !state.videoModalOpen;
        },
        setLanguage: (state, action) => {
            state.currentLanguage = action.payload;
        },
    },
});

export const { setItems, toggleVideoModal, setLanguage } = furnitureSlice.actions;
export default furnitureSlice.reducer;
