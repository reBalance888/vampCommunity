'use client'

import { useState, useEffect } from 'react'

interface VoteData {
  [projectId: string]: {
    votes: number
    hasVoted: boolean
  }
}

export function useVotes(projectId: string, initialVotes: number = 0) {
  const [votes, setVotes] = useState(initialVotes)
  const [hasVoted, setHasVoted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load votes from localStorage
    const storedVotes = localStorage.getItem('vamp-votes')
    if (storedVotes) {
      try {
        const voteData: VoteData = JSON.parse(storedVotes)
        if (voteData[projectId]) {
          setVotes(initialVotes + voteData[projectId].votes)
          setHasVoted(voteData[projectId].hasVoted)
        }
      } catch (error) {
        console.error('Error parsing votes:', error)
      }
    }
    setIsLoading(false)
  }, [projectId, initialVotes])

  const upvote = () => {
    if (hasVoted) return

    const storedVotes = localStorage.getItem('vamp-votes')
    let voteData: VoteData = {}

    if (storedVotes) {
      try {
        voteData = JSON.parse(storedVotes)
      } catch (error) {
        console.error('Error parsing votes:', error)
      }
    }

    // Initialize or update vote for this project
    if (!voteData[projectId]) {
      voteData[projectId] = { votes: 0, hasVoted: false }
    }

    voteData[projectId].votes += 1
    voteData[projectId].hasVoted = true

    localStorage.setItem('vamp-votes', JSON.stringify(voteData))
    setVotes(votes + 1)
    setHasVoted(true)
  }

  return { votes, hasVoted, upvote, isLoading }
}

// Helper to get all votes (for sorting)
export function getAllVotes(): Record<string, number> {
  if (typeof window === 'undefined') return {}

  const storedVotes = localStorage.getItem('vamp-votes')
  if (!storedVotes) return {}

  try {
    const voteData: VoteData = JSON.parse(storedVotes)
    const result: Record<string, number> = {}

    for (const [id, data] of Object.entries(voteData)) {
      result[id] = data.votes
    }

    return result
  } catch (error) {
    console.error('Error getting all votes:', error)
    return {}
  }
}
