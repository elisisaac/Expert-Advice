import { Skeleton } from '@/components/ui/skeleton';

export default function FormRowSkeleton() {
    return (
        <tr className="animate-pulse">
            <td className="p-4">
                <Skeleton className="w-4 h-4 rounded" />
            </td>
            <td className="p-4">
                <Skeleton className="h-4 w-40 rounded" />
            </td>
            <td className="p-4">
                <Skeleton className="h-4 w-24 rounded" />
            </td>
            <td className="p-4">
                <Skeleton className="h-4 w-24 rounded" />
            </td>
            <td className="p-4">
                <Skeleton className="h-4 w-28 rounded" />
            </td>
            <td className="p-4 text-right">
                <Skeleton className="h-8 w-20 rounded-md" />
            </td>
            <td className="p-4 text-right">
                <Skeleton className="h-8 w-8 rounded-md" />
            </td>
        </tr>
    );
}
