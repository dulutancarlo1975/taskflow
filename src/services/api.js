export const API =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/tasks'
    : 'https://my-json-server.typicode.com/dulutancarlo1975/taskflow/tasks';

export function usesPersistedApi() {
  return API.includes('localhost') || API.includes('127.0.0.1');
}
