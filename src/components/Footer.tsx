import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 px-6 mt-auto">
            <div className="container mx-auto text-center">
                <p className="text-sm laptop:text-base text-gray-400 mb-2">
                    Developers &nbsp;
                    <a href="https://mrmallik.com" className="text-white hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">Gulger Mallik</a> &nbsp;&&nbsp;
                    <a href="https://salkarveda.com" className="text-white hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">Veda Salkar</a>
                </p>
                <p className="text-xs text-gray-500">
                    View the project on{' '}
                    <a href="https://github.com/mr-mallik/blue-ocean-stratergy.git" className="text-white hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
