import { Strapi } from '@strapi/strapi';
import pluginId from '../../admin/src/pluginId';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register([
    {
      name: 'single-date-picker',
      plugin: pluginId,
      type: 'date',
    },
    {
      name: 'single-datetime-picker',
      plugin: pluginId,
      type: 'datetime',
    },
  ]);
};
