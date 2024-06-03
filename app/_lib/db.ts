import { CurrentStats, LevelHistory, SaveInfo, parseSaveInfo, stringifySaveInfo } from './utils';

const NAME_PREFIX = 'wizard-';

const hasLocalStorage = typeof window !== 'undefined' && window?.localStorage;

export const save = (
    name: string,
    levelHistory: LevelHistory,
    currentStats: CurrentStats
): void => {
    if (hasLocalStorage) {
        const storedName = `${NAME_PREFIX}${name}`;

        localStorage.setItem(storedName, stringifySaveInfo({ levelHistory, currentStats }));
    }
};

export const getSaveInfo = (name: string): SaveInfo | undefined => {
    if (hasLocalStorage) {
        const storedName = `${NAME_PREFIX}${name}`;
        const stringifiedSavedStats = localStorage.getItem(storedName);

        if (!stringifiedSavedStats) {
            return undefined;
        }

        return parseSaveInfo(stringifiedSavedStats);
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

export const deleteWizard = (name: string): void => {
    if (hasLocalStorage) {
        const storedName = `${NAME_PREFIX}${name}`;
        localStorage.removeItem(storedName);
    }
};
