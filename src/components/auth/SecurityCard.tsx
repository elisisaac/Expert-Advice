import { Lock } from 'lucide-react';

export default function SecurityCard() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-xl">
                    <Lock className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-1">Your data, your rules</h3>
                    <p className="text-sm text-gray-600">Your data belongs to you and our encryption ensures that.</p>
                </div>
            </div>
        </div>
    );
}
