# BlueCircle Hub - Social Community App

A modern, Facebook-inspired social community application built with React, Vite, TypeScript, and Supabase. Features include user authentication, newsfeed with posts, likes, comments, profiles, and more.

## 🎨 Features

- **User Authentication** - Sign up and login with email/password via Supabase Auth
- **Newsfeed** - View and create posts with likes and comments
- **User Profiles** - View user profiles with posts
- **Modern UI** - Clean, Facebook-inspired design with Royal Blue (#0057D9) branding
- **Responsive Layout** - Left sidebar, center feed, and right widgets (desktop)
- **Real-time Updates** - Like and comment functionality with instant updates

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm (or bun)
- Supabase account and project

### Installation

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd bluecircle-hub
   ```

2. **Install dependencies**
   ```sh
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # For Vite (local development)
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

   # OR for Vercel deployment (use NEXT_PUBLIC_ prefix)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Get your Supabase credentials from: https://app.supabase.com/project/_/settings/api

4. **Run database migrations**
   
   Make sure your Supabase database has the required tables. The migrations are in `supabase/migrations/`. Run them in your Supabase SQL editor.

5. **Start the development server**
```sh
   npm run dev
   # or
   bun dev
   ```

   The app will be available at `http://localhost:8080`

## 🧪 Test Credentials

A demo account is available for testing:

- **Email**: `demo@app.com`
- **Password**: `Demo123!`

### Setting Up the Demo Account

The demo account can be created automatically from the login page:

1. **Option 1: Automatic Creation (Recommended)**
   - Go to the login page
   - Click the "Create Demo Account" button in the demo credentials box
   - The account will be created automatically
   - If email confirmation is disabled in Supabase, you'll be signed in immediately

2. **Option 2: Manual Sign Up**
   - Switch to "Sign Up" mode
   - Use the demo credentials to create the account
   - The account will be created with the demo profile

### Important: Supabase Email Confirmation

If your Supabase project has **email confirmation enabled**, you'll need to either:

- **Option A**: Disable email confirmation (for demo/testing)
  - Go to Supabase Dashboard → Authentication → Settings
  - Disable "Enable email confirmations"
  
- **Option B**: Check the email inbox for `demo@app.com` and confirm the email
  - Note: This requires access to the email account

For production, keep email confirmation enabled. For development/demo, you can disable it.

## 📦 Demo Data

The app automatically seeds demo posts when you first visit the dashboard. Demo users with random avatars from [randomuser.me](https://randomuser.me) are also created for a richer experience.

## 🚢 Deployment to Vercel

### Step 1: Prepare Your Repository

1. Push your code to GitHub, GitLab, or Bitbucket

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com)** and sign in with your Git provider

2. **Import your project**
   - Click "New Project"
   - Select your repository
   - Vercel will auto-detect Vite configuration

3. **Configure Environment Variables**
   
   In the Vercel project settings, add these environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   
   > **Important**: Use the `NEXT_PUBLIC_` prefix for Vercel deployments

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `your-project.vercel.app`

### Step 3: Verify Deployment

- Visit your deployed URL
- Test the login with demo credentials
- Verify all features are working

## 🛠️ Technologies

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Realtime)
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)

## 📁 Project Structure

```
bluecircle-hub/
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── Layout.tsx  # Main layout wrapper
│   │   ├── Sidebar.tsx # Left sidebar navigation
│   │   ├── PostCard.tsx
│   │   └── ...
│   ├── pages/          # Page components
│   │   ├── Auth.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Profile.tsx
│   │   └── ...
│   ├── integrations/
│   │   └── supabase/   # Supabase client and types
│   └── utils/          # Utility functions
├── supabase/
│   └── migrations/     # Database migrations
└── public/             # Static assets
```

## 🎨 Customization

### Branding Colors

The app uses Royal Blue (#0057D9) as the primary brand color. To change it:

1. Update `src/index.css` - CSS variables
2. Update `tailwind.config.ts` - Tailwind theme

### Environment Variables

The app supports both `VITE_` and `NEXT_PUBLIC_` prefixes for environment variables:
- `VITE_*` - For local development with Vite
- `NEXT_PUBLIC_*` - For Vercel/Next.js deployments

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Building for Production

```sh
npm run build
```

The output will be in the `dist/` directory, ready for deployment.

## 📝 Notes

- The app uses Supabase Row Level Security (RLS) for data protection
- Profile creation is automatic on user signup (via database trigger)
- Like and comment counts are automatically updated via database triggers
- Demo data is seeded automatically on first dashboard visit

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
