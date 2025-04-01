export type User = {
    imgUrl: string;
    authenticated: boolean;
    name: string;
    email: string;
    dateJoined: string;
    public: boolean;
}

export type Cell = {
    row: number;
    column: number;
    color: string;
    state: 'empty' | 'marked' | 'star';
    borderRight: boolean;
    borderBottom: boolean;
}

export type Game = {
    board: Cell[][];
    hasStarted: boolean;
    isFinished: boolean;
    isMarkingEmpty: boolean;
    clientStartTime: number;
    clientEndTime: number;
}


