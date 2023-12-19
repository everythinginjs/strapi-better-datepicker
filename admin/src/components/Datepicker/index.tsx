import MultiDatePicker from 'react-multi-date-picker';

import persian from 'react-date-object/calendars/persian';
import persian_ar from 'react-date-object/locales/persian_ar';
import persian_en from 'react-date-object/locales/persian_en';
import persian_fa from 'react-date-object/locales/persian_fa';
import persian_hi from 'react-date-object/locales/persian_hi';

import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_ar from 'react-date-object/locales/gregorian_ar';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import gregorian_fa from 'react-date-object/locales/gregorian_fa';
import gregorian_hi from 'react-date-object/locales/gregorian_hi';

import arabic from 'react-date-object/calendars/arabic';
import arabic_ar from 'react-date-object/locales/arabic_ar';
import arabic_en from 'react-date-object/locales/arabic_en';
import arabic_fa from 'react-date-object/locales/arabic_fa';
import arabic_hi from 'react-date-object/locales/arabic_hi';

import indian from 'react-date-object/calendars/indian';
import indian_ar from 'react-date-object/locales/indian_ar';
import indian_en from 'react-date-object/locales/indian_en';
import indian_fa from 'react-date-object/locales/indian_fa';
import indian_hi from 'react-date-object/locales/indian_hi';

import { Field, FieldHint, FieldInput, Box, FieldLabel, Flex } from '@strapi/design-system';
import { useRef, useState } from 'react';

interface Props {
  name: string;
  attribute: {
    options: {
      locale: 'english' | 'farsi' | 'arabic' | 'indian';
      type: 'gregorian' | 'persian' | 'arabic' | 'indian';
      today: boolean;
    };
  };
  value: string;
  required: boolean;
  onChange: ({ target: { value, name } }: { target: { value: string; name: string } }) => void;
}

const CALENDARS = {
  gregorian,
  persian,
  arabic,
  indian,
};

const LOCALES = {
  gregorian: {
    english: gregorian_en,
    farsi: gregorian_fa,
    arabic: gregorian_ar,
    indian: gregorian_hi,
  },
  persian: {
    english: persian_en,
    farsi: persian_fa,
    arabic: persian_ar,
    indian: persian_hi,
  },
  arabic: {
    english: arabic_en,
    farsi: arabic_fa,
    arabic: arabic_ar,
    indian: arabic_hi,
  },
  indian: {
    english: indian_en,
    farsi: indian_fa,
    arabic: indian_ar,
    indian: indian_hi,
  },
};

export default function Datepicker(props: Props) {
  const {
    name,
    attribute: {
      options: { type, locale, today },
    },
    required,
    value,
    onChange,
  } = props;

  const [selectedDate, setSelectedDate] = useState(() => {
    try {
      return JSON.parse(value).calendarDate;
    } catch (error) {
      return value;
    }
  });

  const fieldRef = useRef<HTMLInputElement>(null);

  function handleAutocompleteDisable() {
    if (fieldRef.current) {
      fieldRef.current.autocomplete = 'off';
    }
  }

  return (
    <MultiDatePicker
      onOpen={handleAutocompleteDisable}
      highlightToday={today}
      locale={LOCALES[type][locale]}
      calendar={CALENDARS[type]}
      format="YYYY-MM-DD"
      value={selectedDate}
      onChange={(date) => {
        if (!Array.isArray(date)) {
          const ISO = new Intl.DateTimeFormat('fr-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(date?.toDate());

          setSelectedDate(date?.toString());

          onChange({
            target: {
              value: JSON.stringify({
                calendarDate: date?.toString(),
                ISODate: ISO,
              }),
              name,
            },
          });
        }
      }}
      render={
        <Field name="sda" hint="Normally your name seperated by a dot.">
          <Flex gap={1} direction="column" alignItems="left">
            <FieldLabel>
              {name}
              {required && <Box color="danger600">*</Box>}
            </FieldLabel>
            <FieldInput
              value={selectedDate}
              name={name}
              ref={fieldRef}
              type="text"
              placeholder="hold the place"
            />
            <FieldHint />
          </Flex>
        </Field>
      }
    />
  );
}
