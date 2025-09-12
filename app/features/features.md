# Features Folder

This folder contains feature-specific modules of the app.
Each feature is self-contained and may include:

- Components
- Pages
- Services
- Hooks

## Examples

- `auth` → login, register, forgot password
- `expenses` → expense list, add expense form
- `inventory` → products, stock management

## Guidelines

- Each feature lives in its own folder (`/auth`, `/expenses`, etc.).
- Use components from `/components` where possible.
- Keep feature logic isolated and reusable.
