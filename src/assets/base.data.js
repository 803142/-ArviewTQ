const baseData = {
  dataAll: {
    '11-Июнь 2021': [
      {
        id: '22222',
        title: 'День рожденья собаки',
        type: 'holiday',
        columns: [{ budget: '300p' }],
      },
      {
        id: '22223',
        title: 'Пьянка у соседа',
        type: 'event',
        columns: [{ address: '309кв' }, { time: '13:59' }],
      },
      {
        id: '22224',
        title: 'Пьянка у соседа',
        type: 'other',
        columns: [{ Адрес: '309кв' }],
      },
    ],
  },
  dataTypes: {
    holiday: { budget: { ru: 'Бюджет', type: 'text' } },
    event: { address: { ru: 'Адрес', type: 'text' }, time: { ru: 'Время', type: 'time' } },
    other: { description: { ru: 'заметка', type: 'text' } },
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
