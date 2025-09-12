# Services Folder

This folder contains API call logic and external service integrations.

## Examples

- `authService.js` → login, register, logout APIs
- `expenseService.js` → fetch, add, delete expense APIs

## Guidelines

- Use Axios or Fetch wrappers for consistency.
- No API calls should live directly inside components.
- Always return clean data (avoid leaking raw API response shapes).
