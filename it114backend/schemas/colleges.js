// college.js

export default {
  name: 'college',
  title: 'College',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the college',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'The location of the college',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of the college',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'An image representing the college',
    },
    {
      name: 'departments',
      title: 'Departments',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'department' } }],
      description: 'Departments within the college',
    },
  ],
};
