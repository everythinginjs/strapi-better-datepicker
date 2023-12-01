import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import getTrad from './utils/getTrad';
import PluginIcon from './components/PluginIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.customFields.register({
      name,
      pluginId,
      type: 'json',
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
          import(/* WebpackChunkName: betterDatepicker  */ './components/Datepicker'),
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: getTrad('base.section.title.type'),
              defaultMessage: 'Type',
            },
            items: [
              {
                type: 'select',
                defaultValue: 'gregorian',
                name: 'options.type',
                intlLabel: {
                  id: getTrad('base.type.items'),
                  defaultMessage: 'Calendar Type',
                },
                options: [
                  {
                    key: 'gregorian',
                    value: 'gregorian',
                    metadatas: {
                      intlLabel: {
                        id: getTrad('base.type.items.gregorian'),
                        defaultMessage: 'Gregorian',
                      },
                    },
                  },
                  {
                    key: 'persian',
                    value: 'persian',
                    metadatas: {
                      intlLabel: {
                        id: getTrad('base.type.items.persian'),
                        defaultMessage: 'Persian (Solar Hijri/Jalaali)',
                      },
                    },
                  },
                  {
                    key: 'arabic',
                    value: 'arabic',
                    metadatas: {
                      intlLabel: {
                        id: getTrad('base.type.items.arabic'),
                        defaultMessage: 'Arabic (Lunar Hijri)',
                      },
                    },
                  },
                  {
                    key: 'indian',
                    value: 'indian',
                    metadatas: {
                      intlLabel: {
                        id: getTrad('base.type.items.indian'),
                        defaultMessage: 'Indian',
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
        advanced: [
          {
            sectionTitle: {
              id: getTrad('advanced.section.title.settings'),
              defaultMessage: 'Settings',
            },
            items: [
              {
                type: 'select',
                defaultValue: 'english',
                name: 'options.locale',
                intlLabel: {
                  id: getTrad('advanced.locale.items'),
                  defaultMessage: 'Locale',
                },
                options: [
                  {
                    key: 'english',
                    value: 'english',
                    metadatas: {
                      intlLabel: {
                        id: getTrad('advanced.locale.english'),
                        defaultMessage: 'English',
                      },
                    },
                  },
                  {
                    key: 'farsi',
                    value: 'farsi',
                    metadatas: {
                      intlLabel: {
                        id: getTrad('advanced.locale.farsi'),
                        defaultMessage: 'Farsi',
                      },
                    },
                  },
                  {
                    key: 'arabic',
                    value: 'arabic',
                    metadatas: {
                      intlLabel: {
                        id: getTrad('advanced.locale.arabic'),
                        defaultMessage: 'Arabic',
                      },
                    },
                  },
                  {
                    key: 'indian',
                    value: 'indian',
                    metadatas: {
                      intlLabel: {
                        id: getTrad('advanced.locale.indian'),
                        defaultMessage: 'Indian',
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            name: 'private',
            type: 'checkbox',
            intlLabel: {
              id: getTrad('form.attribute.item.privateField'),
              defaultMessage: 'Private field',
            },
            description: {
              id: getTrad('form.attribute.item.privateField.description'),
              defaultMessage: 'This field will not show up in the API response',
            },
          },
          {
            name: 'required',
            type: 'checkbox',
            intlLabel: {
              id: getTrad('form.attribute.item.requiredField'),
              defaultMessage: 'Required field',
            },
            description: {
              id: getTrad('form.attribute.item.requiredField.description'),
              defaultMessage: "You won't be able to create an entry if this field is empty",
            },
          },
        ],
      },
    });
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
