const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  theme: {
    colors: {
      primary: {
        lighter: colors.gray['600'],
        default: colors.gray['800'],
        dark: colors.gray['900']
      },
      secondary: {
        lighter: colors.green['400'],
        default: colors.green['500'],
        dark: colors.green['800']
      },
      ascent: {
        lighter: colors.blue['300'],
        default: colors.blue['500'],
        dark: colors.blue['600']
      },
      disabled: {
        lighter: colors.gray['200'],
        default: colors.gray['500'],
        dark: colors.gray['800']
      },
      ...colors
    }
  },
  variants: {},
  plugins: []
};
