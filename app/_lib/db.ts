import {
    LevelHistory,
    parseLevelHistory,
    stringifyLevelHistory
} from './utils';

const hasLocalStorage = typeof window !== 'undefined' && window?.localStorage;

export const save = (name: string, levelHistory: LevelHistory): void => {
    if (hasLocalStorage) {
        localStorage.setItem(
            `wizard-${name}`,
            stringifyLevelHistory(levelHistory)
        );
    }
};

export const getLevelHistory = (name: string): LevelHistory | undefined => {
    if (hasLocalStorage) {
        const stringifiedLevelHistory = localStorage.getItem(`wizard-${name}`);

        if (!stringifiedLevelHistory) {
            return undefined;
        }

        return parseLevelHistory(stringifiedLevelHistory);
    }
};

export const getAllSavedWizardNames = (): string[] => {
    const savedWizards: string[] = [];

    if (hasLocalStorage) {
        const savedWizards = [];

        for (let i = 0; i < localStorage.length; i++) {
            const name = localStorage.key(i);

            if (typeof name === 'string' && name.startsWith('wizard-')) {
                savedWizards.push(name.slice(7));
            }
        }

        return savedWizards;
    }

    return savedWizards;
};
