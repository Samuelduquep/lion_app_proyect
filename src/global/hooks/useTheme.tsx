import useThemeStore from './useThemeStore';

const useTheme = () => {
    return useThemeStore((state) => ({
        darkMode: state.darkMode,
        toggleTheme: state.toggleTheme,
    }));
};

export { useTheme };
