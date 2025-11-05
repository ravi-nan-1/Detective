"use client";

import { useState, useEffect, useCallback } from "react";
import type { HistoryItem } from "@/lib/types";

const HISTORY_KEY = "plagiarism-detective-history";

let memoryState: HistoryItem[] = [];
const listeners: Array<(state: HistoryItem[]) => void> = [];

function dispatch(newHistory: HistoryItem[]) {
  memoryState = newHistory;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  }
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(memoryState);

  useEffect(() => {
    // Load initial state from localStorage on mount
    try {
      const storedHistory = window.localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        memoryState = JSON.parse(storedHistory);
        setHistory(memoryState);
      }
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
      memoryState = [];
      setHistory([]);
    }

    // Subscribe to changes
    listeners.push(setHistory);
    return () => {
      // Unsubscribe
      const index = listeners.indexOf(setHistory);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  const addHistoryItem = useCallback((item: HistoryItem) => {
    const newHistory = [item, ...memoryState].slice(0, 20); // Keep last 20 items
    dispatch(newHistory);
  }, []);

  const clearHistory = useCallback(() => {
    dispatch([]);
  }, []);

  return { history, addHistoryItem, clearHistory };
}
