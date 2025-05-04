export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'animationId',
      title: 'Animation ID',
      type: 'slug',
      description: 'Must match the ID field of the related animation document',
      validation: Rule => Rule.required(),
    },
    {
      name: 'animation',
      title: 'Related Animation',
      type: 'reference',
      to: [{ type: 'animation' }],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            theme: 'github',
            language: 'javascript',
          },
        },
        {
          type: 'object',
          name: 'animationEmbed',
          title: 'Animation Embed',
          fields: [
            { name: 'src', type: 'url', title: 'Animation URL (e.g. Lottie JSON)' },
            { name: 'description', type: 'string', title: 'Description' },
          ],
          preview: {
            select: {
              title: 'description',
              subtitle: 'src',
            },
          },
        },
      ],
    },
  ],
};
