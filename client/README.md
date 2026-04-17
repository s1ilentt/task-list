## Description

The project is focused on high performance and user experience (UX).

**Main features of the implementation:**

- **Data Management:** Full synchronization with the server via TanStack Query v5.
  <br/>

- **Interface:** Styling based on Tailwind CSS 4 and Sass.
  <br/>

- **Drag-and-Drop:** Implemented complex logic for moving elements using dnd-kit and hello-pangea.
  <br/>

- **Forms:** Client-side validation via React Hook Form.
  <br/>

- **Графики:** Data visualization using Recharts.

## Сonfiguration

**The project uses this set of tools:**

- **Core:** Next.js 16, React 19, TypeScript 5.
  <br/>

- **State Management:** @tanstack/react-query (with DevTools).
  <br/>

- **Styling:** Tailwind CSS 4, Sass, lucide-react (icons), sonner (notifications).
  <br/>

- **Drag & Drop:** @dnd-kit/core, @hello-pangea/dnd.
  <br/>

- **Form Handling:** react-hook-form + axios.
  <br/>

- **Utilities:** dayjs (dates), js-cookie (working with cookies), lodash.debounce.

## Startup Requirements

**For the application to work correctly you will need:**

- **Node.js:** version 20.x or higher.
  <br/>

- **Package Manager:** npm (version 10+) or pnpm.

## Installation

1\. Cloning a repository:

```bash
git clone https://github.com/s1ilentt/task-list.git
cd client
```

2\. Environment Variables

Create a .env file in the root directory of the client folder:

```bash
touch .env
```

Find a detailed description of each variable, their purpose and example values ​​inside the .env.example file. Don't forget to specify the **correct NEXT_PUBLIC_API_URL to communicate with your backend**.

3\. Installing dependencies:

```bash
npm install
# or if you are using pnpm
pnpm install
```

4\. Starting the application:

**Development mode:**

```bash
npm run dev
```

The application will be available at url: http://localhost:3000

**Сборка для продакшена:**

```bash
npm run build
npm run start
```

## Resources

Official documentation of the tools used:

🌐 [Next.js Documentation](https://nextjs.org/docs) - framework and SSR.

📡 [TanStack Query v5](https://tanstack.com/query/latest/docs/framework/react/overview) — server state management.

🎨 [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta) — styles.

📝 [React Hook Form](https://react-hook-form.com/get-started) — working with forms.

📦 [dnd-kit](https://dndkit.com/) — modern Drag and Drop.

📊 [Recharts](https://www.google.com/search?q=https://recharts.org/en-US/) — drawing graphs.

📅 [Day.js](https://day.js.org/docs/en/installation/installation) — working with dates.

🔔 [Sonner](https://www.google.com/search?q=https://sonner.stevenly.me/) — notifications (Toasts).
