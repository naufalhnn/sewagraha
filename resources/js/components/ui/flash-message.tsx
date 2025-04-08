import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { X } from 'lucide-react'; // lucide-react icon
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage<PageProps>().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible || (!flash?.success && !flash?.error)) return null;

    return (
        <div className="fixed top-4 right-4 z-50 w-96">
            <div
                className={`relative flex transform items-start gap-2 rounded-lg p-4 text-white shadow-md transition-all duration-500 ease-in-out ${visible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-4 scale-95 opacity-0'} ${flash.success ? 'bg-green-500' : flash.error ? 'bg-red-500' : ''} `}
            >
                <div className="flex w-full items-center justify-between">
                    <div className="font-medium text-white">{flash.success || flash.error}</div>
                    <div className="flex items-center justify-between">
                        <button onClick={() => setVisible(false)} className="cursor-pointer text-white hover:text-gray-200">
                            <X size={18} className="rounded bg-white text-center text-green-500" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
