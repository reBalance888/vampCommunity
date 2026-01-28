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
  const [showSuccess, setShowSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

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

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onClose()
    }, 3000)
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

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass rounded-2xl p-8 max-w-md text-center space-y-4">
            <div className="text-6xl">✅</div>
            <h3 className="text-2xl font-bold text-white">Submission Sent!</h3>
            <p className="text-zinc-300">
              We&apos;ll review your project within 24-48 hours. Check your Twitter DMs for updates.
            </p>
            <div className="pt-4">
              <p className="text-sm text-zinc-500">
                This window will close automatically...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
