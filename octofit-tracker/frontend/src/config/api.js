// Vite exposes environment variables prefixed with VITE_ via import.meta.env.
//
// VITE_CODESPACE_NAME must be defined for the app to reach the backend API
// when running in GitHub Codespaces. Define it in
// octofit-tracker/frontend/.env.local (see .env.local.example), e.g.:
//   VITE_CODESPACE_NAME=my-codespace-name
//
// When VITE_CODESPACE_NAME is unset, the app falls back to localhost so we
// never build an invalid "https://undefined-8000.app.github.dev" URL.
export const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

// Normalizes API responses that may be returned as a plain array or as a
// paginated object shape (e.g. { results: [...] }).
export function extractItems(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

