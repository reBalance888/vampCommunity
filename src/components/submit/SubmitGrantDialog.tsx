'use client'

import { useState } from 'react'
import { X, Send, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SubmitGrantDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function SubmitGrantDialog({ isOpen, onClose }: SubmitGrantDialogProps) {
  const [formData, setFormData] = useState({
    grantTitle: '',
    amount: '',
    description: '',
    requirements: '',
    deadline: '',
    sponsorName: '',
    twitter: '',
    email: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create mailto link with form data
    const subject = `[Vamp Community] Sponsor Grant: ${formData.grantTitle}`
    const body = `
Grant Title: ${formData.grantTitle}
Prize Amount: ${formData.amount}
Description: ${formData.description}

Requirements:
${formData.requirements}

Deadline: ${formData.deadline}

Sponsor Information:
Name: ${formData.sponsorName}
Twitter: ${formData.twitter}
Email: ${formData.email}

---
I'd like to sponsor a grant program for Vamp Community!
    `.trim()

    window.location.href = `mailto:kevin@vampcommunity.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-vamp-dark border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-vamp-dark z-10">
          <div>
            <h2 className="text-2xl font-bold text-white">Sponsor a Grant</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Support the vibecoding community with funding
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
          {/* Grant Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Grant Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.grantTitle}
              onChange={(e) => setFormData({ ...formData, grantTitle: e.target.value })}
              placeholder="Build the Future of AI Apps"
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          {/* Prize Amount */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Prize Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input
                type="text"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="5,000 USDC"
                className="w-full pl-12 pr-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Grant Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what you're looking for in submissions..."
              rows={4}
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors resize-none"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="List key requirements (one per line)&#10;- Must be open source&#10;- Built with vibecoding&#10;- Public demo required"
              rows={5}
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors resize-none"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Submission Deadline
            </label>
            <input
              type="text"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              placeholder="February 15, 2026"
              className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          <div className="border-t border-white/5 pt-4 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Sponsor Information</h3>

            {/* Sponsor Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Your Name / Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.sponsorName}
                onChange={(e) => setFormData({ ...formData, sponsorName: e.target.value })}
                placeholder="Your Name or Company"
                className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
              />
            </div>

            {/* Twitter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Twitter Handle <span className="text-red-500">*</span>
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-2 bg-vamp-darker border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
              />
            </div>
          </div>

          {/* Info */}
          <div className="p-4 bg-vamp-purple/10 border border-vamp-purple/20 rounded-lg">
            <p className="text-sm text-zinc-300">
              📧 Clicking submit will open your email client with pre-filled grant details.
              No data is collected or stored. We&apos;ll review and get back to you within 48 hours.
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
