import { BASE_API_URL } from '../app';

export function mediaUrl(path?: string | null): string {
  if (!path) {
    return '';
  }

  return BASE_API_URL + path;
}

export function initials(firstName?: string, lastName?: string): string {
  var first = (firstName ?? '').trim().charAt(0);
  var last = (lastName ?? '').trim().charAt(0);

  return `${first}${last}`.toUpperCase();
}
