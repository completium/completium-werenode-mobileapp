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

export enum PlugPricing {
  PerMinute,
  Unknown
}

export enum Currency {
  Euro,
  Dollar,
  WRC,
  Tez
}

export enum PlugType {
  Type2,
  Unknown
}

export type Plug = {
  key: string, /* QR code */
  x: string,  /* geo coord x */
  y: string,  /* geo coord y */
  pricing: PlugPricing,
  price: number,
  currency: Currency
  decimal: number,
  power: number,
  plugtype: PlugType,
}

export enum ModalType {
  LoadingPlug,
  PlugNotFound
}
