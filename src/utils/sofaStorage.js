import defaultSofas from '../data/defaultSofas';
import { getLocalizedText } from './localization';

const defaultSofasById = defaultSofas.reduce((acc, sofa) => {
    acc[sofa.id] = sofa;
    return acc;
}, {});

const toLocalizedField = (value, fallback = {}) => {
    if (value && typeof value === 'object') {
        return {
            he: value.he || value.en || value.ru || fallback.he || fallback.ru || '',
            ru: value.ru || value.en || value.he || fallback.ru || fallback.he || '',
        };
    }

    return {
        he: value || fallback.he || '',
        ru: fallback.ru || value || fallback.he || '',
    };
};

export const normalizeSofa = (sofa) => {
    const fallback = defaultSofasById[sofa.id] || {};

    return {
        id: sofa.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: toLocalizedField(sofa.name, fallback.name),
        description: toLocalizedField(sofa.description, fallback.description),
        category: toLocalizedField(sofa.category, fallback.category || {
            he: 'ספות מעוצבות',
            ru: 'Дизайнерские диваны',
        }),
        image: sofa.image || fallback.image,
    };
};

export const getDefaultSofas = () => defaultSofas.map(normalizeSofa);

export const toSofaFormData = (sofa) => ({
    id: sofa?.id,
    nameHe: getLocalizedText(sofa?.name, 'he'),
    nameRu: getLocalizedText(sofa?.name, 'ru'),
    descriptionHe: getLocalizedText(sofa?.description, 'he'),
    descriptionRu: getLocalizedText(sofa?.description, 'ru'),
    categoryHe: getLocalizedText(sofa?.category, 'he'),
    categoryRu: getLocalizedText(sofa?.category, 'ru'),
    image: sofa?.image || '',
});
