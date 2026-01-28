'use client'

import { useState } from 'react'
import { X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SubmitProjectDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function SubmitProjectDialog({ isOpen, onClose }: SubmitProjectDialogProps) {
  const [formData, setFormData] = useState({
    projectName: '',
    tagline: '',
    demo: '',
    github: '',
    tools: '',
    twitter: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create mailto link with form data
    const subject = `[Vamp Community] Submit Project: ${formData.projectName}`
    const body = `
Project Name: ${formData.projectName}
Tagline: ${formData.tagline}
Demo URL: ${formData.demo}
GitHub: ${formData.github}
Tools Used: ${formData.tools}
Twitter: ${formData.twitter}

---
Please review my vibecoded project for Vamp Community!
    `.trim()

    window.location.href = `mailto:kevin@vampcommunity.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Alternative: Twitter DM
    // const twitterText = `Hey! I want to submit my project "${formData.projectName}" to Vamp Community. Demo: ${formData.demo}`
    // window.open(`https://twitter.com/messages/compose?recipient_id=KSimback&text=${encodeURIComponent(twitterText)}`, '_blank')

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-vamp-dark border border-white/10 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">Submit Your Project</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Share your vibecoded project with the community
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              placeholder="My Awesome Project"
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Tagline <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="One sentence description of your project"
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          {/* Demo URL */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Demo URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              required
              value={formData.demo}
              onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
              placeholder="https://myproject.com"
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/you/project"
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          {/* Tools */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Tools Used <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.tools}
              onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
              placeholder="Claude Code, Next.js, Tailwind CSS"
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          {/* Twitter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Your Twitter Handle <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.twitter}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              placeholder="@yourhandle"
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          {/* Info */}
          <div className="p-4 bg-vamp-purple/10 border border-vamp-purple/20 rounded-lg">
            <p className="text-sm text-zinc-300">
              📧 Clicking submit will open your email client with pre-filled submission details.
              No data is collected or stored.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit via Email
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
