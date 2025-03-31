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
    col: number;
    color: string;
}

export type Game = {
    board: Cell[][];
}


