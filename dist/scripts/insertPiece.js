"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const insertInGrid = (grid, item, location) => {
    const [centreY, centreX] = location;
    const deviation = Math.floor(item.length / 2);
    return grid.map((row, gridY) => {
        if (gridY < centreY - deviation || gridY > centreY + deviation) {
            return row;
        }
        const pieceY = gridY - centreY + deviation;
        return row.map((block, gridX) => {
            if (gridX < centreX - deviation || gridX > centreX + deviation) {
                return block;
            }
            const pieceX = gridX - centreX + deviation;
            return item[pieceY][pieceX] === null ? block : item[pieceY][pieceX];
        });
    });
};
exports.insertPiece = (grids, ...pieces) => {
    const newGrids = pieces.reduce((grids, piece) => {
        const { StructureGrid, PieceGrid, BorderGrid } = grids;
        const { structure, location } = piece;
        const borders = __1.parseBorders(structure);
        if (location.length === 0) {
            return grids;
        }
        return {
            StructureGrid: insertInGrid(StructureGrid, structure, location),
            PieceGrid: insertInGrid(PieceGrid, [[piece]], location),
            BorderGrid: insertInGrid(BorderGrid, borders, location),
        };
    }, grids);
    return Object.assign({}, newGrids, { StructureGrid: __1.territoryAssignment(newGrids) });
};
