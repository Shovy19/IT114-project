import {defineField, defineType} from 'sanity'

export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'id',
        title: 'User ID',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'password',
        title: 'Password (hashed)',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
    ],
  };
  