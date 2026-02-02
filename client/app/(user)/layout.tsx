import NavBarMenu from "@/components/shared/navBarMenu";
import SocketProvider from "@/providers/SocketProvider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBarMenu/>
      <main>
        <SocketProvider>
            {children}
        </SocketProvider>
      </main>
    </>
  );
}
