const { spacing, fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx', './layouts/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'blue-opaque': 'rgb(13 42 148 / 18%)',
        "flutter-blue": {
          "50": "#7aa9ff",
          "100": "#709fff",
          "200": "#6695ff",
          "300": "#5c8bff",
          "400": "#5281ff",
          "500": "#4877f5",
          "600": "#3e6deb",
          "700": "#3463e1",
          "800": "#2a59d7",
          "900": "#204fcd"
        },
        gray: {
          0: '#fff',
          100: '#fafafa',
          200: '#eaeaea',
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111'
        }
      },
      fontFamily: {
        sans: ['Outfit', ...fontFamily.sans],
        mono: ['Victor Mono', ...fontFamily.mono]
      },
      fontSize: {
        xs: ['1.1rem', { lineHeight: '1.6rem' }],
        sm: ['1.2rem', { lineHeight: '1.8rem' }],
        base: ['1.5rem', { lineHeight: '2.4rem' }],
        lg: ['1.6rem', { lineHeight: '2.0rem' }],
        xl: ['1.8rem', { lineHeight: '2.6rem' }],
        '2xl': ['2.2rem', { lineHeight: '2.8rem' }],
        '3xl': ['2.4rem', { lineHeight: '2.8rem' }],
        '4xl': ['3.4rem', { lineHeight: '3.0rem' }],
        '5xl': ['4.6rem', { lineHeight: '1' }],
        '6xl': ['5.8rem', { lineHeight: '1' }],
        '7xl': ['7.0rem', { lineHeight: '1' }],
        '8xl': ['9.4rem', { lineHeight: '1' }],
        '9xl': ['12.6rem', { lineHeight: '1' }],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            'p,li': {
              fontSize: '1.2rem',
              lineHeight: '2.0rem',
            },
            p: {
              code: {
                fontSize: '1.2rem',
                lineHeight: '1.8rem',
              },
            },
            span: {
              code: {
                color: theme("colors.teal.100") 
              }
            },
            // "pre code::before": {
            //   "padding-left": "unset"
            // },
            // "pre code::after": {
            //   "padding-right": "unset"
            // },
            code: {
              //backgroundColor: theme("colors.grey.100"),
              color: "#DD1144",
              fontWeight: "400",
              "border-radius": "0.25rem"
            },
            "code::before": {
              "display": "none",
              "padding-left": "0.25rem"
            },
            "code::after": {
              "display": "none",
              "padding-right": "0.25rem"
            },
            code: { color: theme('colors.pink.500') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,


            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700')
              },
              code: { color: theme('colors.blue.400') }
            },
            'h1,h2,h3,h4': {
              'scroll-margin-top': spacing[32]
            },
            thead: {
              borderBottomColor: theme('colors.gray.200')
            },
            prose: {
              pre: {
                backgroundColor: theme("colors.red.400")
              },
            },
            pre: {
              color: theme("colors.grey.1000"),
              backgroundColor: theme("colors.grey.100")
            },
            
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.green.0'),
              '&:hover': {
                color: theme('colors.blue.600')
              },
              code: { color: theme('colors.blue.400') }
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300')
            },
            'h1,h2,h3,h4': {
              color: theme('colors.gray.100'),
              'scroll-margin-top': spacing[32]
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') }
              }
            },
            ul: {
              li: {
                // '&:before': { backgroundColor: theme('colors.gray.500') }
              }
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100')
              },
              borderBottomColor: theme('colors.gray.600')
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700')
              }
            }
          }
        }
      }),
      'animation': {
        'text':'text 5s ease infinite',
    },
    'keyframes': {
        'text': {
            '0%, 100%': {
               'background-size':'200% 200%',
                'background-position': 'left center'
            },
            '50%': {
               'background-size':'200% 200%',
                'background-position': 'right center'
            }
        },
    }
    }
  },
  variants: {
    typography: ['dark']
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
};
