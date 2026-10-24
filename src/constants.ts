export const YEAR = new Date().getFullYear();
export const GALLERY_CATEGORIES: Record<string, number> = {
  concept: import.meta.env.VITE_CONCEPT_FILE_COUNT
    ? parseInt(import.meta.env.VITE_CONCEPT_FILE_COUNT)
    : 0,
  illustration: import.meta.env.VITE_ILLUST_FILE_COUNT
    ? parseInt(import.meta.env.VITE_ILLUST_FILE_COUNT)
    : 0,
};
