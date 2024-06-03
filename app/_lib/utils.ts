import * as crypto from 'crypto';
import { createContext, Dispatch, SetStateAction } from 'react';
import localFont from 'next/font/local';
import { ITEMS, RANDO_SPELLS, BOOTLEG_SPELLS, STARTING_STATS, PERMANENT_SPELLS } from './constants';

export type Item = {
    name: string;
    description?: string;
};

export type SavedItem = Item & { id: number };

export type AbilityScores = {
    strength: number;
    dexterity: number;
    will: number;
};

export type Status = {
    level: number;
    hp: number;
    defense: number;
    attackBonus: number;
    abilityScores: AbilityScores;
    items: Item[];
    randoSpells: Item[];
    bootlegSpells: Item[];
    permSpells: Item[];
};

export type InfoBoxes = {
    abilities: Item[];
    randoSpells: Item[];
    permSpells: Item[];
    bootlegSpells: Item[];
    items: Item[];
    level: number;
    newLevel: number;
    status: Status;
    updateStatus: (status: Status) => void;
};

export interface Stats {
    hp: number;
    defense: number;
    attackBonus: number;
    abilityScores: {
        strength: number;
        dexterity: number;
        will: number;
    };
    randoSpells: SavedItem[];
    bootlegSpells: SavedItem[];
    permSpells: SavedItem[];
    equipment: SavedItem[];
}

export type CurrentStatTypes = 'hp' | 'defense' | 'attackBonus';

export type CurrentStats = Partial<Pick<Stats, CurrentStatTypes>>;

export type LevelHistory = Map<number, Stats>;

export interface SaveInfo {
    levelHistory: LevelHistory;
    currentStats: CurrentStats;
}

export interface CharacterContext {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    levelHistory: LevelHistory;
    updateLevelHistory: (level: number, stats: Stats) => void;
    replaceLevelHistory: (levelHistory: LevelHistory) => void;
    level: number;
    setLevel: Dispatch<SetStateAction<number>>;
    levelling: boolean;
    setLevelling: Dispatch<SetStateAction<boolean>>;
    saved: boolean;
    setSaved: Dispatch<SetStateAction<boolean>>;
    currentStats: CurrentStats;
    setCurrentStats: Dispatch<SetStateAction<CurrentStats>>;
}

export interface SavedWizardsContext {
    savedWizards: string[];
    setSavedWizards: Dispatch<SetStateAction<string[]>>;
}

export type StatusOptions = Partial<Status>;

export const CharacterContext = createContext({
    name: '',
    setName: () => {},
    levelHistory: new Map(),
    updateLevelHistory: () => {},
    replaceLevelHistory: () => {},
    level: 0,
    setLevel: () => {},
    levelling: false,
    setLevelling: () => {},
    saved: false,
    setSaved: () => {},
    currentStats: {},
    setCurrentStats: () => {},
} as CharacterContext);

export const SavedWizardsContext = createContext({
    savedWizards: [],
    setSavedWizards: () => {}
} as SavedWizardsContext);

export const textFont = localFont({
    src: '../_assets/fonts/HyningsHandwritingV2-Regular.ttf'
});
export const titleFont = localFont({
    src: '../_assets/fonts/gomarice_marker2.ttf'
});

export const convertObjToItems = (obj: any): Item[] => {
    return Object.entries(obj).map(([key, value]) => {
        return {
            name: normalizePropName(key),
            description: `${value}`
        };
    });
};

const getRandomElement = (arr: unknown[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export const getAbilityScores = () => {
    const abilityScores: number[][] = [
        [2, 1, 0],
        [2, 0, 1],
        [1, 2, 0],
        [0, 2, 1],
        [1, 0, 2],
        [0, 1, 2]
    ];

    const abilities = getRandomElement(abilityScores) as number[];

    return {
        strength: abilities[0],
        dexterity: abilities[1],
        will: abilities[2]
    };
};

export const getAbilityScoreAsItems = () => {
    const abilityScores = getAbilityScores();
    return convertObjToItems(abilityScores);
};

export const getEquipment = (): Item[] => {
    const selectedEquipment: Item[] = [];

    while (selectedEquipment.length < 3) {
        const rolledItem = getRandomElement(ITEMS) as Item;

        if (!selectedEquipment.some((selectedItem) => selectedItem.name === rolledItem.name)) {
            selectedEquipment.push(rolledItem);
        }
    }

    return selectedEquipment;
};

export const getRandoSpell = (): Item => {
    const name = RANDO_SPELLS.map((wordList) => getRandomElement(wordList)).join(' ');

    return {
        name
    };
};

export const getBootlegSpell = (): Item => {
    return getRandomElement(BOOTLEG_SPELLS) as Item;
};

export const normalizePropName = (str: string): string => {
    if (str.length <= 2) {
        return str.toUpperCase();
    }

    let finalWord = '';

    for (let i = 0; i < str.length; i++) {
        const letter = str.charAt(i);

        if (i === 0) {
            finalWord += letter.toUpperCase();
        } else if (letter === letter.toUpperCase()) {
            finalWord += ` ${letter}`;
        } else {
            finalWord += letter;
        }
    }

    return finalWord;
};

export const getStartingStatsAsItems = () => {
    return convertObjToItems(STARTING_STATS);
};

export const getRandomStats = (): Stats => {
    const { hp, defense, attackBonus } = STARTING_STATS;
    const abilityScores = getAbilityScores();
    const randoSpell = getRandoSpell();
    const bootlegSpell = getBootlegSpell();
    const equipment = getEquipment();

    return {
        hp,
        defense,
        attackBonus,
        abilityScores,
        randoSpells: [{ ...randoSpell, id: 0 }],
        bootlegSpells: [{ ...bootlegSpell, id: 0 }],
        permSpells: PERMANENT_SPELLS.map((spell, idx) => {
            return { name: spell.name, description: spell.description, id: idx };
        }),
        equipment: equipment.map((item, idx) => {
            return { ...item, id: idx };
        })
    };
};

export const generateRandomKey = (): string => {
    const uuid = crypto.randomUUID();
    return uuid;
};

const replacer = (_: any, value: any): any => {
    return value instanceof Map
        ? {
              dataType: 'Map',
              value: [...value]
          }
        : value;
};

const reviver = (_: any, value: any): any => {
    return typeof value === 'object' && value !== null && value.dataType === 'Map'
        ? new Map(value.value)
        : value;
};

export const stringifySaveInfo = (savedStats: SaveInfo): string => {
    return JSON.stringify(savedStats, replacer);
};

export const parseSaveInfo = (stringifiedSaveInfo: string): SaveInfo => {
    return JSON.parse(stringifiedSaveInfo, reviver);
};

export const getNextId = (items: SavedItem[]): number => {
    return items.length > 0 ? items[items.length - 1].id + 1 : 0;
};
