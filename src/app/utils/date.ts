var MONTHS = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
];

var GMT_OFFSET_MINUTES = 3 * 60;

function toGmtPlus3(value: string): Date | null {
  var date = new Date(value);

  if (isNaN(date.getTime())) {
    return null;
  }

  return new Date(date.getTime() + (GMT_OFFSET_MINUTES + date.getTimezoneOffset()) * 60 * 1000);
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function formatDate(value: string): string {
  var date = toGmtPlus3(value);

  if (!date) {
    return '';
  }

  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDateTime(value: string): string {
  var date = toGmtPlus3(value);

  if (!date) {
    return '';
  }

  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
