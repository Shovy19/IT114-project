// instructor.js

export default {
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the instructor',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title or position of the instructor',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'A brief biography of the instructor',
    },
    {
      name: 'age',
      title: 'Age',
      type: 'number',
      description: 'The age of the instructor',
    },
    {
      name: 'birthday',
      title: 'Birthday',
      type: 'date',
      description: 'The birthday of the instructor',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'A picture of the instructor',
    },
    {
      name: 'scheduleImage',
      title: 'Schedule Image',
      type: 'image',
      description: 'An image representing the schedule of the instructor',
    },
    {
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'course' } }],
      description: 'Courses taught by the instructor',
    },
    {
      name: 'college',
      title: 'College',
      type: 'reference',
      to: { type: 'college' },
      description: 'The college to which the instructor belongs',
    },
  ],
};
