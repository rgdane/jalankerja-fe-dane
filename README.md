# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 🛠️ 1. Setup & Installation

### Copy the environment template and configure your `.env`

```bash
cp src/.env.example .env
```

Update the `NEXT_PUBLIC_API_URL` in your `.env` file based on your setup:

```yaml
NEXT_PUBLIC_API_URL=https://jk-go-52014148654.asia-southeast2.run.app/api/
```

## 🐳 2. Docker Development

### Run application with Docker in seconds:

```bash
# Build the application image
make build

# Start the containers
make run

# View application logs
make logs
# See all available commands
make help
```

App berjalan di <http://localhost:3000/>
