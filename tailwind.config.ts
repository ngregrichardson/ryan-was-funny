import type { Config } from "tailwindcss";

export default {
  content: ["./{app,components}/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
      },
      colors: {
        border: '#EFF3F4',
        text: '#15171a',
        muted: '#e7ecef',
        'muted-foreground': '#697684',
        accent: '#4d9feb'
      }
    },
  },
  plugins: [],
} satisfies Config;
