import React from 'react';
import { Globe, Twitter, Facebook, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Globe className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">GovAssist <span className="text-cyan-400">AI</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering citizens with intelligent government scheme discovery and eligibility analysis. Built with advanced AI to ensure no benefit goes unnoticed.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Platform</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Schemes</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Eligibility Checker</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">AI Assistant</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-xs mb-4 md:mb-0">
            © 2026 GovAssist AI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <span className="text-slate-500 text-xs">Made with ❤️ for Indian Citizens</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
