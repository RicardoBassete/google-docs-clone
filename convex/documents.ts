import { ConvexError, v } from 'convex/values'
import { paginationOptsValidator } from 'convex/server'
import { query, mutation } from './_generated/server'

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new ConvexError('Unauthorized')

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined

    const documentId = await ctx.db.insert('documents', {
      title: args.title ?? 'Untitled document',
      ownerId: user.subject,
      organizationId,
      initialContent: args.initialContent
    })

    return documentId
  }
})

export const updateById = mutation({
  args: {
    id: v.id('documents'),
    title: v.string()
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new ConvexError('Unauthorized')

    const document = await ctx.db.get(args.id)
    if (!document) throw new ConvexError('Document not found')

    const isOwner = document.ownerId === user.subject
    if (!isOwner) throw new ConvexError('Unauthorized')

    return await ctx.db.patch(args.id, { title: args.title })
  }
})

export const removeById = mutation({
  args: {
    id: v.id('documents')
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new ConvexError('Unauthorized')

    const document = await ctx.db.get(args.id)
    if (!document) throw new ConvexError('Document not found')

    const isOwner = document.ownerId === user.subject
    if (!isOwner) throw new ConvexError('Unauthorized')

    return await ctx.db.delete(args.id)
  }
})

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const { paginationOpts, search } = args

    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new ConvexError('Unauthorized')

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined

    // Search within organization
    if (search && organizationId) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', q =>
          q.search('title', search).eq('organizationId', organizationId)
        )
        .paginate(paginationOpts)
    }

    // Only Search
    if (search) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', q =>
          q.search('title', search).eq('ownerId', user.subject)
        )
        .paginate(paginationOpts)
    }

    // All docs inside organization
    if (organizationId) {
      return await ctx.db
        .query('documents')
        .withIndex('by_organization_id', q =>
          q.eq('organizationId', organizationId)
        )
        .paginate(paginationOpts)
    }

    // All personal docs
    return await ctx.db
      .query('documents')
      .withIndex('by_owner_id', q => q.eq('ownerId', user.subject))
      .paginate(paginationOpts)
  }
})

export const getById = query({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => await ctx.db.get(args.id)
})
