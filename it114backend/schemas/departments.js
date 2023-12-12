export default {
    name: 'department',
    title: 'Department',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        description: 'The name of the department',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'A brief description of the department',
      },
    ],
  };