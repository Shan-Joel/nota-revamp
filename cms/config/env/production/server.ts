import type { Core } from '@strapi/strapi';

// Railway terminates HTTPS at its proxy; trusting it lets Strapi set secure admin cookies.
const config = ({ env }: Core.Config.Shared.ConfigParams): Partial<Core.Config.Server> => ({
  url: env('PUBLIC_URL'),
  proxy: true,
});

export default config;
