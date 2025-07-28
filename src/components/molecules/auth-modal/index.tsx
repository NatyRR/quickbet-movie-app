'use client';

// mainTools
import { ReactNode, useState } from 'react';

// components
import Image from 'next/image';

// icons
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

// components
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface AuthModalProps {
  children: ReactNode;
}

export const AuthModal = ({ children }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setFormData({ email: '', password: '' });
    setShowPassword(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de autenticación
    console.log(`${isLogin ? 'Login' : 'Register'} attempt:`, formData);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ email: '', password: '' });
    setShowPassword(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='w-full h-full max-w-full max-h-full md:w-[1320px] md:h-[720px] md:max-w-[1320px] top-0 left-0 md:top-[50%] md:left-[50%] translate-x-0 translate-y-0 md:translate-x-[-50%] md:translate-y-[-50%] p-0 bg-transparent border-0'>
        <div className='w-full h-full md:w-[1320px] md:h-[720px] bg-black/80 border-0 md:border border-neutral-700 rounded-none md:rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl'>
          <div className='w-full md:w-1/2 p-6 md:p-12 flex flex-col'>
            <button
              onClick={handleClose}
              className='flex items-center gap-2 text-white mb-8 self-start hover:opacity-80 transition-opacity'
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>

            <div className='flex bg-neutral-800 rounded-lg p-1 mb-6 md:mb-8 w-fit mx-auto'>
              <button
                onClick={() => handleToggleMode(false)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  !isLogin
                    ? 'bg-[#F0B90B] text-black'
                    : 'bg-transparent text-white hover:bg-neutral-700'
                }`}
              >
                Sign up
              </button>
              <button
                onClick={() => handleToggleMode(true)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  isLogin
                    ? 'bg-[#F0B90B] text-black'
                    : 'bg-transparent text-white hover:bg-neutral-700'
                }`}
              >
                Log In
              </button>
            </div>

            <div className='flex-1'>
              <div>
                <h2 className='text-white text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-center md:text-left'>
                  We love having you back
                </h2>
              </div>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='relative'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className='w-full px-4 py-3 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#F0B90B] placeholder-gray-400'
                    required
                  />
                </div>

                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={isLogin ? 'Password' : 'Create a password'}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                    className='w-full px-4 py-3 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#F0B90B] placeholder-gray-400 pr-12'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button
                  type='submit'
                  className='w-full bg-[#F0B90B] text-black py-3 rounded-md font-semibold hover:bg-[#d9a309] transition-colors mt-8'
                >
                  {isLogin ? 'Continue' : 'Register'}
                </button>
              </form>
            </div>

            <div className='mt-auto'>
              <p className='text-gray-400 text-sm text-center'>
                For any questions, reach out to support@quickbetmovies.com
              </p>
            </div>
          </div>

          <div className='hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900 relative overflow-hidden'>
            <div className='absolute top-16 right-16 z-10 max-w-md'>
              <h2 className='text-white text-2xl font-semibold mb-4'>
                Welcome back to Quickbet Movies!
              </h2>
              <p className='text-gray-300 text-base leading-relaxed'>
                🍿 Ready to dive into the world of unlimited entertainment?
                Enter your credentials and let the cinematic adventure begin!
              </p>
            </div>

            <div className='relative w-[546px] h-[691px]'>
              <Image
                src={`/assets/${isLogin ? 'login-img.png' : 'register-img.png'}`}
                alt={isLogin ? 'Login Character' : 'Register Character'}
                fill
                className='object-contain transition-all duration-500 ease-in-out'
                priority
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
