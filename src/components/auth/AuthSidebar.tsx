import StatsCard from './StatsCard';
import EngagementChart from './EngagementChart';
import SecurityCard from './SecurityCard';
import SocialIcons from './SocialIcons';
import { StatsData } from '@/lib/types/auth.types';

interface AuthSidebarProps {
    stats: StatsData;
}

export default function AuthSidebar({ stats }: AuthSidebarProps) {
    return (
        <div className="relative z-10 h-full flex flex-col justify-between min-h-[600px]">
            <div className="space-y-6">
                {/* <StatsCard value={stats.inbox} label="Inbox" />
                <EngagementChart count={stats.engagement} /> */}
            </div>

            <div className="space-y-6">
                {/* <SecurityCard /> */}
                {/* <SocialIcons /> */}
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full opacity-20 blur-3xl -z-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400 rounded-full opacity-10 blur-3xl -z-10"></div>
        </div>
    );
}
