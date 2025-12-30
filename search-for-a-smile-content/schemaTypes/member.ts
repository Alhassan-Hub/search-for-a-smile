import {defineField, defineType} from 'sanity'

export const member = defineType({
  name: 'member',
  title: 'Members',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role in Charity',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Personal Message/Bio',
      type: 'text',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true }, // Allows you to crop the face perfectly
    }),
    defineField({
      name: 'introVideo',
      title: 'Introduction Video',
      type: 'file',
      options: {
        accept: 'video/*' // Allows members to upload MP4/MOV files
      }
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Use 1 for the first person, 2 for the second, etc.'
    }),
  ],
})