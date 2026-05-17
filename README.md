# Executive Assistant Dashboard

A comprehensive web application for managing email, calendar, events, vendors, and tasks for executive assistants and their managers.

## Features

### 📧 Email Module
- View inbox for personal or partner account
- Mark emails as read/unread
- Star important emails
- View full email details

### 📅 Calendar Module
- Month view calendar
- View upcoming events
- See event details at a glance

### 🎯 Events Module
- Create and manage events
- Track guest RSVPs
- Manage event checklists
- View guest dietary restrictions
- Organize event notes

### 🏢 Vendors Database
- Search vendors by name or contact
- Filter by service category
- View service dates and notes
- Manage vendor contact information
- Track upcoming services

### ✅ Tasks Module
- Daily, weekly, and monthly recurring tasks
- Track task completion progress
- View task assignments and due dates
- Organize tasks by category

### 👥 User Management
- Switch between user accounts (Owner and Partner)
- View personalized data for each user
- User-specific email and calendar

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Project Structure

```
app/
├── layout.tsx              # Root layout with navigation
├── page.tsx                # Dashboard home
├── globals.css             # Global styles
├── api/                    # API routes (for future backend)
├── emails/                 # Email module pages
├── calendar/               # Calendar module pages
├── events/                 # Events module pages
├── vendors/                # Vendors module pages
└── tasks/                  # Tasks module pages

components/
├── UserContext.tsx         # User state management
└── Navigation.tsx          # Sidebar navigation

lib/
├── types.ts                # TypeScript interfaces
└── mockData.ts             # Mock data for testing
```

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data**: Mock JSON (localStorage ready)

## Features in This Version

### What's Included ✅
- Full UI for all modules (Email, Calendar, Events, Vendors, Tasks)
- Mock data with realistic examples
- User switching between "Owner" and "Partner" accounts
- Responsive design
- Interactive features (checkboxes, search, filters, RSVP tracking)
- Event detail pages with guest management
- Vendor search and categorization
- Task progress tracking

### What's Coming in Phase 2 🔮
- Backend database integration (PostgreSQL/MongoDB)
- Real Gmail API integration
- Google Calendar API integration
- OAuth authentication
- Email compose and reply
- Event invitations
- Vendor photo uploads
- Real-time updates
- Data persistence

## Testing

The app comes with hardcoded test accounts:
- **Owner Account**: "You" (you@example.com)
- **Partner Account**: "Partner" (partner@example.com)

Switch between accounts using the user selector in the sidebar.

### Sample Data
- 5 emails per user
- 3-5 calendar events per user
- 2 complex events with guests and checklists
- 8 vendors across multiple categories
- 10 recurring tasks (daily/weekly/monthly)

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Next Steps

1. **Install Dependencies**: `npm install`
2. **Run Dev Server**: `npm run dev`
3. **Test All Modules**: Navigate through each section using the sidebar
4. **Switch Users**: Use the user dropdown to test multi-user functionality
5. **Interact**: Try starring emails, checking off tasks, viewing event details

## Notes

- This is a frontend-only prototype with hardcoded data
- All data resets on page refresh (localStorage not yet implemented)
- Forms submit but don't persist data in this version
- Ready for backend integration in Phase 2

## License

MIT
