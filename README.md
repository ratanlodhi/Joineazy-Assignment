# Assignment & Review Dashboard

A clean, responsive dashboard for student-assignment management with role-based functionality for students and professors (admins). Built with React.js and Tailwind CSS.

## Features

### For Students
- **View Assignments**: See all assigned tasks with details, due dates, and Google Drive links
- **Double-Verification Submission**: Two-step confirmation process to mark assignments as submitted
- **Undo Functionality**: 30-second window to undo submissions
- **Progress Tracking**: Visual progress bar showing assignment completion percentage
- **Status Indicators**: Clear badges showing submission status (Not Submitted, Pending Confirmation, Submitted, Overdue)

### For Professors (Admins)
- **Assignment Management**: Create, edit, and delete assignments
- **Student Selection**: Assign tasks to all students or select specific ones
- **Submission Tracking**: View submission status for all students on each assignment
- **Progress Visualization**: Per-assignment class progress bars showing submission rates
- **Drive Link Integration**: Attach Google Drive links to assignments for external resources

### General Features
- **Role-Based Access**: Students and admins only see their relevant data
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Simulated Authentication**: Role and user selection for demonstration
- **Data Persistence**: LocalStorage ensures data persists across page reloads
- **Clean UI**: Modern, accessible interface with smooth animations

## Tech Stack

- **React 18.3.1** - UI framework
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Vite 5.4.2** - Build tool and dev server
- **Lucide React** - Icon library
- **PropTypes** - Runtime type checking
- **LocalStorage API** - Client-side data persistence

## Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminAssignmentCard.jsx    # Assignment card with student status
│   │   ├── AdminDashboard.jsx         # Professor dashboard view
│   │   └── CreateEditAssignmentModal.jsx  # Assignment creation/editing modal
│   ├── auth/
│   │   └── Login.jsx                  # Role and user selection screen
│   ├── layout/
│   │   └── Header.jsx                 # App header with user info and logout
│   ├── student/
│   │   ├── AssignmentCard.jsx         # Student assignment card view
│   │   ├── StudentDashboard.jsx       # Student dashboard view
│   │   └── SubmissionModal.jsx        # Double-verification submission modal
│   └── ui/
│       ├── Button.jsx                 # Reusable button component
│       ├── Modal.jsx                  # Reusable modal component
│       ├── ProgressBar.jsx            # Progress visualization component
│       └── Toast.jsx                  # Toast notification component
├── context/
│   └── AuthContext.jsx                # Authentication context provider
├── data/
│   └── mockData.json                  # Mock users, assignments, and submissions
├── hooks/
│   └── useLocalStorage.js             # Custom hooks for localStorage management
├── utils/
│   └── localStorage.js                # LocalStorage utility functions
├── App.tsx                            # Main app component
├── index.css                          # Global styles with animations
└── main.tsx                           # App entry point
```

## Component Architecture

### Core Components

**App.tsx**
- Main application shell with authentication routing
- Renders Login or Dashboard based on auth state

**AuthContext.jsx**
- Manages authentication state using Context API
- Provides login, logout, and user role information
- Initializes localStorage on app load

### Student Components

**StudentDashboard.jsx**
- Displays student's assigned assignments
- Shows overall progress
- Manages submission flow with modals and toasts

**AssignmentCard.jsx**
- Individual assignment display with status badges
- Links to Google Drive resources
- Submission action buttons

**SubmissionModal.jsx**
- Two-step verification modal
- First step: "Yes, I have submitted"
- Second step: Final confirmation

### Admin Components

**AdminDashboard.jsx**
- Lists all assignments created by the professor
- Create assignment button and modal management
- Handles assignment updates and deletions

**AdminAssignmentCard.jsx**
- Shows assignment details with student submission status
- Class-wide progress visualization
- Edit and delete actions

**CreateEditAssignmentModal.jsx**
- Form for creating and editing assignments
- Student selection with "Select All" option
- Validation for required fields

### UI Components

**Button.jsx** - Versatile button with variants (primary, secondary, success, danger, outline, ghost)

**Modal.jsx** - Accessible modal with backdrop, keyboard navigation, and size options

**ProgressBar.jsx** - Customizable progress bar with labels and color coding

**Toast.jsx** - Notification system with types (success, error, warning, info) and optional actions

## Design Decisions

### Data Architecture
- **LocalStorage** for persistence without backend dependencies
- **Normalized data structure** with separate users, assignments, and submissions
- **ID-based relationships** for efficient lookups and updates

### State Management
- **Context API** for authentication state (global)
- **Local component state** for UI interactions (modals, forms)
- **Custom hooks** for localStorage abstraction and reusability

### User Experience
- **Double-verification flow** prevents accidental submissions
- **30-second undo window** provides safety net for students
- **Real-time progress tracking** motivates completion
- **Clear status indicators** reduce confusion

### Accessibility
- Semantic HTML with proper ARIA labels
- Keyboard navigation support
- Focus management in modals
- Screen reader friendly status updates

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Grid layouts that adapt to screen size
- Touch-friendly button sizes on mobile
- Collapsible mobile menu

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Clone or extract the project**
   ```bash
   cd assignment-review-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run typecheck` - Run TypeScript type checking

## Demo Instructions

### As a Student

1. **Login**
   - Select "Student" role
   - Choose any student user (e.g., Alice Johnson)
   - Click "Continue to Dashboard"

2. **View Assignments**
   - See all assignments assigned to you
   - Check due dates and status badges
   - View overall progress at the top

3. **Submit Assignment**
   - Click "Mark as Submitted" on an assignment
   - Confirm in the first modal: "Yes, I have submitted"
   - Notice status changes to "Pending Confirmation"
   - Click "Confirm Submission" to complete
   - See success toast with 30-second undo option
   - Status updates to "Submitted" with timestamp

4. **Undo Submission** (within 30 seconds)
   - Click "Undo" in the toast notification
   - Submission is reverted

### As a Professor

1. **Login**
   - Select "Professor" role
   - Choose any admin user (e.g., Prof. Sarah Williams)
   - Click "Continue to Dashboard"

2. **View Assignments**
   - See all assignments you created
   - View class progress bars for each assignment
   - Check individual student submission status

3. **Create Assignment**
   - Click "Create Assignment" button
   - Fill in title, description, and due date
   - Optionally add Google Drive link
   - Select students (or use "Select All")
   - Click "Create Assignment"

4. **Edit Assignment**
   - Click "Edit" button on an assignment card
   - Modify any fields
   - Click "Update Assignment"

5. **Delete Assignment**
   - Click "Delete" button on an assignment card
   - Confirm deletion in modal
   - Assignment and related data are removed

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts**
   - Link to existing project or create new one
   - Accept default settings
   - Get deployment URL

**Alternative: GitHub Integration**
1. Push code to GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy with one click

### Deploy to Netlify

1. **Install Netlify CLI** (if not already installed)
   ```bash
   npm install -g netlify-cli
   ```

2. **Build project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

**Alternative: Drag & Drop**
1. Build project: `npm run build`
2. Visit [netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder to the upload area

### Docker Deployment

**Dockerfile**
```dockerfile
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Build and Run**
```bash
# Build image
docker build -t assignment-dashboard .

# Run container
docker run -p 8080:80 assignment-dashboard

# Access at http://localhost:8080
```

## Example Git Commit History

```
feat: Initialize React + Vite + Tailwind project setup
- Add base configuration files
- Install core dependencies

feat: Add localStorage utilities and mock data structure
- Create mock users, assignments, and submissions
- Implement localStorage initialization and helpers

feat: Implement authentication context and login system
- Create AuthContext with role-based state
- Build Login component with role selection
- Add simulated authentication flow

feat: Build student dashboard and submission flow
- Create AssignmentCard component with status indicators
- Implement double-verification submission modal
- Add progress tracking and toast notifications
- Implement 30-second undo functionality

feat: Build admin dashboard and assignment management
- Create AdminAssignmentCard with student progress
- Implement CreateEditAssignmentModal with validation
- Add assignment CRUD operations
- Display class-wide progress visualization

feat: Add responsive header and layout components
- Create Header with mobile menu
- Implement responsive navigation
- Add user info display and logout

docs: Add comprehensive README with setup and demo instructions
- Document project structure and architecture
- Add deployment instructions for Vercel, Netlify, Docker
- Include example usage for both roles
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Backend integration with REST API
- Real-time notifications with WebSockets
- File upload for submissions
- Assignment comments and feedback
- Due date reminders
- Email notifications
- Grade tracking
- Assignment categories/tags
- Search and filter functionality
- Export data to CSV/PDF

## License

This project is for demonstration purposes as part of the Joineazy Frontend Intern assignment.

## Author

Assignment & Review Dashboard - Frontend Intern Task
Company: Joineazy
