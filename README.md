# This project contains the following technologies

Animation and Interaction:
- React Spinners (loading indicators)
- useSound (sound effects)

Core Technologies:
- React 19
- TypeScript
- Next 16 (framework)

Data Fetching and State Management:
- Axios (sending requests to backend)
- Zustand (state management)

Database Management:
- Supabase (serverless PostgreSQL backend)

Form and Validation:
- React Hook Form (working with forms)

Payment:
- Stripe (payment service provider)

Styling and UI Frameworks:
- Lucide React (stylization)
- Next Themes (using theme switcher)
- shadcn/ui (stylization)
- Tailwind CSS (stylization)
- Sonner (stylization)

Utilities and Libraries:
- Knip (code analyzer and declutter)
- QueryString (parse and stringify URL)



# Project setup commands:
terminal powershell -> `npm i` (install dependencies)
terminal powershell -> `npx npm-check-updates --interactive` (update dependencies)
terminal powershell -> `npm run all`
terminal powershell -> `npm run lint` (loading ESLint checker)
terminal powershell -> `npm run types` (loading TypeScript checker)
terminal powershell -> `npm run knip` (loading Knip checker)

# Supabase commands:
terminal powershell -> `npx supabase login`
terminal powershell -> `npx supabase gen types typescript --project-id PROJECT_ID --schema public > types_db.d.ts`

# GitHub commands:
terminal powershell -> `git pull origin master` (get latest changes)

terminal powershell -> `git add .` (add all changes)
terminal powershell -> `git commit -m "commit message"` (commit changes)
terminal powershell -> `git checkout -b <branch-name>` (create new branch)

terminal powershell -> `git push origin master` (push changes to master)
terminal powershell -> `git push origin <branch-name>` (push changes to branch)

# Stripe commands:
terminal CommandPrompt -> `stripe login`
terminal CommandPrompt -> `stripe listen --forward-to localhost:3000/api/webhooks`
terminal CommandPrompt -> `stripe trigger payment_intent.succeeded`


