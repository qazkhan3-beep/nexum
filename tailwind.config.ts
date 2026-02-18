import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      animationDelay: {
        '0': '0s',
        '2': '0.5s',
        '4': '1s',
        '6': '1.5s',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'grid-fade': {
          '0%, 100%': { opacity: '0.03' },
          '50%': { opacity: '0.08' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(30px, -50px)' },
          '66%': { transform: 'translate(-20px, 30px)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'aurora-drift': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '50%': { transform: 'translate(-30%, -60%) rotate(180deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'orb-float-1': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(40px, -60px)' },
          '66%': { transform: 'translate(-30px, 40px)' },
        },
        'orb-float-2': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(-50px, 50px)' },
          '66%': { transform: 'translate(60px, -40px)' },
        },
        'ripple': {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 191, 255, 0.7)' },
          '70%': { boxShadow: '0 0 0 20px rgba(0, 191, 255, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 191, 255, 0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 191, 255, 0.3), 0 0 30px rgba(0, 191, 255, 0.15)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 191, 255, 0.6), 0 0 40px rgba(0, 191, 255, 0.3)' },
        },
        'shine-sweep': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'breathing-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 191, 255, 0.4), 0 0 40px rgba(0, 191, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 35px rgba(0, 191, 255, 0.7), 0 0 60px rgba(0, 191, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
          },
        },
        'gradient-border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'spark-travel': {
          '0%': { transform: 'translateX(-100%) translateY(0)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateX(100%) translateY(100%)', opacity: '0' },
        },
        'lock-scan': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '5%': { opacity: '1' },
          '15%': { opacity: '1' },
          '20%': { transform: 'translateX(200%)', opacity: '0' },
          '100%': { transform: 'translateX(200%)', opacity: '0' },
        },
        'lock-glow-pulse': {
          '0%, 100%': { filter: 'drop-shadow(0 0 3px rgba(0, 191, 255, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 8px rgba(0, 191, 255, 0.8))' },
        },
        'locked-breathing': {
          '0%, 100%': { 
            boxShadow: '0 0 12px rgba(0, 191, 255, 0.15), 0 0 24px rgba(0, 191, 255, 0.08)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(0, 191, 255, 0.25), 0 0 36px rgba(0, 191, 255, 0.12)' 
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'grid-fade': 'grid-fade 8s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'aurora-drift': 'aurora-drift 15s ease-in-out infinite',
        'orb-float-1': 'orb-float-1 12s ease-in-out infinite',
        'orb-float-2': 'orb-float-2 14s ease-in-out infinite',
        'ripple': 'ripple 2s ease-out infinite',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'shine-sweep': 'shine-sweep 8s ease-in-out infinite',
        'breathing-glow': 'breathing-glow 3s ease-in-out infinite',
        'gradient-border-flow': 'gradient-border-flow 8s ease-in-out infinite',
        'spark-travel': 'spark-travel 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'lock-scan': 'lock-scan 8s ease-in-out infinite',
        'lock-glow-pulse': 'lock-glow-pulse 3s ease-in-out infinite',
        'locked-breathing': 'locked-breathing 4s ease-in-out infinite',
      },
      willChange: {
        'auto': 'auto',
        'scroll': 'scroll-position',
        'contents': 'contents',
        'transform': 'transform',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
