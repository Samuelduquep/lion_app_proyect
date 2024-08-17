import { create } from 'zustand';

interface ThemeState {
    darkMode: boolean;
    toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => {
    const savedTheme = localStorage.getItem('theme');
    const initialDarkMode = savedTheme === 'dark';

    if (initialDarkMode) {
        document.documentElement.classList.add('dark');
    }

    return {
        darkMode: initialDarkMode,
        toggleTheme: () => set((state) => {
            const newMode = !state.darkMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', newMode);
            return { darkMode: newMode };
        }),
    };
});

export default useThemeStore;
