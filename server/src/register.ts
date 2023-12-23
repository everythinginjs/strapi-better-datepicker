import { Strapi } from '@strapi/strapi';
import pluginId from '../../admin/src/pluginId';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register([
    {
      name: 'better-datepicker',
      plugin: pluginId,
      type: 'date',
    },
    {
      name: 'multi-better-datepicker',
      plugin: pluginId,
      type: 'json',
    },
  ]);
};
