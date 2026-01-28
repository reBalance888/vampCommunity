'use client'

import { useState } from 'react'
import { X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ApplyGrantDialogProps {
  isOpen: boolean
  onClose: () => void
  grantTitle: string
}

export function ApplyGrantDialog({ isOpen, onClose, grantTitle }: ApplyGrantDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    twitter: '',
    pitch: '',
    appUrl: '',
    githubUrl: '',
  })
  const [showSuccess, setShowSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = `[Vamp Community] Grant Application: ${grantTitle}`
    const body = `
Name: ${formData.name}
Twitter: @${formData.twitter}

--- My Pitch ---
${formData.pitch}

--- Links ---
App (public): ${formData.appUrl}
GitHub repo: ${formData.githubUrl}

---
Submitted via Vamp Community
    `.trim()

    window.location.href = `mailto:kevin@vampcommunity.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({ name: '', twitter: '', pitch: '', appUrl: '', githubUrl: '' })
      onClose()
    }, 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-vamp-dark border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-vamp-dark z-10">
          <div>
            <h2 className="text-2xl font-bold text-white">Apply for Grant</h2>
            <p className="text-sm text-zinc-400 mt-1">
              {grantTitle}
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
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          {/* Twitter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Twitter Handle <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500">@</span>
              <input
                type="text"
                required
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                placeholder="yourhandle"
                className="w-full pl-8 pr-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
              />
            </div>
          </div>

          {/* Pitch */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Short Pitch <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-zinc-500 mb-2">
              Tell us about you and your vision for the Vamp app
            </p>
            <textarea
              required
              value={formData.pitch}
              onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
              placeholder="I want to build Vamp because..."
              rows={4}
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors resize-none"
            />
          </div>

          {/* App URL */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              App Link <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-zinc-500 mb-2">
              Must be publicly accessible
            </p>
            <input
              type="url"
              required
              value={formData.appUrl}
              onChange={(e) => setFormData({ ...formData, appUrl: e.target.value })}
              placeholder="https://your-app.vercel.app"
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              GitHub Repo <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              required
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/you/repo"
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          {/* Rules reminder */}
          <div className="p-4 bg-vamp-purple/10 border border-vamp-purple/20 rounded-lg space-y-2">
            <p className="text-sm font-semibold text-zinc-300">Reminders:</p>
            <ul className="text-xs text-zinc-400 space-y-1">
              <li>• No wallet connect feature</li>
              <li>• No personal data collection</li>
              <li>• No download requirements for users</li>
            </ul>
          </div>

          {/* Info */}
          <div className="p-4 bg-vamp-dark/50 border border-white/5 rounded-lg">
            <p className="text-sm text-zinc-400">
              📧 Clicking submit will open your email client with pre-filled details.
              No data is collected or stored on our end.
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
              Submit Application
            </Button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass rounded-2xl p-8 max-w-md text-center space-y-4">
            <div className="text-6xl">✅</div>
            <h3 className="text-2xl font-bold text-white">Application Sent!</h3>
            <p className="text-zinc-300">
              We&apos;ll review your submission within 24-48 hours. Check your Twitter DMs for updates.
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
