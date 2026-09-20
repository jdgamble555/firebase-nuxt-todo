export const useAbout = () => useFetch<AboutDoc>('/api/about', { key: 'about' })
