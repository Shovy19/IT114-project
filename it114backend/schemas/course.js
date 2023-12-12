// course.js

export default {
    name: 'course',
    title: 'Course',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The title of the course',
      },
      {
        name: 'code',
        title: 'Code',
        type: 'string',
        description: 'The code or identifier of the course',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'A brief description of the course',
      },
      {
        name: 'instructors',
        title: 'Instructors',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'instructor' } }],
        description: 'Instructors teaching the course',
      },
    ],
  };
  