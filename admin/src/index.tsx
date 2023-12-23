import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import getTrad from './utils/getTrad';
import PluginIcon from './components/PluginIcon';
import options from './utils/customFieldAttributeOptions';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.customFields.register([
      {
        name: 'single-date-picker',
        pluginId,
        type: 'date',
        intlLabel: {
          id: getTrad('name'),
          defaultMessage: 'Better Datepicker',
        },
        intlDescription: {
          id: getTrad('description'),
          defaultMessage: 'A full-featured datepicker with a lot of customization.',
        },
        icon: PluginIcon,
        components: {
          Input: async () =>
            import(/* WebpackChunkName: SingleDatePicker  */ './components/SingleDatePicker'),
        },
        options: {
          base: [
            {
              sectionTitle: {
                id: getTrad('base.section.title.type'),
                defaultMessage: 'Type',
              },
              items: [options.calendar],
            },
          ],
          advanced: [
            {
              sectionTitle: {
                id: getTrad('advanced.section.title.settings'),
                defaultMessage: 'Settings',
              },
              items: [options.locale, options.today, options.private, options.required],
            },
          ],
        },
      },
      {
        name: 'single-datetime-picker',
        pluginId,
        type: 'datetime',
        intlLabel: {
          id: getTrad('name'),
          defaultMessage: 'multi Datepicker',
        },
        intlDescription: {
          id: getTrad('description'),
          defaultMessage: 'A full-featured datepicker with a lot of customization.',
        },
        icon: PluginIcon,
        components: {
          Input: async () =>
            import(
              /* WebpackChunkName: SingleDatetimePicker  */ './components/SingleDatetimePicker'
            ),
        },
        options: {
          base: [
            {
              sectionTitle: {
                id: getTrad('base.section.title.type'),
                defaultMessage: 'Type',
              },
              items: [options.calendar],
            },
          ],
          advanced: [
            {
              sectionTitle: {
                id: getTrad('advanced.section.title.settings'),
                defaultMessage: 'Settings',
              },
              items: [options.locale, options.today, options.private, options.required],
            },
          ],
        },
      },
    ]);
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },
  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
