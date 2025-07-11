'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Edit, Plus, Trash2, Eye, Save, BarChart3 } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { generateSlug } from '@/lib/utils'

interface Page {
  _id: string
  slug: string
  title: string
  content: string
  metaDescription?: string
  isPublished: boolean
  updatedAt: string
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<Partial<Page> | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const savedAuth = localStorage.getItem('adminAuth')
    if (savedAuth === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      fetchPages()
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem('adminAuth', password)
      setIsAuthenticated(true)
      fetchPages()
    } else {
      toast.error('Invalid password')
    }
  }

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/admin/pages', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminAuth')}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setPages(data.pages)
      }
    } catch (error) {
      toast.error('Failed to fetch pages')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (page: Page) => {
    setCurrentPage(page)
    setIsEditModalOpen(true)
  }

  const handleCreate = () => {
    setCurrentPage({
      title: '',
      slug: '',
      content: '',
      metaDescription: '',
      isPublished: false,
    })
    setIsEditModalOpen(true)
  }

  const handleSave = async () => {
    if (!currentPage) return

    try {
      const method = currentPage._id ? 'PUT' : 'POST'
      const url = currentPage._id 
        ? `/api/admin/pages/${currentPage._id}`
        : '/api/admin/pages'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminAuth')}`,
        },
        body: JSON.stringify(currentPage),
      })

      if (response.ok) {
        toast.success('Page saved successfully')
        setIsEditModalOpen(false)
        fetchPages()
      } else {
        toast.error('Failed to save page')
      }
    } catch (error) {
      toast.error('Error saving page')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return

    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminAuth')}`,
        },
      })

      if (response.ok) {
        toast.success('Page deleted successfully')
        fetchPages()
      } else {
        toast.error('Failed to delete page')
      }
    } catch (error) {
      toast.error('Error deleting page')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="input-field mb-4"
              required
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Page Management</h1>
            <div className="flex gap-3">
              <Link href="/admin" className="btn-secondary">
                <BarChart3 size={20} className="mr-2" />
                Dashboard
              </Link>
              <Button onClick={handleCreate}>
                <Plus size={20} className="mr-2" />
                Create Page
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Slug</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Updated</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <motion.tr
                    key={page._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{page.title}</td>
                    <td className="px-6 py-4">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        /{page.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          page.isPublished
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {page.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => window.open(`/${page.slug}`, '_blank')}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Preview"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(page)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(page._id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={currentPage?._id ? 'Edit Page' : 'Create Page'}
        size="xl"
      >
        {currentPage && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={currentPage.title || ''}
                onChange={(e) => {
                  const title = e.target.value
                  setCurrentPage({
                    ...currentPage,
                    title,
                    slug: currentPage._id ? currentPage.slug : generateSlug(title),
                  })
                }}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <input
                type="text"
                value={currentPage.slug || ''}
                onChange={(e) =>
                  setCurrentPage({ ...currentPage, slug: e.target.value })
                }
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <input
                type="text"
                value={currentPage.metaDescription || ''}
                onChange={(e) =>
                  setCurrentPage({ ...currentPage, metaDescription: e.target.value })
                }
                className="input-field"
                maxLength={160}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content (Markdown supported)
              </label>
              <textarea
                value={currentPage.content || ''}
                onChange={(e) =>
                  setCurrentPage({ ...currentPage, content: e.target.value })
                }
                className="input-field"
                rows={10}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={currentPage.isPublished || false}
                onChange={(e) =>
                  setCurrentPage({ ...currentPage, isPublished: e.target.checked })
                }
                className="rounded text-purple-600"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                Publish this page
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave}>
                <Save size={20} className="mr-2" />
                Save Page
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}