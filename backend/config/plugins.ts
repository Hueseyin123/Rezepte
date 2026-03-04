// You can import the EmailConfig type from the plugin
import type { EmailConfig } from "strapi-plugin-email-designer-5/dist/server/src";

export default ({ env }) => ({
  // You need Email configured if you are gonna send emails from the Strapi backend
  // This is a simple configuration for development using MailDev
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "0.0.0.0",
        port: 1025,
        ignoreTLS: true,
      },
    },
  },
  // This is the configuration for the Email Designer plugin
  "email-designer-5": {
    enabled: true,
    // Your custom configuration here
    config: {
      // Here the Merge Tags defined will be merged with the defaults above
      mergeTags: {
        company: {
          name: "Company",
          mergeTags: {
            name: {
              name: "Company Name",
              value: "ACME Corp",
              sample: "ACME Corp",
            },
          },
        },
      },
    } as EmailConfig,
  },
});