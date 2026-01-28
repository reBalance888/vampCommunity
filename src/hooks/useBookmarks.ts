'use client'

import { useState, useEffect } from 'react'

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('vamp-bookmarks')
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored))
      } catch {
        // ignore malformed data
      }
    }
  }, [])

  const toggleBookmark = (resourceId: string) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]

      localStorage.setItem('vamp-bookmarks', JSON.stringify(newBookmarks))
      return newBookmarks
    })
  }

  const isBookmarked = (resourceId: string) => bookmarks.includes(resourceId)

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    count: bookmarks.length
  }
}
