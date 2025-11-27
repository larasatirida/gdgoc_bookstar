import type { CollectionConfig } from 'payload'

export const BookSuggestions: CollectionConfig = {
  slug: 'book-suggestions',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Book Title',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Author',
    },
  ],
}
