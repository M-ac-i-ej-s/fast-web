# BuildAI - AI-Powered Website Builder

A modern, AI-powered website builder with automated deployment capabilities. Built with Vue 3, Vuetify 3, and Firebase.

## Features

### 🎨 Beautiful UI

- Modern landing page with gradient theme (violet/green)
- Dark/Light mode support
- Smooth animations and transitions
- Responsive design for all devices

### 🔐 Authentication

- Email/Password authentication
- Google OAuth sign-in
- GitHub OAuth sign-in
- Secure session management with Firebase Auth

### 📄 Page Management

- Create unlimited pages with custom settings
- Real-time synchronization across devices
- Page status management (draft/live)
- Customizable icons and colors
- Auto-save with timestamp tracking

### 📊 Dashboard

- Overview statistics (total pages, live/draft counts)
- Grid view of all your pages
- Quick actions (view, edit, duplicate, delete)
- User profile management

### ⚙️ Page Configuration

- AI-powered page generation with custom prompts
- Form builder with email notifications
- SEO metadata configuration
- Analytics integration settings
- Custom domain support

## Tech Stack

- **Frontend Framework**: Vue 3.5.28 with Composition API
- **UI Framework**: Vuetify 3.11.8 (Material Design 3)
- **Backend**: Firebase (Authentication + Firestore)
- **Build Tool**: Vite 7.1.5
- **Language**: TypeScript
- **Routing**: File-based routing with unplugin-vue-router
- **Icons**: Material Design Icons (@mdi/font)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project (see setup guide)
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd fast-web
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:
   - Follow the guide in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
   - Enable Authentication (Email/Password, Google, GitHub)
   - Enable Firestore Database
   - Deploy security rules from `firestore.rules`

4. Start the development server:

```bash
npm run dev
```

5. Open your browser to `http://localhost:3000`

## Project Structure

```
fast-web/
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable Vue components
│   │   └── HelloWorld.vue
│   ├── composables/      # Vue composables
│   │   ├── useAuth.ts    # Authentication logic
│   │   └── usePages.ts   # Pages management logic
│   ├── pages/            # File-based routes
│   │   ├── index.vue     # Landing page
│   │   ├── signup.vue    # Sign up page
│   │   ├── dashboard.vue # Dashboard page
│   │   └── config/
│   │       └── [id].vue  # Page configuration
│   ├── plugins/          # Vue plugins
│   │   ├── index.ts
│   │   ├── firebase.ts   # Firebase initialization
│   │   └── vuetify.ts    # Vuetify configuration
│   ├── router/           # Router configuration
│   │   └── index.ts
│   ├── styles/           # Global styles
│   │   └── settings.scss
│   ├── App.vue           # Root component
│   └── main.ts           # Application entry point
├── public/               # Public static files
├── firestore.rules       # Firestore security rules
├── FIREBASE_SETUP.md     # Firebase setup guide
├── FIREBASE_PAGES_IMPLEMENTATION.md  # Implementation docs
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with auto-fix
- `npm run type-check` - Run TypeScript type checking

## Features in Detail

### Landing Page

- Hero section with call-to-action
- Feature highlights with animated cards
- Timeline showing the build process
- Statistics showcase
- Testimonials section
- Footer with links
- Login dialog

### Authentication System

- Secure user registration and login
- OAuth integration with Google and GitHub
- Password validation
- Error handling with user-friendly messages
- Persistent sessions

### Dashboard

- Real-time page synchronization
- Create, read, update, delete (CRUD) operations
- Statistics cards showing page metrics
- Grid layout with hover effects
- User menu with logout
- Theme toggle (dark/light mode)

### Page Configuration

- AI description prompt (large text field)
- Basic page settings (icon, name, domain)
- Form configuration (email, messages, redirects)
- SEO metadata (title, description, keywords)
- Analytics integration (Google Analytics, Meta Pixel)
- Preview and deploy functionality

## Firebase Integration

### Authentication

- Users managed via Firebase Authentication
- Support for multiple auth providers
- Secure token-based sessions

### Firestore Database

- `pages` collection stores all user pages
- Real-time listeners for instant updates
- Indexed by userId for efficient queries
- Automatic timestamp management
- Security rules ensure data privacy

### Security Rules

See `firestore.rules` for the complete security configuration. Key points:

- Users can only access their own pages
- All CRUD operations validate user ownership
- Data structure is validated on creation
- Read/Write rules prevent unauthorized access

## Development

### Code Style

- ESLint with Vuetify config
- TypeScript strict mode
- Composition API with `<script setup>`
- Auto-import for components and composables

### Type Safety

- Full TypeScript support
- Typed Firebase SDK
- Typed Vuetify components
- Typed route parameters

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Firebase Hosting

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize hosting:

```bash
firebase init hosting
```

4. Deploy:

```bash
firebase deploy
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and type checking
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For issues and questions, please create an issue in the repository.

## Roadmap

- [ ] AI page generation integration (OpenAI/Claude API)
- [ ] Page preview functionality
- [ ] Custom domain configuration
- [ ] Page analytics dashboard
- [ ] Collaborative editing
- [ ] Page templates library
- [ ] Export/import pages
- [ ] Version history
- [ ] A/B testing support
- [ ] SEO optimization tools

## Acknowledgments

- Vue.js team for the amazing framework
- Vuetify team for the beautiful UI components
- Firebase team for the backend infrastructure
- Material Design team for the icon set
