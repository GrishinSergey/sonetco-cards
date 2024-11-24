# Видалити node_modules
rm -rf node_modules

# Видалити package-lock.json
rm package-lock.json

# Очистити npm кеш
npm cache clean --force

# Видалити папку dist
rm -rf dist

# Видалити .vite кеш
rm -rf node_modules/.vite

# Якщо є - видалити кеш Yarn
yarn cache clean

# Видалити кеш TypeScript (якщо є)
rm -rf tsconfig.tsbuildinfo

# Очистити кеш браузера для локального розробницького середовища
rm -rf .cache

# Якщо використовуєте VS Code, можна також очистити його кеш
rm -rf .vscode/.cache