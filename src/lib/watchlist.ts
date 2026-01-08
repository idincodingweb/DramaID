import type { Drama } from "./api";

const WATCHLIST_KEY = "dramabox_watchlist";

export interface WatchlistItem {
  bookId: string;
  bookName: string;
  coverWap: string;
  chapterCount: number;
  addedAt: number;
}

export function getWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(WATCHLIST_KEY);
  return data ? JSON.parse(data) : [];
}

export function addToWatchlist(drama: Drama): void {
  const watchlist = getWatchlist();
  if (watchlist.some((item) => item.bookId === drama.bookId)) return;

  const newItem: WatchlistItem = {
    bookId: drama.bookId,
    bookName: drama.bookName,
    coverWap: drama.coverWap,
    chapterCount: drama.chapterCount,
    addedAt: Date.now(),
  };

  watchlist.unshift(newItem);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
}

export function removeFromWatchlist(bookId: string): void {
  const watchlist = getWatchlist();
  const filtered = watchlist.filter((item) => item.bookId !== bookId);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
}

export function isInWatchlist(bookId: string): boolean {
  const watchlist = getWatchlist();
  return watchlist.some((item) => item.bookId === bookId);
}
