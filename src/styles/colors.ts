export type Color =
  | `${ColorKey}.${ShadeKey}`
  | `supporting.${SupportingKey}`
  | `pressed.${PressedKey}`;

export type ColorPalette = {
  error: ColorShades;
  neutral: ColorShades;
  primary: ColorShades;
  success: ColorShades;
  positif: ColorShades;
  supporting: {
    red: string;
    yellow: string;
  };
  pressed: {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
    c5: string;
    c6: string;
    c7: string;
    c8: string;
    c9: string;
  };
  warning: ColorShades;
};

type ColorKey = keyof Omit<ColorPalette, 'supporting' | 'pressed'>;
type ShadeKey = keyof ColorShades;
type SupportingKey = keyof ColorPalette['supporting'];
type PressedKey = keyof ColorPalette['pressed'];

export type ColorShades = {
  c100: string;
  c200: string;
  c300: string;
  c400: string;
  c500: string;
  c600: string;
  c700: string;
};

export default {
  error: {
    c100: '#F6DEDD',
    c200: '#FABBBB',
    c300: '#DF6464',
    c400: '#B52626',
    c500: '#8D0909',
    c600: '#570101',
    c700: '#340000',
  },
  neutral: {
    c100: '#FBFBFB',
    c200: '#F5F5F5',
    c300: '#D8DCDF',
    c400: '#989B9E',
    c500: '#5D5F60',
    c600: '#3D3D3D',
    c700: '#0A0A0A',
  },
  positif: {
    c100: '#E4FAEA',
    c200: '#88D49E',
    c300: '#3AB45C',
    c400: '#179139',
    c500: '#087025',
    c600: '#034415',
    c700: '#01260B',
  },
  pressed: {
    c1: 'rgba(244, 227, 226, 0.75)',
    c2: 'rgba(203, 149, 147, 0.75)',
    c3: 'rgba(87, 25, 22, 0.75)',
    c4: 'rgba(216, 220, 223, 0.75)',
    c5: 'rgba(141, 9, 9, 0.75)',
    c6: 'rgba(246, 222, 221, 0.75)',
    c7: 'rgba(223, 234, 255, 0.75)',
    c8: 'rgba(16, 65, 160, 0.75)',
    c9: 'rgba(8, 112, 37, 0.75)',
  },
  primary: {
    c100: '#F4E3E2',
    c200: '#CB9593',
    c300: '#A65C5A',
    c400: '#862C2C',
    c500: '#571916',
    c600: '#330A08',
    c700: '#330A08',
  },
  success: {
    c100: '#DFEAFF',
    c200: '#B0C7F5',
    c300: '#5D8CE4',
    c400: '#2B5FC3',
    c500: '#1041A0',
    c600: '#012873',
    c700: '#001C51',
  },
  supporting: {
    red: '#FFB2A9',
    yellow: '#FEF5E2',
  },
  warning: {
    c100: '#FCF4E2',
    c200: '#F6E0A2',
    c300: '#E1BA54',
    c400: '#CE9E22',
    c500: '#AC7D05',
    c600: '#795701',
    c700: '#453200',
  },
};
