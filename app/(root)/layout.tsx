export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      ROOT SIDEBAR
      {children}
    </main>
  );
}
