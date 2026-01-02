import { Article } from '@/services/api';
import { ArticleCard } from './ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
  title: string;
  emptyMessage: string;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ArticleList({
  articles,
  loading,
  title,
  emptyMessage,
  onView,
  onEdit,
  onDelete,
}: ArticleListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-sm text-muted-foreground">{articles.length} articles</span>
      </div>
      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg border-dashed">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
