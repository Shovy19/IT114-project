import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event (new)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
        name: 'address',
        title: 'Address',
        type: 'string', // You can adjust the field type as needed
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'string',
    }),
  ],
})
