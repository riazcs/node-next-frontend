import { getSession } from 'next-auth/react';

export default function withAuth(Component) {
  return function Authenticated({ session, ...props }) {
    // Check if user is authenticated
    if (!session?.user) {
      // Redirect to login page or show access denied message
      return <p>Access denied. Please log in.</p>;
    }

    return <Component {...props} />;
  };
}
