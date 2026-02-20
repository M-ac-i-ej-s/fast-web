/**
 * plugins/i18n.ts
 *
 * Vue I18n plugin for internationalization
 */

import { createI18n } from 'vue-i18n'

// Import locale messages
const messages = {
  en: {
    nav: {
      letsGo: "Let's Go!",
      login: 'Login',
      signUp: 'Sign Up',
      logout: 'Logout',
      dashboard: 'Dashboard',
    },
    hero: {
      title: 'Build Apps with',
      titleHighlight: 'AI Power',
      subtitle: 'No code. No hassle. Just intelligent automation.',
      cta: 'Get Started',
    },
    features: {
      title: 'Why Choose BuildAI',
      aiPowered: {
        title: 'AI-Powered Generation',
        description: 'Describe your idea in plain language. Our AI transforms your vision into production-ready code instantly.',
      },
      instantDeploy: {
        title: 'Instant Deployment',
        description: 'Your apps go live automatically with SSL, CDN, and global edge network. No DevOps required.',
      },
      smartOptimization: {
        title: 'Smart Optimization',
        description: 'Built-in performance monitoring, automatic scaling, and intelligent caching for lightning-fast experiences.',
      },
    },
    howItWorks: {
      title: 'From Idea to Live in',
      titleHighlight: '4 Steps',
      subtitle: 'Building your dream website has never been this simple',
      step1: {
        title: 'Describe Your Vision',
        description: 'Tell us what you want to build using natural language. No technical jargon required - just explain it like you would to a friend.',
      },
      step2: {
        title: 'Submit & Watch Magic',
        description: 'Our AI agents get to work immediately, generating your entire application with optimal code structure and best practices.',
      },
      step3: {
        title: 'Enjoy Your Website',
        description: 'Your site goes live automatically with SSL, CDN, and monitoring. Make changes anytime with simple commands.',
      },
      step4: {
        title: 'Iterate & Grow',
        description: 'Refine your site with updates, analytics, and new features as your business scales.',
      },
    },
    pricing: {
      title: 'Simple,',
      titleHighlight: 'Transparent Pricing',
      subtitle: 'Professional landing pages at an unbeatable price',
      price: '85 USD',
      domainCost: '+ domain cost',
      whatsIncluded: "What's Included:",
      custom: {
        title: '??? $',
        subtitle: 'Your Vision',
        cta: 'Contact Us',
        whatsIncluded: "What's Included:",
        features: {
          aiPricing: {
            title: 'AI Price Calculation',
            description: 'Smart pricing based on your requirements',
          },
          complex: {
            title: 'Complex Features',
            description: 'Advanced functionality and integrations',
          },
          backend: {
            title: 'Backend & Database',
            description: 'Full-stack solutions with custom APIs',
          },
          team: {
            title: 'Dedicated Team',
            description: 'Personal project manager and developers',
          },
          revisions: {
            title: 'Unlimited Revisions',
            description: 'Iterate until perfect during development',
          },
          support: {
            title: 'Premium Support',
            description: '3 months free maintenance included',
          },
        },
      },
      features: {
        deployTime: {
          title: '< 1 Day Deploy Time',
          description: 'Your website goes live in less than 24 hours',
        },
        support: {
          title: '24/7 Support',
          description: 'Round-the-clock assistance whenever you need it',
        },
        developers: {
          title: 'Senior Developers',
          description: 'Your project handled by experienced professionals',
        },
        modifications: {
          title: 'Custom Modifications',
          description: 'Post-generation tweaks and adjustments included',
        },
        ssl: {
          title: 'SSL & Security',
          description: 'Enterprise-grade security and HTTPS included',
        },
        mobile: {
          title: 'Mobile Optimized',
          description: 'Perfect responsive design for all devices',
        },
        fast: {
          title: 'Lightning Fast',
          description: 'Optimized for speed and performance',
        },
        seo: {
          title: 'SEO Ready',
          description: 'Built-in SEO optimization for better rankings',
        },
      },
      cta: 'Get Started',
    },
    testimonials: {
      title: 'Trusted by Developers Worldwide',
      subtitle: 'See what our users have to say about BuildAI',
      items: [
        {
          text: 'BuildAI transformed my idea into a production app in minutes. The AI understood exactly what I needed and delivered beyond expectations.',
          name: 'Sarah Chen',
          role: 'Startup Founder',
          avatar: 'SC',
        },
        {
          text: 'As a designer with no coding background, BuildAI gave me superpowers. I can now ship full-stack apps without writing a single line of code.',
          name: 'Marcus Rodriguez',
          role: 'Product Designer',
          avatar: 'MR',
        },
        {
          text: 'The deployment automation alone saves me hours every week. This platform is a game-changer for rapid prototyping and MVP development.',
          name: 'Alex Thompson',
          role: 'Tech Lead',
          avatar: 'AT',
        },
      ],
    },
    cta: {
      title: 'Ready to Build?',
      subtitle: 'Join thousands of developers building faster with AI',
      button: 'Start Building Now',
    },
    footer: {
      tagline: 'Building the future of web development with AI-powered automation and intelligent deployment solutions.',
      product: 'Product',
      company: 'Company',
      resources: 'Resources',
      legal: 'Legal',
    },
    dashboard: {
      title: 'My Pages',
      subtitle: 'Manage and create your AI-powered landing pages',
      createNew: 'Create New Page',
      empty: {
        title: 'No Pages Yet',
        subtitle: 'Create your first AI-powered page to get started',
        button: 'Create Your First Page',
      },
      pageCard: {
        status: {
          draft: 'Draft',
          live: 'Live',
        },
        configure: 'Configure',
        view: 'View',
        delete: 'Delete',
      },
    },
    createPage: {
      title: 'Create New Page',
      name: 'Page Name',
      nameHint: 'e.g., My Awesome Landing Page',
      description: 'Description',
      descriptionHint: 'What is this page about?',
      icon: 'Icon',
      color: 'Theme Color',
      cancel: 'Cancel',
      create: 'Create Page',
    },
    config: {
      title: 'Page Configuration',
      preview: 'Preview',
      deploy: 'Deploy',
      alreadyGenerated: 'Already Generated',
      basicInfo: {
        title: 'Basic Information',
        pageName: 'Page Name',
        domain: 'Domain Name',
        domainHint: 'e.g., mypage.buildai.com',
        icon: 'Icon',
        primaryColor: 'Primary Color',
        secondaryColor: 'Secondary Color',
      },
      aiDescription: {
        title: 'AI Page Description',
        subtitle: 'Describe how you want your page to look and function. Be as detailed as possible - the AI will use this to generate your page.',
        label: 'Page Description',
        placeholder: 'Describe your page design, layout, features, colors, and functionality...',
        hint: 'Example: Create a modern landing page with a hero section featuring a gradient background, a call-to-action button, and three feature cards below. Include a contact form at the bottom.',
      },
      form: {
        title: 'Form Settings',
        subtitle: 'Configure form submission settings if your page includes forms',
        hasForm: 'This page includes a contact/submission form',
        email: 'Notification Email',
        emailHint: 'Form submissions will be sent to this email',
        successMessage: 'Success Message',
        successMessageHint: 'Message shown after successful form submission',
        redirectUrl: 'Redirect URL (Optional)',
        redirectUrlHint: 'Optional: Redirect users to this URL after submission',
      },
      seo: {
        title: 'SEO & Metadata',
        subtitle: 'Optimize your page for search engines',
        metaTitle: 'Page Title',
        metaTitleHint: 'Recommended: 50-60 characters',
        metaDescription: 'Meta Description',
        metaDescriptionHint: 'Recommended: 150-160 characters',
        keywords: 'Keywords',
        keywordsHint: 'Press Enter after each keyword',
      },
      analytics: {
        title: 'Analytics & Tracking',
        subtitle: 'Monitor your page performance',
        enable: 'Enable Google Analytics',
        analyticsId: 'Google Analytics ID',
        analyticsIdHint: 'e.g., G-XXXXXXXXXX',
        customScripts: 'Custom Scripts (Optional)',
        customScriptsHint: 'Add custom JavaScript or tracking codes (e.g., Facebook Pixel, Hotjar)',
      },
      actions: {
        cancel: 'Cancel',
        saveDraft: 'Save Draft',
        generate: 'Generate & Preview',
      },
      deploySuccess: {
        title: 'Deployment Successful! 🎉',
        message: 'Your page has been generated and deployed successfully.',
        viewLive: 'View Live Page',
      },
      warningDialog: {
        title: 'One-Time Generation Warning',
        message: 'On the unpaid version, each page can only be generated',
        messageHighlight: 'once',
        subtitle: 'Make sure your configuration is correct before proceeding. Once generated, you cannot regenerate this page.',
        cancel: 'Cancel',
        confirm: 'I Understand, Generate',
      },
      progressDialog: {
        title: 'Generating Your Page',
        complete: 'Complete',
        step: 'Step',
        of: 'of',
        steps: {
          step1: 'Creating page structure and header...',
          step2: 'Building features and content sections...',
          step3: 'Adding forms and interactive elements...',
          step4: 'Finalizing and polishing your page...',
        },
      },
    },
    auth: {
      login: {
        title: 'Welcome Back',
        subtitle: 'Sign in to continue building',
        email: 'Email',
        password: 'Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        button: 'Sign In',
        divider: 'Or continue with',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
      },
      signup: {
        title: 'Create Account',
        subtitle: 'Start building with AI today',
        name: 'Full Name',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        terms: 'I agree to the',
        termsLink: 'Terms of Service',
        and: 'and',
        privacyLink: 'Privacy Policy',
        button: 'Create Account',
        divider: 'Or sign up with',
        hasAccount: 'Already have an account?',
        signIn: 'Sign in',
      },
    },
    common: {
      step: 'Step',
    },
  },
  pl: {
    nav: {
      letsGo: 'Zaczynajmy!',
      login: 'Zaloguj się',
      signUp: 'Zarejestruj się',
      logout: 'Wyloguj',
      dashboard: 'Panel',
    },
    hero: {
      title: 'Buduj Aplikacje z',
      titleHighlight: 'Mocą AI',
      subtitle: 'Bez kodu. Bez problemów. Tylko inteligentna automatyzacja.',
      cta: 'Rozpocznij',
    },
    features: {
      title: 'Dlaczego BuildAI',
      aiPowered: {
        title: 'Generowanie AI',
        description: 'Opisz swoją ideę prostym językiem. Nasze AI przekształca Twoją wizję w gotowy kod produkcyjny natychmiast.',
      },
      instantDeploy: {
        title: 'Natychmiastowe Wdrożenie',
        description: 'Twoje aplikacje uruchamiają się automatycznie z SSL, CDN i globalną siecią edge. Bez DevOps.',
      },
      smartOptimization: {
        title: 'Inteligentna Optymalizacja',
        description: 'Wbudowane monitorowanie wydajności, automatyczne skalowanie i inteligentne cachowanie dla błyskawicznych doświadczeń.',
      },
    },
    howItWorks: {
      title: 'Od Pomysłu do Działania w',
      titleHighlight: '4 Krokach',
      subtitle: 'Budowanie wymarzonej strony nigdy nie było tak proste',
      step1: {
        title: 'Opisz Swoją Wizję',
        description: 'Powiedz nam, co chcesz zbudować, używając naturalnego języka. Nie wymagany żargon techniczny - po prostu wyjaśnij to jak przyjacielowi.',
      },
      step2: {
        title: 'Opisz swoją stronę',
        description: 'Opisz, jak ma wyglądać Twoja strona: wybierz kolory, styl i motyw przewodni, wskaż układ sekcji oraz funkcje, które są dla Ciebie najważniejsze.',
      },
      step3: {
        title: 'Wygeneruj stronę z AI',
        description: 'Na podstawie Twoich ustawień i opisu AI przygotuje kompletną stronę z dopracowanym wyglądem, treściami oraz gotową strukturą do publikacji.',
      },
      step4: {
        title: 'Opublikuj i zdobywaj klientów',
        description: 'Opublikuj stronę jednym kliknięciem, podłącz domenę i zacznij pozyskiwać klientów dzięki profesjonalnej prezentacji swojej oferty.',
      },
    },
    pricing: {
      title: 'Proste,',
      titleHighlight: 'Przejrzyste Ceny',
      subtitle: 'Profesjonalne strony docelowe w niepokonanej cenie',
      price: '300zł',
      domainCost: '+ koszt domeny',
      whatsIncluded: 'Co jest zawarte:',
      custom: {
        title: '??? zł',
        subtitle: 'Twoja Wizja',
        cta: 'Skontaktuj się',
        whatsIncluded: 'Co jest zawarte:',
        features: {
          aiPricing: {
            title: 'Kalkulacja Ceny AI',
            description: 'Inteligentna wycena oparta na Twoich wymaganiach',
          },
          complex: {
            title: 'Złożone Funkcje',
            description: 'Zaawansowana funkcjonalność i integracje',
          },
          backend: {
            title: 'Backend i Baza Danych',
            description: 'Rozwiązania full-stack z niestandardowymi API',
          },
          team: {
            title: 'Dedykowany Zespół',
            description: 'Osobisty menedżer projektu i deweloperzy',
          },
          revisions: {
            title: 'Nielimitowane Poprawki',
            description: 'Iteruj do perfekcji podczas rozwoju',
          },
          support: {
            title: 'Wsparcie Premium',
            description: '3 miesiące darmowej konserwacji',
          },
        },
      },
      features: {
        deployTime: {
          title: '< 1 Dzień Wdrożenia',
          description: 'Twoja strona jest online w mniej niż 24 godziny',
        },
        support: {
          title: 'Wsparcie 24/7',
          description: 'Pomoc przez całą dobę, kiedy tylko jej potrzebujesz',
        },
        developers: {
          title: 'Seniorzy Developerzy',
          description: 'Twój projekt obsługiwany przez doświadczonych profesjonalistów',
        },
        modifications: {
          title: 'Niestandardowe Modyfikacje',
          description: 'Dostosowania i poprawki po generacji zawarte',
        },
        ssl: {
          title: 'SSL i Bezpieczeństwo',
          description: 'Bezpieczeństwo klasy enterprise i HTTPS zawarte',
        },
        mobile: {
          title: 'Zoptymalizowane Mobile',
          description: 'Idealne responsywne projektowanie dla wszystkich urządzeń',
        },
        fast: {
          title: 'Błyskawicznie Szybkie',
          description: 'Zoptymalizowane pod kątem szybkości i wydajności',
        },
        seo: {
          title: 'Gotowe SEO',
          description: 'Wbudowana optymalizacja SEO dla lepszych pozycji',
        },
      },
      cta: 'Rozpocznij',
    },
    testimonials: {
      title: 'Zaufali Nam Deweloperzy z Całego Świata',
      subtitle: 'Zobacz, co nasi użytkownicy mówią o BuildAI',
      items: [
        {
          text: 'BuildAI przekształciło moją ideę w produkcyjną aplikację w minuty. AI dokładnie zrozumiało, czego potrzebuję i dostarczyło więcej niż się spodziewałem.',
          name: 'Sarah Chen',
          role: 'Założyciel Startupu',
          avatar: 'SC',
        },
        {
          text: 'Jako projektant bez doświadczenia programistycznego, BuildAI dało mi supermoce. Teraz mogę dostarczać pełne aplikacje bez pisania jednej linii kodu.',
          name: 'Marcus Rodriguez',
          role: 'Product Designer',
          avatar: 'MR',
        },
        {
          text: 'Sama automatyzacja wdrażania oszczędza mi godziny każdego tygodnia. Ta platforma zmienia zasady gry w szybkim prototypowaniu i rozwoju MVP.',
          name: 'Alex Thompson',
          role: 'Tech Lead',
          avatar: 'AT',
        },
      ],
    },
    cta: {
      title: 'Gotowy do Budowania?',
      subtitle: 'Dołącz do tysięcy deweloperów budujących szybciej z AI',
      button: 'Zacznij Budować Teraz',
    },
    footer: {
      tagline: 'Budujemy przyszłość tworzenia stron internetowych z automatyzacją opartą na AI i inteligentnymi rozwiązaniami wdrożeniowymi.',
      product: 'Produkt',
      company: 'Firma',
      resources: 'Zasoby',
      legal: 'Prawne',
    },
    dashboard: {
      title: 'Moje Strony',
      subtitle: 'Zarządzaj i twórz swoje strony zasilane AI',
      createNew: 'Utwórz Nową Stronę',
      empty: {
        title: 'Brak Stron',
        subtitle: 'Utwórz swoją pierwszą stronę zasilaną AI, aby rozpocząć',
        button: 'Utwórz Swoją Pierwszą Stronę',
      },
      pageCard: {
        status: {
          draft: 'Szkic',
          live: 'Na Żywo',
        },
        configure: 'Konfiguruj',
        view: 'Zobacz',
        delete: 'Usuń',
      },
    },
    createPage: {
      title: 'Utwórz Nową Stronę',
      name: 'Nazwa Strony',
      nameHint: 'np., Moja Wspaniała Strona Docelowa',
      description: 'Opis',
      descriptionHint: 'O czym jest ta strona?',
      icon: 'Ikona',
      color: 'Kolor Motywu',
      cancel: 'Anuluj',
      create: 'Utwórz Stronę',
    },
    config: {
      title: 'Konfiguracja Strony',
      preview: 'Podgląd',
      deploy: 'Wdróż',
      alreadyGenerated: 'Już Wygenerowano',
      basicInfo: {
        title: 'Podstawowe Informacje',
        pageName: 'Nazwa Strony',
        domain: 'Nazwa Domeny',
        domainHint: 'np., mojastrona.buildai.com',
        icon: 'Ikona',
        primaryColor: 'Kolor Główny',
        secondaryColor: 'Kolor Drugorzędny',
      },
      aiDescription: {
        title: 'Opis Strony AI',
        subtitle: 'Opisz, jak ma wyglądać i działać Twoja strona. Bądź jak najbardziej szczegółowy - AI użyje tego do wygenerowania strony.',
        label: 'Opis Strony',
        placeholder: 'Opisz projekt, układ, funkcje, kolory i funkcjonalność swojej strony...',
        hint: 'Przykład: Utwórz nowoczesną stronę docelową z sekcją hero z gradientowym tłem, przyciskiem call-to-action i trzema kartami funkcji poniżej. Dołącz formularz kontaktowy na dole.',
      },
      form: {
        title: 'Ustawienia Formularza',
        subtitle: 'Skonfiguruj ustawienia przesyłania formularza, jeśli strona zawiera formularze',
        hasForm: 'Ta strona zawiera formularz kontaktowy/zgłoszeniowy',
        email: 'Email Powiadomień',
        emailHint: 'Zgłoszenia formularza będą wysyłane na ten email',
        successMessage: 'Komunikat Sukcesu',
        successMessageHint: 'Wiadomość wyświetlana po pomyślnym przesłaniu formularza',
        redirectUrl: 'URL Przekierowania (Opcjonalnie)',
        redirectUrlHint: 'Opcjonalnie: Przekieruj użytkowników na ten URL po przesłaniu',
      },
      seo: {
        title: 'SEO i Metadane',
        subtitle: 'Optymalizuj swoją stronę dla wyszukiwarek',
        metaTitle: 'Tytuł Strony',
        metaTitleHint: 'Zalecane: 50-60 znaków',
        metaDescription: 'Meta Opis',
        metaDescriptionHint: 'Zalecane: 150-160 znaków',
        keywords: 'Słowa Kluczowe',
        keywordsHint: 'Naciśnij Enter po każdym słowie kluczowym',
      },
      analytics: {
        title: 'Analityka i Śledzenie',
        subtitle: 'Monitoruj wydajność swojej strony',
        enable: 'Włącz Google Analytics',
        analyticsId: 'ID Google Analytics',
        analyticsIdHint: 'np., G-XXXXXXXXXX',
        customScripts: 'Niestandardowe Skrypty (Opcjonalnie)',
        customScriptsHint: 'Dodaj niestandardowy JavaScript lub kody śledzące (np. Facebook Pixel, Hotjar)',
      },
      actions: {
        cancel: 'Anuluj',
        saveDraft: 'Zapisz Szkic',
        generate: 'Generuj i Podgląd',
      },
      deploySuccess: {
        title: 'Wdrożenie Udane! 🎉',
        message: 'Twoja strona została wygenerowana i wdrożona pomyślnie.',
        viewLive: 'Zobacz Stronę Na Żywo',
      },
      warningDialog: {
        title: 'Ostrzeżenie Jednorazowej Generacji',
        message: 'W wersji bezpłatnej, każda strona może być wygenerowana',
        messageHighlight: 'tylko raz',
        subtitle: 'Upewnij się, że Twoja konfiguracja jest poprawna przed kontynuowaniem. Po wygenerowaniu nie możesz ponownie wygenerować tej strony.',
        cancel: 'Anuluj',
        confirm: 'Rozumiem, Generuj',
      },
      progressDialog: {
        title: 'Generowanie Twojej Strony',
        complete: 'Ukończono',
        step: 'Krok',
        of: 'z',
        steps: {
          step1: 'Tworzenie struktury strony i nagłówka...',
          step2: 'Budowanie funkcji i sekcji treści...',
          step3: 'Dodawanie formularzy i elementów interaktywnych...',
          step4: 'Finalizowanie i polerowanie strony...',
        },
      },
    },
    auth: {
      login: {
        title: 'Witaj Ponownie',
        subtitle: 'Zaloguj się, aby kontynuować budowanie',
        email: 'Email',
        password: 'Hasło',
        rememberMe: 'Zapamiętaj mnie',
        forgotPassword: 'Zapomniałeś hasła?',
        button: 'Zaloguj się',
        divider: 'Lub kontynuuj z',
        noAccount: 'Nie masz konta?',
        signUp: 'Zarejestruj się',
      },
      signup: {
        title: 'Utwórz Konto',
        subtitle: 'Zacznij budować z AI już dziś',
        name: 'Imię i Nazwisko',
        email: 'Email',
        password: 'Hasło',
        confirmPassword: 'Potwierdź Hasło',
        terms: 'Zgadzam się z',
        termsLink: 'Warunkami Użytkowania',
        and: 'i',
        privacyLink: 'Polityką Prywatności',
        button: 'Utwórz Konto',
        divider: 'Lub zarejestruj się z',
        hasAccount: 'Masz już konto?',
        signIn: 'Zaloguj się',
      },
    },
    common: {
      step: 'Krok',
    },
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages,
})
