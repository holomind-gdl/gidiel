# Резюме сессии: типографика, тёмная тема, cookie, RTL, контраст

## Что делали

---

### 1. Типографика

- **Модульная шкала 1.25 (major third)** — переписана `@theme` секция с дублирующихся размеров (все level-ы были 36px) на реальную иерархию: `xs=14px → base=18px → 7xl=95px`
- **Семантическая иерархия h1–h6** — каждый заголовок жёстко привязан к шкале через `clamp()` для mobile/desktop
- **`--font-serif`** переключён на Playfair Display (был дубль Nunito)
- **Body**: `16px` floor, `font-size: 1rem`, `text-rendering: optimizeLegibility`
- **Абзацы**: `line-height: 1.6`, `margin-block: 1em`, `.measure`/`.prose` утилиты (`65ch ≈ 550–580px`) — ограничение ширины строки
- **RTL (иврит)**: Heebo + Frank Ruhl Libre шрифты, `[dir="rtl"] .animate-marquee` → `animation-direction: reverse`, `[lang="he"]` letter-spacing: 0, форматирование чисел в `<bdo dir="ltr">`

---

### 2. Тёмная тема

- **Цветовая система**: кастомные `--ink-*` токены через CSS-переменные, инвертируются в `html[data-theme="dark"]`, `html[data-theme="light"]`, и `@media (prefers-color-scheme: dark) html:not([data-theme])`
- **Panel-dark** (`.panel-dark`) — стабильно тёмная панель в кейсах (не инвертируется)
- **Panel-soft** — тонировка секций переключается между light/dark
- **`bg-white`** в тёмной теме → `#2f2820` через CSS override (все карточки, dropdown'и)
- **Скриншоты**: `qa_v3_dark.png`, `qa_v3_light.png`

---

### 3. WCAG-контраст (AA/AAA)

**Проблема**: dark-токены `ink-400`/`ink-500` давали 3.3–3.8:1 на карточках (below AA 4.5).

**Решение** — пересобрана вся палитра:

#### Dark theme

| Токен | До | После | На карточке `#2f2820` |
|---|---|---|---|
| ink-300 | `#5b4b3c` (2.42:1 ❌) | `#806e5d` | 3.97:1 ✓ (border only) |
| ink-400 | `#74624f` (2.49:1 ❌) | `#b09c87` | **5.50:1 ✓ AA** |
| ink-500 | `#937f6d` (3.80:1 ❌) | `#c2b29a` | **7.01:1 ✓ AAA** |

#### Light theme

| Токен | До | После | На креме `#f7f5f3` |
|---|---|---|---|
| ink-400 | `#937f6d` (3.51:1 ❌) | `#74614b` | **5.43:1 ✓ AA** |

- **`.dark-theme-eyebrow`** хак удалён (ставил `color: var(--ink-300)` → контраст падал)
- Audit-based: **0 low-contrast** text elements в обеих темах (Playwright headless Chrome)

---

### 4. Cookie-персистенция темы

- **`src/context/ThemeContext.tsx`**: `persistChoice()` пишет и cookie (`gidiel-theme=...; path=/; max-age=31536000; samesite=lax`), и localStorage. `readPersistedChoice()` сначала читает cookie (побеждает), потом localStorage (fallback).
- **`src/app/layout.tsx`**: `<head>` содержит inline-скрипт, который читает cookie ДО первой отрисовки и ставит `data-theme` на `<html>`. `suppressHydrationWarning` на `<html>`.
- **Найден баг**: `}catch(e){}` отсутствовал → `SyntaxError` → браузер молча не выполнял скрипт → `data-theme` никогда не выставлялся. **Фикс**: добавлен `}catch(e){}`.
- **Тест**: Playwright persistent context (chromium.launchPersistentContext) показал: `cookie=dark → reload → attr=dark`; закрытие браузера → переоткрытие → cookie всё ещё работает. **13/13 тестов** проходят.

---

### 5. Dark default

- Inline bootstrap-скрипт: если cookie нет → `document.documentElement.setAttribute('data-theme', 'dark')` (а не просто убирает атрибут)
- ThemeContext: начальное состояние `choice="dark"`/`resolved="dark"` (иконка Moon без мерцания)
- Cookie-пользователи: `light`/`dark`/`system` — всё уважается

| Cookie | Что рендерится |
|---|---|
| нет | **dark** (default) |
| `gidiel-theme=light` | light (выбор пользователя сохранён) |
| `gidiel-theme=dark` | dark (явный выбор) |
| `gidiel-theme=system` | следует за OS через `prefers-color-scheme` |

---

### 6. Logo — светлее в dark

- CSS-переменные `--logo-gi-from/to`, `--logo-di-from/to`, `--logo-el-from/to`, `--logo-mark` в `:root` + dark override
- **Light palette**: `#4e9ebd→#8fd5e6` / `#3e8eac→#78c7dc` / `#62b6d0→#2b6f8c` + mark `#68b9d6`
- **Dark palette**: `#94d6e8→#c2ecf3` / `#88cce0→#b6e2ec` / `#a5dceb→#6ec0d8` + mark `#8fcfdf`
- `Logo.tsx`: inline `backgroundImage: linear-gradient(... var(--logo-X-from) ...)` вместо хардкодных hex
- Контраст dark: худший стоп `eL-to #6ec0d8` = **9.40:1 AAA** (было 3.5:1)

---

### 7. RTL-адаптация

- **Шрифты**: Heebo (`--font-heebo`) + Frank Ruhl Libre (`--font-frank-ruhl`) — иврит-совместимые
- `[lang="he"]`: увеличенный `--text-base: 1.1875rem`, line-heights +0.1, letter-spacing: 0
- `[dir="rtl"]`: marquee reverse, form text-align: start, rotate/translate флипы
- `[lang="he"] .tabular-nums`: `direction: ltr; unicode-bidi: isolate` (числа/цены в LTR)
- Logo: `<bdo dir="ltr">`环绕 GiDieL

---

### 8. CTA кнопки — .btn-ink

- `.btn-ink` класс: `background: #1c1813; color: #f7f5f3` (всегда тёмная), hover → `rose-500`, focus ring
- Все 5 CTA переведены: hero, navbar desktop, navbar mobile sticky, contact submit, CaseStudy
- **Тест через computed styles**: идентичный bg/fg в light и dark (автоматически не инвертируется)

---

### 9. Navbar CTA — outline

- Десктоп «START A CAMPAIGN»: заменён `btn-ink` на `border border-ink-200 text-ink-700 hover:border-rose-400 hover:text-rose-500` — стиль совпадает с LanguageSwitcher и ThemeToggle

---

### 10. Mobile overflow

- **Был горизонтальный скролл на 390px**: flex-контейнер BrandMarquee растягивался под длинный трек (4400px). Причина: `min-width: auto` на flex-детях.
- **Фиксы**: `min-w-0` на контейнере, `html { overflow-x: clip }`, `body { overflow-x: clip }`, `main/section { min-width: 0 }`
- Hero h1: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]` — на 390px = 49px (было 61px)
- CaseStudy h1: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08]`

---

## Файлы (что тронуто)

```
src/app/globals.css              ← типографика, dark палитра, overflow-clip, panel-dark/soft,
                                   logo vars, btn-ink, .dark-theme-eyebrow удалён
src/app/layout.tsx               ← Heebo+Frank Ruhl, ThemeProvider, inline bootstrap (cookie+dark default),
                                   suppressHydrationWarning
src/app/page.tsx                 ← barrel-импорты секций, AnimatedOrbs, TrustBadges

src/context/ThemeContext.tsx      ← cookie+localStorage persistence, dark default state
src/context/LanguageContext.tsx   ← (не тронут в этом раунде)

src/components/sections/hero.tsx         ← hero h1 mobile downsize, btn-ink на CTA
src/components/sections/navbar.tsx       ← nav CTA: outline border, ThemeToggle, min-h-[44px]
src/components/sections/brand-marquee.tsx← min-w-0, panel-soft
src/components/sections/contact.tsx      ← btn-ink на submit
src/components/sections/work.tsx         ← panel-soft, measure на subtitle
src/components/sections/about.tsx        ← text-xl на h3, measure
src/components/sections/process.tsx      ← text-xl на h3, step numbers
src/components/ui/SectionHeader.tsx      ← h2 size + measure на subtitle
src/components/ui/Logo.tsx               ← CSS var для gradient, bdo dir="ltr"
src/components/ui/ThemeToggle.tsx        ← (создан) Sun/Moon/Monitor toggle
src/components/ui/ServiceCard.tsx        ← text-xl на h3
src/components/ui/ProjectCard.tsx        ← text-xl на h3
src/components/ui/TestimonialCard.tsx    ← italic serif в цитате
src/components/ui/StatBadge.tsx          ← tabular-nums, font-serif
src/components/ui/TrustBadges.tsx        ← text-base badge title
src/components/ui/ScrollProgress.tsx     ← (создан, не тронут в этом раунде)

src/work/CaseStudy.tsx                   ← panel-dark, h1 mobile downsize
```

---

## Проверки

| Проверка | Статус |
|---|---|
| `next build` (11 страниц, SSG) | ✅ |
| `tsc --noEmit` | ✅ |
| `eslint` | ✅ (0 errors, только CSS "no matching config" warning) |
| WCAG audit dark: 0 low-contrast | ✅ |
| WCAG audit light: 0 low-contrast | ✅ |
| Cookie persistence (persistent context): 4 сценария + закрытие браузера | ✅ |
| Mobile overflow: 0px horizontal scroll на 390 | ✅ |
| Logo contrast dark: худший 9.40:1 (AAA) | ✅ |
| Computed style CTA invariant (light=dark) | ✅ |

---

## Сервер

`http://localhost:4050/` — dark по умолчанию, cookie через toggle, переживает перезагрузку.

Запуск:
```bash
cd /Users/dg/my_agents/gidiel-clone
python3 -c "import subprocess,os; os.setsid(); subprocess.Popen(['npx','--no-install','next','start','-p','4050','-H','0.0.0.0'], stdin=subprocess.DEVNULL, stdout=open('/tmp/server.log','w'), stderr=subprocess.STDOUT, start_new_session=True, close_fds=True)"
```
