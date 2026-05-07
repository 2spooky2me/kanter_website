import sofa1 from '../images/sofa1.webp';
import sofa2 from '../images/sofa2.webp';
import sofa3 from '../images/sofa3.webp';
import sofa4 from '../images/sofa4.webp';
import sofa5 from '../images/sofa5.webp';
import sofa6 from '../images/sofa6.webp';
import sofa7 from '../images/sofa7.webp';
import sofa8 from '../images/sofa8.webp';
import sofa9 from '../images/sofa9.webp';
import sofa10 from '../images/saofa10.webp';
import sofa11 from '../images/sofa11.webp';
import sofa12 from '../images/sofa12.webp';
import sofa13 from '../images/sofa13.webp';

const defaultSofas = [
    {
        id: 'classic-cloud',
        name: { he: 'קלאוד', ru: 'Cloud' },
        description: {
            he: 'ספת רביצה רחבה ורכה עם קווים נקיים, מתאימה לסלון משפחתי מודרני.',
            ru: 'Широкий мягкий диван для отдыха с чистыми линиями, идеален для современной семейной гостиной.',
        },
        category: { he: 'ספות רביצה', ru: 'Диваны для отдыха' },
        image: sofa1,
    },
    {
        id: 'corner-atelier',
        name: { he: 'אטלייה פינתית', ru: 'Atelier Corner' },
        description: {
            he: 'ספת פינה מרווחת בהתאמה אישית, עם עומק ישיבה מפנק וגימור מוקפד.',
            ru: 'Просторный угловой диван на заказ с глубокой посадкой и аккуратной отделкой.',
        },
        category: { he: 'ספות פינתיות', ru: 'Угловые диваны' },
        image: sofa2,
    },
    {
        id: 'urban-linen',
        name: { he: 'אורבן ליין', ru: 'Urban Linen' },
        description: {
            he: 'ספה אלגנטית לסלון עירוני, משלבת נוחות גבוהה ובד במראה טבעי.',
            ru: 'Элегантный диван для городской гостиной с высоким комфортом и натуральной фактурой ткани.',
        },
        category: { he: 'ספות תלת מושב', ru: 'Трехместные диваны' },
        image: sofa3,
    },
    {
        id: 'chester-premium',
        name: { he: 'צ׳סטר פרימיום', ru: 'Chester Premium' },
        description: {
            he: 'פרשנות ישראלית לספה קלאסית, עם תפירה עמוקה ונוכחות יוקרתית.',
            ru: 'Современная интерпретация классического дивана с глубокой стежкой и премиальным характером.',
        },
        category: { he: 'ספות קלאסיות', ru: 'Классические диваны' },
        image: sofa4,
    },
    {
        id: 'relax-motion',
        name: { he: 'רילקס', ru: 'Relax' },
        description: {
            he: 'ספה נפתחת ונוחה במיוחד, מתוכננת לשעות ארוכות של אירוח ומנוחה.',
            ru: 'Очень удобный раскладной диван, созданный для долгих вечеров отдыха и приема гостей.',
        },
        category: { he: 'ספות נפתחות', ru: 'Раскладные диваны' },
        image: sofa5,
    },
    {
        id: 'compact-daybed',
        name: { he: 'דייבד קומפקט', ru: 'Compact Daybed' },
        description: {
            he: 'פתרון חכם לחללים קטנים, עם מראה קליל וניצול מדויק של המקום.',
            ru: 'Умное решение для небольших пространств с легким видом и точным использованием места.',
        },
        category: { he: 'ספות נפתחות', ru: 'Раскладные диваны' },
        image: sofa6,
    },
    {
        id: 'linea-l',
        name: { he: 'לינאה L', ru: 'Linea L' },
        description: {
            he: 'מערכת ישיבה פינתית בקווים ישרים, מיוצרת לפי מידות הבית.',
            ru: 'Угловая система сидения с прямыми линиями, производится по размерам вашего дома.',
        },
        category: { he: 'ספות פינתיות', ru: 'Угловые диваны' },
        image: sofa7,
    },
    {
        id: 'retro-soft',
        name: { he: 'רטרו סופט', ru: 'Retro Soft' },
        description: {
            he: 'ספה בהשראת עיצוב אמצע המאה, עם רגליים עדינות ופרופורציות נקיות.',
            ru: 'Диван в духе mid-century с тонкими ножками и чистыми пропорциями.',
        },
        category: { he: 'ספות מעוצבות', ru: 'Дизайнерские диваны' },
        image: sofa8,
    },
    {
        id: 'velvet-boutique',
        name: { he: 'בוטיק ולווט', ru: 'Velvet Boutique' },
        description: {
            he: 'ספת בד רכה בגוונים עשירים, מוסיפה חום וסטייל לחלל האירוח.',
            ru: 'Мягкий тканевый диван в насыщенных оттенках, добавляет теплоту и стиль гостиной.',
        },
        category: { he: 'ספות מעוצבות', ru: 'Дизайнерские диваны' },
        image: sofa9,
    },
    {
        id: 'family-grand',
        name: { he: 'פמילי גרנד', ru: 'Family Grand' },
        description: {
            he: 'ספה גדולה ועמידה למשפחה, עם שלד איכותי וריפוד שנועד לשימוש יומיומי.',
            ru: 'Большой прочный семейный диван с качественным каркасом и обивкой для ежедневного использования.',
        },
        category: { he: 'ספות רביצה', ru: 'Диваны для отдыха' },
        image: sofa10,
    },
    {
        id: 'minimal-suite',
        name: { he: 'מינימל סוויט', ru: 'Minimal Suite' },
        description: {
            he: 'עיצוב שקט, נקי ומדויק למי שאוהב סלון מודרני בלי עומס.',
            ru: 'Спокойный, чистый и точный дизайн для современной гостиной без лишней визуальной нагрузки.',
        },
        category: { he: 'ספות תלת מושב', ru: 'Трехместные диваны' },
        image: sofa11,
    },
    {
        id: 'lounge-motion',
        name: { he: 'לאונג׳ מושן', ru: 'Lounge Motion' },
        description: {
            he: 'ספת ריקליינר יוקרתית עם תמיכה נוחה וגימור שמרגיש כמו אולם תצוגה.',
            ru: 'Премиальный реклайнер с удобной поддержкой и отделкой уровня шоурума.',
        },
        category: { he: 'ספות נפתחות', ru: 'Раскладные диваны' },
        image: sofa12,
    },
    {
        id: 'accent-bold',
        name: { he: 'אקסנט', ru: 'Accent' },
        description: {
            he: 'ספה עם אופי ונוכחות, מתאימה ללקוחות שמחפשים עיצוב אישי ובולט.',
            ru: 'Диван с характером и выразительным силуэтом для тех, кто хочет индивидуальный дизайн.',
        },
        category: { he: 'ספות מעוצבות', ru: 'Дизайнерские диваны' },
        image: sofa13,
    },
];

export default defaultSofas;
