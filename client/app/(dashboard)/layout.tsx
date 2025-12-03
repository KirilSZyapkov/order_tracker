import NavBarMenu from "@/components/shared/navBarMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBarMenu/>
      <main>
        {children}
      </main>
    </>
  );
}
