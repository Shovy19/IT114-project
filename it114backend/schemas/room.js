import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    defineField({
      name: 'roomName',
      title: 'Room Name',
      type: 'string',
    }),
    defineField({
      name: 'buildingName',
      title: 'Building Name',
      type: 'reference',
      to: [{ type: 'building' }],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
    }),
    // Add an image field
    defineField({
      name: 'roomImage',
      title: 'Room Image',
      type: 'image',
    }),
  ],
});
