export interface Team {
    abbreviation: string;
    name: string;
    conference: string;
    division: string;
    opponents: string[];
    allowedAllTdsByMatch: number[];
    scoredAllTdsByMatch: number[];
    allowedRushingTdsByMatch: number[];
    scoredRushingTdsByMatch: number[];
    allowedReceivingTdsByMatch: number[];
    scoredReceivingTdsByMatch: number[];
    allowedAllYardsByMatch: number[];
    scoredAllYardsByMatch: number[];
    allowedRushingYardsByMatch: number[];
    scoredRushingYardsByMatch: number[];
    allowedReceivingYardsByMatch: number[];
    scoredReceivingYardsByMatch: number[];
    win: number;
    lose: number;
    draw: number;
}

// win : number;
// lose : number;
// draw : number;
// quaterBacks : number;
// runningBacks : string;
// wideReceivers : string;
// topSacks : string;
// topTackles : string;
// topInterceptions : string;

// allowedAllTd: number;
// scoredAllTd: number;
// allowedRushingTd: number;
// scoredRushingTd: number;
// allowedReceivingTd: number;
// scoredReceivingTd: number;
// allowedAllYpg: number;
// scoredAllYpg: number;
// allowedRushingYpg: number;
// scoredRushingYpg: number;
// allowedReceivingYpg: number;
// scoredReceivingYpg: number;
// sacks : number;
