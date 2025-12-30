// search-for-a-smile-content/schemaTypes/spotlight.ts
import {defineField, defineType} from 'sanity'

export const spotlight = defineType({
  name: 'spotlight',
  title: 'Member Spotlight',
  type: 'document',
  fields: [
    defineField({ name: 'memberName', title: 'Full Name', type: 'string' }),
    defineField({ name: 'memberRole', title: 'Role (e.g. Youth Leader)', type: 'string' }),
    defineField({ name: 'memberQuote', title: 'Personal Quote', type: 'text' }),
    defineField({ name: 'memberImage', title: 'Member Photo', type: 'image', options: { hotspot: true } }),
  ],
})