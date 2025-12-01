export const PendingDots = () => (
    <span className="flex items-end gap-0.5 w-4 h-4 overflow-hidden">
        <span className="w-1 h-1 rounded-full bg-yellow-400 dot-1" />
        <span className="w-1 h-1 rounded-full bg-yellow-400 dot-2" />
        <span className="w-1 h-1 rounded-full bg-yellow-400 dot-3" />
        <style jsx global>{`
            @keyframes bounce {
                0%,
                80%,
                100% {
                    transform: scale(0.5);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            .dot-1 {
                animation: bounce 1.4s infinite 0s;
            }
            .dot-2 {
                animation: bounce 1.4s infinite 0.2s;
            }
            .dot-3 {
                animation: bounce 1.4s infinite 0.4s;
            }
        `}</style>
    </span>
);
