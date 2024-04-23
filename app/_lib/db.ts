import {
    LevelHistory,
    parseLevelHistory,
    stringifyLevelHistory
} from './utils';

const NAME_PREFIX = 'wizard-';

const hasLocalStorage = typeof window !== 'undefined' && window?.localStorage;

export const save = (name: string, levelHistory: LevelHistory): void => {
    if (hasLocalStorage) {
        const storedName = `${NAME_PREFIX}${name}`;
        
        localStorage.setItem(
            storedName,
            stringifyLevelHistory(levelHistory)
        );
    }
};

export const getLevelHistory = (name: string): LevelHistory | undefined => {
    if (hasLocalStorage) {
        const storedName = `${NAME_PREFIX}${name}`;
        const stringifiedLevelHistory = localStorage.getItem(storedName);

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

            if (typeof name === 'string' && name.startsWith(NAME_PREFIX)) {
                savedWizards.push(name.slice(7));
            }
        }

        return savedWizards;
    }

    return savedWizards;
};
