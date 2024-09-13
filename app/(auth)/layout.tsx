export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      AUTH SIDEBAR
      {children}
    </main>
  );
}
