# Corporate Approval Client

React 19 + TypeScript 5.9 + Vite 8 + Redux Toolkit + React Router v7 + MUI 9 + Storybook 10 + Vitest 4 + Playwright

## Стек

- **Framework:** React 19 + TypeScript 5.9
- **Build tool:** Vite 8
- **State management:** Redux Toolkit (10 slices)
- **Routing:** React Router v7
- **UI Library:** MUI 9 + CSS Modules
- **Storybook:** 10 (lang=ru, theme=light)
- **Tests:** Vitest 4 (unit) + Playwright (E2E / Storybook a11y)
- **Validation:** Zod + React Hook Form
- **Linting:** ESLint flat config + typescript-eslint + Storybook ESLint
- **Formatting:** Prettier (semi=true, singleQuote=true, jsxSingleQuote=true, trailingComma=none)

## Архитектура: Feature-Sliced Design

| Слой      | Назначение                                                                 |
| --------- | -------------------------------------------------------------------------- |
| `app/`    | Роутинг (`routes.ts`, `AppRoutes.tsx`), store (`store.ts`), `App.tsx`      |
| `entities/` | Доменные модели с формами редактирования (company, meeting, participant) |
| `features/` | Бизнес-возможности: `api/`, Redux-slice, `types/`, `schema/`, info/edit  |
| `pages/`  | Компонент-обёртка на каждый маршрут (14 routes)                            |
| `widgets/` | Составные UI-блоки (header, footer, searchBar, meetingParticipantsList)  |
| `shared/` | Переиспользуемое: UI-примитивы, типы, хуки, утилиты, иконки, шрифты      |

## Команды

```bash
npm run dev          # dev-сервер (mode=development)
npm run build        # tsc -b && vite build — типчекинг + билд
npm run lint         # eslint .
npm run storybook    # Storybook dev, порт 6006
npm run build-storybook
```

## Тесты

```bash
npx vitest run       # unit + Storybook a11y тесты
```

- Storybook-сторис тестируются через Vitest + Playwright (`vite.config.ts` — project `storybook`)
- Unit-тесты для компонентов/слайсов отсутствуют
- Storybook a11y checks: `test: 'todo'` (не блокируют билд)

## Окружение

- Базовый URL API: `SERVER_API_URL=http://localhost:8080/approval` (`.env`)
- Storybook: lang=ru, theme=light (`.storybook/preview.tsx`)

## Подсказки агенту

- При изменении Redux-слайса проверяй согласованность с `app/store.ts` (combineSlices)
- Новые страницы — добавляй маршрут в `app/routes.ts` и компонент в `pages/`
- Новые UI-компоненты — размещай в `shared/ui/` со сторис-файлом
- API-эндпоинты — в `features/<entity>/api/`, типы — в `features/<entity>/types/` и `shared/utils/`
- Билд всегда требует `tsc -b` первым — не пропускай типчекинг
