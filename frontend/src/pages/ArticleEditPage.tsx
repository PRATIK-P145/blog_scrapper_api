import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, Article, ArticleInput } from '@/services/api';
import { ArticleForm } from '@/components/articles';
import { useToast } from '@/hooks/use-toast';

export default function ArticleEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const fetchArticle = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await api.getArticle(id);
      setArticle(data);
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to fetch article',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  const handleUpdate = async (data: ArticleInput) => {
    if (!id) return;
    try {
      setFormLoading(true);
      await api.updateArticle(id, data);
      toast({
        title: 'Article Updated',
        description: 'Your changes have been saved successfully',
      });
      navigate(`/articles/${id}`);
    } catch (err) {
      toast({
        title: 'Update Failed',
        description: err instanceof Error ? err.message : 'Failed to update article',
        variant: 'destructive',
      });
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <ArticleForm
          article={article}
          onSubmit={handleUpdate}
          onCancel={() => navigate(`/articles/${id}`)}
          loading={formLoading}
        />
      </main>
    </div>
  );
}
