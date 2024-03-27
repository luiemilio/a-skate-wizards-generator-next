import type { Metadata } from 'next';
import './globals.css';

const metadata: Metadata = {
    title: 'A Skate Wizards Generator',
    description: ''
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
