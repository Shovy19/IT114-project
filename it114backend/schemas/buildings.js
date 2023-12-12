// building.js

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'building',
  title: 'Building',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Building Name',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageLocation',
      title: 'Image Location',
      type: 'image',
      description: 'map location image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
