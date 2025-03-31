export type User = {
    imgUrl: string;
    authenticated: boolean;
    name: string;
    email: string;
    dateJoined: string;
    public: boolean;
}

export type Game = {
    board: number[][];
}
