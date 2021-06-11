const baseData = {
  dataAll: {
    '11-Июнь 2021': [
      {
        id: '22222',
        title: 'День рожденья собаки',
        type: 'holiday',
        columns: [{ budget: '300p', ru: 'Бюджет' }],
      },
      {
        id: '22223',
        title: 'Пьянка у соседа',
        type: 'event',
        columns: [
          { address: '309кв', ru: 'Адресс' },
          { time: '13:59', ru: 'Время' },
        ],
      },
      {
        id: '22224',
        title: 'Заметочка',
        type: 'other',
        columns: [{ description: 'По дороге домой купить хлеба', ru: 'Заметка' }],
      },
    ],
  },
  dataTypes: {
    holiday: { ru: 'Праздник', options: { budget: { ru: 'Бюджет', type: 'text' } } },
    event: {
      ru: 'Событие',
      options: {
        address: { ru: 'Адрес', type: 'text' },
        time: { ru: 'Время', type: 'time' },
      },
    },
    other: { ru: 'Заметка', options: { description: { ru: 'Заметка', type: 'text' } } },
  },
};

const month = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const keys = {};

export { baseData, keys, month };
