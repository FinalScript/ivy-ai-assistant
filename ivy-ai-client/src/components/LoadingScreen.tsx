export default function LoadingScreen() {
    return (
        <div className='fixed inset-0 bg-base-200 flex flex-col items-center justify-center z-50 animate-fade-in'>
            {/* Animated background pattern */}
            <div className='absolute inset-0 opacity-10'>
                <div className='absolute w-72 sm:w-96 h-72 sm:h-96 -top-48 -left-48 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
                <div className='absolute w-72 sm:w-96 h-72 sm:h-96 -top-48 -right-48 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>
                <div className='absolute w-72 sm:w-96 h-72 sm:h-96 -bottom-48 -left-48 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000'></div>
                <div className='absolute w-72 sm:w-96 h-72 sm:h-96 -bottom-48 -right-48 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
            </div>

            <div className='relative z-10 flex flex-col items-center'>
                <div className='relative'>
                    <div className='absolute inset-0 border-4 border-primary/30 rounded-full'></div>
                    <div className='w-20 h-20 border-4 border-primary rounded-full border-t-transparent animate-spin'></div>
                </div>
            </div>
        </div>
    );
}
