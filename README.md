This project contains the following technologies

Animation and Interaction:
- React Spinners (loading indicators)
- useSound (sound effects)

Core Technologies:
- React 19
- TypeScript
- Next 15 (framework)

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



To run the client and server via concurrently:
terminal powershell -> npm run dev
terminal powershell -> npm run lint (loading ESLint checker)
terminal powershell -> npm run knip

terminal powershell -> npx supabase login
terminal powershell -> npx supabase gen types typescript --project-id PROJECT_ID --schema public > types_db.d.ts

terminal CommandPrompt -> stripe login
terminal CommandPrompt -> stripe listen --forward-to localhost:3000/api/webhooks
terminal CommandPrompt -> stripe trigger payment_intent.succeeded


