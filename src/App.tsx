import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppShellLayout } from '@/layouts/AppShellLayout';
import DashboardPage from '@/features/dashboard/DashboardPage';
import ProjectsPage from '@/features/projects/ProjectsPage';
import TaskBoardPage from '@/features/tasks/TaskBoardPage';
import TeamsPage from '@/features/teams/TeamsPage';
import FeedbackPage from '@/features/feedback/FeedbackPage';
import ProjectDetailPage from '@/features/projects/ProjectDetailPage';
import ProfilePage from '@/features/settings/ProfilePage';
import SettingsPage from '@/features/settings/SettingsPage';
import { AuthLayout } from '@/layouts/AuthLayout';
import LoginPage from '@/features/auth/LoginPage';
import SignupPage from '@/features/auth/SignupPage';
import ForgotPasswordPage from '@/features/auth/ForgotPasswordPage';
import HelpCenterPage from '@/features/support/HelpCenterPage';
import NotificationsPage from '@/features/notifications/NotificationsPage';
import DocsPage from '@/features/support/DocsPage';
import ShortcutsPage from '@/features/support/ShortcutsPage';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShellLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'projects/:projectId',
        element: <ProjectDetailPage />,
      },
      {
        path: 'task-board',
        element: <TaskBoardPage />,
      },
      {
        path: 'teams',
        element: <TeamsPage />,
      },
      {
        path: 'feedback',
        element: <FeedbackPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'help',
        element: <HelpCenterPage />,
      },
      {
        path: 'docs',
        element: <DocsPage />,
      },
      {
        path: 'shortcuts',
        element: <ShortcutsPage />,
      },
      {
        path: 'notifications',
        element: <NotificationsPage />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
