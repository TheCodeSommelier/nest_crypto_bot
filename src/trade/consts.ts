export const SPOT_PUBLIC_ENDPOINT = '/0/public' as const;
export const SPOT_PRIVATE_ENDPOINT = '/0/private' as const;

export const SPOT_BASE_URL = 'https://api.kraken.com' as const;
export const SPOT_PUBLIC_URL =
  `${SPOT_BASE_URL}${SPOT_PUBLIC_ENDPOINT}` as const;
export const SPOT_PRIVATE_URL =
  `${SPOT_BASE_URL}${SPOT_PRIVATE_ENDPOINT}` as const;

export const FUTURES_BASE_URL =
  'https://futures.kraken.com/derivatives/api/v3' as const;
