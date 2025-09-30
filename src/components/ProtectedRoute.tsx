interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Authentication disabled for local development - direct access to dashboard
  return <>{children}</>;
};