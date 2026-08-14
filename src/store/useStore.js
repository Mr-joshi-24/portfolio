import { create } from 'zustand'

const useStore = create((set) => ({
  // Theme
  theme: 'dark', // 'dark' | 'midnight' | 'aurora'
  setTheme: (theme) => set({ theme }),
  
  // Loading
  isLoading: true,
  setLoading: (isLoading) => set({ isLoading }),
  
  // Active section
  activeSection: 'home',
  setActiveSection: (activeSection) => set({ activeSection }),
  
  // Command palette
  isCommandOpen: false,
  toggleCommand: () => set((state) => ({ isCommandOpen: !state.isCommandOpen })),
  setCommandOpen: (isCommandOpen) => set({ isCommandOpen }),
  
  // Cursor
  cursorVariant: 'default', // 'default' | 'hover' | 'text' | 'hidden'
  setCursorVariant: (cursorVariant) => set({ cursorVariant }),
  
  // Mobile menu
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
}))

export default useStore
