import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'light-grey': 'var(--light-grey)',
        'light-rose': 'var(--light-rose)',
        'light-white': 'var(--light-white)',
        pending: 'var(--color-status-pending)',
        done: 'var(--color-status-done)',
        wont: 'var(--color-status-wont)',
        white: 'var(--white)',
        purple: 'var(--purple)',
      },
      boxShadow: {
        'light-black': '0 0 10px 2px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
