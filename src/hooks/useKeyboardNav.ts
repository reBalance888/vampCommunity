'use client'

import { useState, useEffect } from 'react'

interface UseKeyboardNavOptions {
  totalItems: number
}

export function useKeyboardNav({ totalItems }: UseKeyboardNavOptions) {
  const [focusIndex, setFocusIndex] = useState(-1)

  useEffect(() => {
    setFocusIndex(-1)
  }, [totalItems])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        return
      }

      switch (e.key.toLowerCase()) {
        case 'j':
          e.preventDefault()
          setFocusIndex(prev => (prev < totalItems - 1 ? prev + 1 : prev))
          break
        case 'k':
          e.preventDefault()
          setFocusIndex(prev => (prev > 0 ? prev - 1 : prev))
          break
        case 'u':
          e.preventDefault()
          // Click upvote button in focused card
          const focused = document.querySelector(`[data-project-index="${focusIndex}"]`)
          if (focused) {
            const upvoteBtn = focused.querySelector('[data-upvote-btn]')
            upvoteBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
          }
          break
        case 'escape':
          e.preventDefault()
          setFocusIndex(-1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusIndex, totalItems])

  // Scroll focused item into view
  useEffect(() => {
    if (focusIndex >= 0) {
      const el = document.querySelector(`[data-project-index="${focusIndex}"]`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [focusIndex])

  return { focusIndex }
}
