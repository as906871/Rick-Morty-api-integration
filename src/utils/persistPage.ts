const STORAGE_KEY = "rm_current_page_v1";

export const savePage = (page: number) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(page));
  } catch {
    console.log("this is ok")
  }
};

export const loadPage = (): number | null => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) return null;
    const n = Number(v);
    return Number.isFinite(n) && n >= 1 ? n : null;
  } catch {
    return null;
  }
};
