import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Trash2, Calendar, Globe } from 'lucide-react';
import { Article } from '@/services/api';

interface ArticleCardProps {
  article: Article;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ArticleCard({ article, onView, onEdit, onDelete }: ArticleCardProps) {
  const formattedDate = article.published_date
    ? new Date(article.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'No date';

  const contentPreview = article.content
    ? article.content.slice(0, 120) + (article.content.length > 120 ? '...' : '')
    : 'No content available';

  const isScraped = article.source_type === 'scraped' || article.status === 'Extracted';

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2 leading-tight">{article.title}</CardTitle>
          <Badge variant={isScraped ? 'secondary' : 'default'} className="shrink-0">
            {isScraped ? 'Scraped' : 'Manual'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="h-3.5 w-3.5" />
            <span className="truncate max-w-[120px]">{article.source}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{contentPreview}</p>
        <Badge variant="outline" className="text-xs">
          {article.status}
        </Badge>
      </CardContent>
      <CardFooter className="pt-2 gap-2">
        <Button variant="outline" size="sm" onClick={() => onView(article._id)}>
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(article._id)}>
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(article._id)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
