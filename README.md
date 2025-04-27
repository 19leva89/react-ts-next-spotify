This project contains the following technologies


To run the client and server via concurrently:
terminal powershell -> npm run dev
terminal powershell -> npm run lint (loading ESLint checker)
terminal powershell -> npm run knip

terminal powershell -> npx supabase login
terminal powershell -> npx supabase gen types typescript --project-id PROJECT_ID --schema public > types_db.d.ts

terminal CommandPrompt -> stripe login
terminal CommandPrompt -> stripe listen --forward-to localhost:3000/api/webhooks
terminal CommandPrompt -> stripe trigger payment_intent.succeeded


