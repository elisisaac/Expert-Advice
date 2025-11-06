export default function SocialIcons() {
    const icons = [
        {
            color: 'bg-gradient-to-br from-purple-500 to-pink-500',
            label: 'Instagram',
            emoji: '📷',
        },
        {
            color: 'bg-gray-900',
            label: 'TikTok',
            emoji: '🎵',
        },
    ];

    return (
        <div className="flex space-x-4">
            {icons.map((item, index) => (
                <div key={index} className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center text-2xl shadow-lg transform hover:scale-110 transition-transform duration-300 cursor-pointer`} aria-label={item.label}>
                    {item.emoji}
                </div>
            ))}
        </div>
    );
}
