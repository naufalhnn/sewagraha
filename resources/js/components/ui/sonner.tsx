import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export function Sonner() {
  const { flash } = usePage<PageProps>().props;

  useEffect(() => {
    if (flash?.success) {
      toast.success('Berhasil', {
        description: flash.success,
        icon: <CheckCircle2 className="size-5" />,
      });
    }

    if (flash?.error) {
      toast.error('Terjadi Kesalahan', {
        description: flash.error,
        icon: <AlertTriangle className="size-5" />,
      });
    }
  }, [flash]);

  return (
    <Toaster
      position="top-right"
      richColors
      duration={5000}
      closeButton
      theme="system"
      toastOptions={{
        classNames: {
          toast: 'border border-slate-200 bg-white shadow-lg group dark:bg-slate-800 dark:border-slate-700',
          title: 'text-slate-900 dark:text-slate-50',
          description: 'text-slate-500 dark:text-slate-400',
          actionButton: 'bg-slate-900 text-slate-50 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200',
          cancelButton: 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600',
          closeButton:
            'border-slate-200 bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300',

          success:
            '!bg-gradient-to-r !from-green-50 !to-emerald-50 !text-green-800 !border-green-200 dark:!bg-gradient-to-r dark:!from-green-900/50 dark:!to-emerald-900/50 dark:!text-green-300 dark:!border-green-800',
          error:
            '!bg-gradient-to-r !from-red-50 !to-rose-50 !text-red-800 !border-red-200 dark:!bg-gradient-to-r dark:!from-red-900/50 dark:!to-rose-900/50 dark:!text-red-300 dark:!border-red-800',
        },
      }}
    />
  );
}
