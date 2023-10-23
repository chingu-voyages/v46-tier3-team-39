import { DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod, nonNull, nullable, objectType, stringArg } from 'nexus';

export const GQLDate = asNexusMethod(DateTimeResolver, 'date');

export const Post = objectType({
  name: 'Question',
  definition(t) {
    t.int('id');
    t.int('createdId');
    t.string('type');
  }
});

//   tags String[]
//   question QuestionData
//   answer AnswerData
//   dateCreated   DateTime @default(now())
//   likeCounter LikeCounter

export const Query = objectType({
  name: 'Query',
  definition(t) {
    // To get only the question id
    t.field('question', {
      type: 'Question',
      args: {
        questionId: nonNull(stringArg())
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.question.findUnique({
          where: { id: Number(args.questionId) }
        });
      }
    });


    t.list.field('creator', {
      type: 'Question',
      args: {
        creatorId: nonNull(stringArg())
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.post.findMany({
          where: { creatorId: Number(args.creatorId) }
        });
      }
    });

    t.list.field('type', {
      type: 'Question',
      args: {
        type: nonNull(stringArg())
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.post.findMany({
          where: { type: args.type }
        });
      }
    });

    // t.list.field('users', {
    //   type: 'User',
    //   async resolve(_parent, _args, ctx) {
    //     return await ctx.prisma.user.findMany();
    //   }
    // });

    // t.list.field('filterPosts', {
    //   type: 'Post',
    //   args: {
    //     searchString: nullable(stringArg())
    //   },
    //   async resolve(_, { searchString }, ctx) {
    //     return await ctx.prisma.post.findMany({
    //       where: {
    //         OR: [{ title: { contains: searchString } }, { content: { contains: searchString } }]
    //       }
    //     });
    //   }
    // });
  }
});

// export const Mutation = objectType({
//   name: 'Mutation',
//   definition(t) {
//     t.field('signupUser', {
//       type: 'User',
//       args: {
//         name: stringArg(),
//         email: nonNull(stringArg())
//       },
//       async resolve(_, { name, email }, ctx) {
//         return await ctx.prisma.user.create({
//           data: {
//             name,
//             email
//           }
//         });
//       }
//     });

//     t.nullable.field('deletePost', {
//       type: 'Post',
//       args: {
//         postId: stringArg()
//       },
//       async resolve(_, { postId }, ctx) {
//         return await ctx.prisma.post.delete({
//           where: { id: Number(postId) }
//         });
//       }
//     });

//     t.field('createDraft', {
//       type: 'Post',
//       args: {
//         title: nonNull(stringArg()),
//         content: stringArg(),
//         authorEmail: stringArg()
//       },
//       async resolve(_, { title, content, authorEmail }, ctx) {
//         return await ctx.prisma.post.create({
//           data: {
//             title,
//             content,
//             published: false,
//             author: {
//               connect: { email: authorEmail }
//             }
//           }
//         });
//       }
//     });

//     t.nullable.field('publish', {
//       type: 'Post',
//       args: {
//         postId: stringArg()
//       },
//       async resolve(_, { postId }, ctx) {
//         return await ctx.prisma.post.update({
//           where: { id: Number(postId) },
//           data: { published: true }
//         });
//       }
//     });
//   }
// });