export type Navigation = {
  navigate: (scene: string) => void;
};

export type AuthDetails = {
  email: string;
  password: string;
  name?: string;
};

export enum HomeButtonImg {
  Scan,
  Favorite,
  Wallet
}
