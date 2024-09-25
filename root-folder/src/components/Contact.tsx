export const Contact = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold mb-4">Hakan DURSUN</h1>
            <div className="text-2xl mb-2">
                <a
                    href="mailto:your-email@example.com?subject=Merhaba%20Hakan%20Bey&body=Merhaba%20Hakan%20Bey,"
                    className="text-blue-500 hover:underline"
                >
                    hakan.dursnn@gmail.com
                </a>
            </div>
            <div className="text-2xl">
                <a
                    href="tel:+905343175565"
                    className="text-blue-500 hover:underline"
                >
                    +90 534 317 55 65
                </a>
            </div>
        </div>
    );
};