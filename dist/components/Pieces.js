"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pieces = {
    ca: {
        name: 'Cathedral',
        size: 6,
        structure: [
            [null, null, null, null, null],
            [null, null, 0, null, null],
            [null, 0, 0, 0, null],
            [null, null, 0, null, null],
            [null, null, 0, null, null]
        ]
    },
    ta: {
        name: 'Tavern',
        size: 1,
        structure: [
            [null, null, null],
            [null, 1, null],
            [null, null, null]
        ]
    },
    st: {
        name: 'Stable',
        size: 2,
        structure: [
            [null, 1, null],
            [null, 1, null],
            [null, null, null]
        ]
    },
    in: {
        name: 'Inn',
        size: 3,
        structure: [
            [null, 1, null],
            [null, 1, 1],
            [null, null, null]
        ]
    },
    br: {
        name: 'Bridge',
        size: 3,
        structure: [
            [null, 1, null],
            [null, 1, null],
            [null, 1, null]
        ]
    },
    sq: {
        name: 'Square',
        size: 4,
        structure: [
            [null, 1, 1],
            [null, 1, 1],
            [null, null, null]
        ]
    },
    ma: {
        name: 'Manor',
        size: 4,
        structure: [
            [null, 1, null],
            [1, 1, 1],
            [null, null, null]
        ]
    },
    ab: {
        name: 'Abbey',
        size: 4,
        structure: [
            [null, 1, null],
            [null, 1, 1],
            [null, null, 1]
        ]
    },
    if: {
        name: 'Infirmary',
        size: 5,
        structure: [
            [null, 1, null],
            [1, 1, 1],
            [null, 1, null]
        ]
    },
    cs: {
        name: 'Castle',
        size: 5,
        structure: [
            [1, null, 1],
            [1, 1, 1],
            [null, null, null]
        ]
    },
    to: {
        name: 'Tower',
        size: 5,
        structure: [
            [null, null, 1],
            [null, 1, 1],
            [1, 1, null]
        ]
    },
    ac: {
        name: 'Academy',
        size: 5,
        structure: [
            [null, 1, null],
            [1, 1, null],
            [null, 1, 1]
        ]
    },
};
exports.getPiece = (notation = '', player = 0) => {
    const parseBorders = (structure) => {
        const maxCoord = structure.length - 1;
        return structure.map((row, y, structure) => row.map((piece, x) => (piece !== null ? [
            y === 0 || structure[y - 1][x] !== piece,
            x === maxCoord || structure[y][x + 1] !== piece,
            y === maxCoord || structure[y + 1][x] !== piece,
            x === 0 || structure[y][x - 1] !== piece,
        ] : null)));
    };
    if (!notation) {
        return {
            notation: '',
            rotation: 0,
            structure: [],
            borders: [],
            location: [],
            removable: false,
            name: '',
            size: 0,
            player,
        };
    }
    const structure = ((player === -1 && (notation === 'ab' || notation === 'ac'))
        ? Pieces[notation].structure.map((row) => [...row].reverse())
        : Pieces[notation].structure)
        .map((row) => row.map((block) => block && player));
    return Object.assign({}, Pieces[notation], { notation, rotation: 0, location: [], structure, removable: false, borders: parseBorders(structure), player: notation === 'ca' ? 0 : player });
};
