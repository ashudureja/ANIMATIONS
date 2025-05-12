import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'animation',
  title: 'Animation',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'slug',
      description: 'A unique identifier for the animation',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'componentKey',
      title: 'Component Key',
      type: 'string',
      description: 'The key to identify which component to render (must match a key in the AnimationRegistry)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'The category this animation belongs to',
      options: {
        list: [
          { title: 'Buttons', value: 'buttons' },
          { title: 'Cards', value: 'cards' },
          { title: 'SVG Transitions', value: 'svg-transitions' },
          { title: 'Text Effects', value: 'text-effects' },
          { title: '3D Effects', value: '3d-effects' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the animation component',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short description of the animation',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags to help categorize and search for this animation',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      description: 'The source code for the animation component',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video Upload',
      type: 'file',
      description: 'Upload a video file for this animation',
      options: {
        accept: 'video/*',
      },
    }),
    
    defineField({
      name: 'usage',
      title: 'Usage Example',
      type: 'text',
      description: 'Example of how to use this animation component',
    }),
    defineField({
      name: 'dependencies',
      title: 'Dependencies',
      type: 'string',
      description: 'Any required dependencies for this animation',
    }),
    defineField({
      name: 'utils',
      title: 'Utility Code',
      type: 'text',
      description: 'Any utility functions or code needed for this animation',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Whether this animation should be featured on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'show',
      title: 'Show',
      type: 'boolean',
      description: 'Whether this animation should be shown on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'props',
      title: 'Props',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'type', type: 'string', title: 'Type' },
            { name: 'default', type: 'string', title: 'Default Value' },
            { name: 'description', type: 'text', title: 'Description' },
          ],
        },
      ],
      description: 'Properties that can be passed to this animation component',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
  },
}) 