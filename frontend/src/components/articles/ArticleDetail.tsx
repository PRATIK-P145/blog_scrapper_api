import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, Globe, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { Article } from '@/services/api';

interface ArticleDetailProps {
  article: Article | null;
  loading: boolean;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ArticleDetail({ article, loading, onBack, onEdit, onDelete }: ArticleDetailProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  if (!article) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Article not found</p>
          <Button variant="outline" onClick={onBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  const formattedDate = article.published_date
    ? new Date(article.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No date available';

  const isScraped = article.source_type === 'scraped' || article.status === 'Extracted';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant={isScraped ? 'secondary' : 'default'}>
              {isScraped ? 'Scraped' : 'Manual'}
            </Badge>
            <Badge variant="outline">{article.status}</Badge>
          </div>
          <CardTitle className="text-2xl">{article.title}</CardTitle>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{article.source}</span>
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              View Original
            </a>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <div className="prose prose-sm max-w-none">
          <p className="whitespace-pre-wrap">{article.content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
