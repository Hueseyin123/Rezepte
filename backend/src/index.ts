import type { Core } from '@strapi/strapi';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");

    extensionService.use(({ nexus }) => ({
      types: [
        nexus.objectType({
          name: "BewertungAvg",
          definition(t) {
            t.float("bewertung");
          },
        }),
        nexus.objectType({
          name: "BewertungAggregate",
          definition(t) {
            t.field("avg", { type: "BewertungAvg" });
            t.int("count");
          },
        }),
nexus.extendType({
  type: "Query",
  definition(t) {
    t.field("bewertungAggregate", {
      type: "BewertungAggregate",
      args: {
        rezeptId: nexus.nullable(nexus.idArg()),
      },
      resolve: async (_parent, args) => {
        const entries = await strapi.db.query("api::bewertung.bewertung").findMany({
          select: ["bewertung"],
          where: args.rezeptId
            ? { rezepte: { documentId: args.rezeptId } }
            : {},
        });

        const count = entries.length;
        const avg =
          count > 0
            ? entries.reduce((sum, e) => sum + e.bewertung, 0) / count
            : 0;

        return { avg: { bewertung: avg }, count };
      },
    });
  },
}),
      ],
        resolversConfig: {
    "Query.bewertungAggregate": {
      auth: false,
    },
  },
}));
  },

  
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await strapi
        .plugin("email-designer-5")
        .service("email")
        .sendTemplatedEmail(
          {
            to: "to@example.com",
            cc: ["zez@jakce.ad", "ilez@gevcanuso.la"],
            bcc: ["fud@darfuv.py"],
            from: "from@example.com",
            replyTo: "reply@example.com",
            attachments: [],
          },
          {
            templateReferenceId: 20,
            subject: `Thank you for your order`,
          },
          {
            USER: { firstName: "John", lastName: "Doe" },
            order: {
              products: [
                { name: "Article 1", price: 9.99 },
                { name: "Article 2", price: 5.55 },
              ],
            },
            shippingCost: 5,
            total: 20.54,
          }
        );
      strapi.log.info("Email sent");
    } catch (error) {
      strapi.log.error(error);
    }
  },
};