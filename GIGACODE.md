# GIGACODE.md — corporate_approval_client

## Стек
React 19 + TypeScript 5.9 + Vite 8 + Redux Toolkit + React Router v7 + MUI 9 + Storybook 10 + Vitest 4 + Playwright

## Команды
```
npm run dev          # dev-сервер (mode=development)
npm run build        # tsc -b && vite build  — типчекинг + билд
npm run lint         # eslint .
npm run storybook    # Storybook dev, порт 6006
npm run build-storybook
```

## Архитектура: Feature-Sliced Design
- **`app/`** — router (`routes.ts` + `AppRoutes.tsx`), store (`store.ts`, 10 Redux slices), root `App.tsx`
- **`entities/`** — доменные модели с их формами редактирования (company, meeting, participant, meetingParticipant)
- **`features/`** — бизнес-возможности. Каждая содержит: `api/`, Redux-slice, `types/`, `schema/`, info/edit компоненты
- **`pages/`** — компонент-обёртка на каждый маршрут (14 routes)
- **`widgets/`** — составные UI-блоки (header, footer, searchBar, meetingParticipantsList)
- **`shared/`** — переиспользуемое: UI-примитивы (11 компонентов со Storybook-сторис), типы, хуки (`useDebounce`), утилиты, иконки, шрифты

## Конвенции
- CSS Modules (`.module.css`) для стилизации компонентов
- API вызовы распределены по `features/<entity>/api/`, не централизованы
- Валидация форм: Zod + React Hook Form (`features/*/schema/`)
- 10 Redux slices в `app/store.ts` — по slice на каждую сущность/запрос
- `tsc -b` с project references (`tsconfig.app.json` + `tsconfig.node.json`)
- ESLint flat config + `typescript-eslint` + Storybook ESLint
- Prettier: semi=true, singleQuote=true, jsxSingleQuote=true, trailingComma=none
- Строгие опции TS: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly`

## Тесты
- Storybook-сторис тестируются через Vitest + Playwright (`vite.config.ts` — project `storybook`)
- Запуск: `npx vitest run` (запустит и unit, и storybook-тесты)
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
