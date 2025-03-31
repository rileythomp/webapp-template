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
}

export type Game = {
    board: Cell[][];
    isMarkingEmpty: boolean;
}


