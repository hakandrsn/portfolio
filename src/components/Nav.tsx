import {GiAbstract051, GiAbstract037} from "react-icons/gi";
import {useState} from "react";
import {Dialog, DialogPanel} from "@headlessui/react";
import {navigation} from "../constants/navigation.ts";
import {Link} from "react-router-dom";


export const Nav = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link to={""} className="flex items-center">
                        <p className="text-2xl font-bold text-white">
                            HD
                        </p>
                        {/*<img src={logo2} alt="Lejoo Logo" className="h-10"/>*/}
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <GiAbstract051 aria-hidden="true" className="h-6 w-6"/>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link to={item.href} key={item.name}
                           className="text-md font-semibold leading-6 text-white">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link to='contact' className="text-md font-semibold leading-6 text-white">
                        İletişim <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50"/>
                    <DialogPanel
                        className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link to={""} className="-m-1.5 p-1.5">
                                <span className="sr-only">Lejoo</span>
                                <p className="text-2xl font-bold text-white">
                                    HD
                                </p>
                                {/*<img*/}
                                {/*    alt=""*/}
                                {/*    src={logo2}*/}
                                {/*    className="h-8 w-auto"*/}
                                {/*/>*/}
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            >
                                <GiAbstract037 className="h-6 w-6"/>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link to={item.href}
                                            key={item.name}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <Link to={`contact`}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                                    >
                                        İletişim <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </nav>
        </header>
    );
};

