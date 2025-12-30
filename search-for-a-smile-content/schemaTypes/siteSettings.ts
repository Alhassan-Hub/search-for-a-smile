import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'memberCount',
      title: 'Current Member Count',
      type: 'number',
      description: 'Change this number as the charity grows (e.g., 23, 25, 30)',
    }),
    defineField({
      name: 'welcomeText',
      title: 'Main Heading Text',
      type: 'string',
      description: 'The main text that appears on the home page',
    }),
  ],
})