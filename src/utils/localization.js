export const getLocalizedText = (value, language = 'he') => {
    if (value && typeof value === 'object') {
        return value[language] || value.he || value.ru || value.en || '';
    }

    return value || '';
};

export const getLocalizedSofa = (sofa, language = 'he') => ({
    ...sofa,
    name: getLocalizedText(sofa.name, language),
    description: getLocalizedText(sofa.description, language),
    category: getLocalizedText(sofa.category, language),
});
