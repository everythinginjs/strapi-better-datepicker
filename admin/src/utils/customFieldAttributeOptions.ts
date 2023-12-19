import getTrad from './getTrad';

const customFieldAttributeOptions = {
  private: {
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
  required: {
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
  today: {
    name: 'options.today',
    type: 'checkbox',
    defaultValue: 'true',
    intlLabel: {
      id: getTrad('advanced.today'),
      defaultMessage: 'Highlight today',
    },
    description: {
      id: getTrad('advanced.today.description'),
      defaultMessage: 'This will highlight today on calendar',
    },
  },
  locale: {
    name: 'options.locale',
    type: 'select',
    defaultValue: 'english',
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
  calendar: {
    name: 'options.type',
    type: 'select',
    defaultValue: 'gregorian',
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
};

export default customFieldAttributeOptions;
