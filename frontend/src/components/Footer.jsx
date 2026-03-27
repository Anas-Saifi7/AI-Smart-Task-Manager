import React from "react";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

                {/* Logo / About */}
                <div>
                    <h2 className="text-2xl font-bold text-white">TaskManager</h2>
                    <p className="mt-3 text-sm">
                        Manage your tasks efficiently with our smart dashboard system.
                    </p>
                </div>

                {/* Links */}

                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>

                    <ul className="space-y-2 text-sm">

                        <li>
                            <Link to="/" className="hover:text-white">
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard" className="hover:text-white">
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link to="/help" className="hover:text-white">
                                Contact
                            </Link>
                        </li>

                    </ul>
                </div>

                {/* Support */}

                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/help" className="hover:text-white">
                                Help Center
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="hover:text-white">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/terms" className="hover:text-white">
                                Terms & Conditions
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-xl">
                        <FaFacebook className="cursor-pointer hover:text-white" />
                        <FaTwitter className="cursor-pointer hover:text-white" />
                        <FaGithub className="cursor-pointer hover:text-white" />
                        <FaLinkedin className="cursor-pointer hover:text-white" />
                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm">
                © {new Date().getFullYear()} TaskManager. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;