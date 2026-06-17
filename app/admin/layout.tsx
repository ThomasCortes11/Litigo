export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  // Passthrough: el layout con sidebar vive en app/admin/(dashboard)/layout.tsx
  // para que NO se aplique a /admin/login.
  return children;
}
