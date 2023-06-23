export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body>
        <main className="flex justify-center">{children}</main>
      </body>
    </html>
  );
}
