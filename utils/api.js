import { AsyncStorage } from 'react-native';
import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar';

export function fetchCalendarResults() {
  // get all of the items which are living in the CALENDAR_STORAGE_KEY property,(fake database)
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(formatCalendarResults);
}

export function submitEntry({ entry, key }) {
  return AsyncStorage.mergeItem(
    CALENDAR_STORAGE_KEY,
    JSON.stringify({
      [key]: entry
    })
  );
}

export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);

    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
}
