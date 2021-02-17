const colorRef = {
  neutral: {
    Black: {
      base: '#000000',
    },
    White: {
      base: '#FFFFFF',
    },
    Grey: {
      base: '#969696',
      dark: '#414042',
      light: '#F0F0F0',
    },
    Bluish: {
      base: '#F6F9FF',
    },
  },

  primary: {
    Azure: {
      base: '#00539F',
      dark: '#004682',
      darker: '#003264',
      light: '#1E64AF',
      lighter: '#7DAADC',
    },

    Pumpkin: {
      base: '#F47920',
      dark: '#DE6335',
      darker: '#C74C42',
      light: '#FAA61A',
      lighter: '#FFC805',
    },

    Sapphire: {
      base: '#224099',
      dark: '#193782',
      darker: '#0F2864',
      light: '#3250A5',
      lighter: '#82A0DC',
    },
  },

  secondary: {
    Forest: {
      base: '#8CC83C',
      dark: '#009646',
      darker: '#00643C',
      light: '#A6CE39',
      lighter: '#E7EFC1',
    },

    Ruby: {
      base: '#BE1E2D',
      dark: '#961E23',
      darker: '#7D1E1E',
      light: '#ED1C24',
      lighter: '#F48473',
    },
  },
};

const colors = {
  ...colorRef,
};

export default colors;
