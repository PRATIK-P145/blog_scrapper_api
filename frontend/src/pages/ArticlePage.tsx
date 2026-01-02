import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, Article } from '@/services/api';
import { ArticleDetail } from '@/components/articles';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

/**
 * ArticlePage - View-only page for displaying article details
 * For editing, see ArticleEditPage
 */
export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const handleBack = () => {
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/articles/${id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!id) return;
    try {
      setDeleting(true);
      await api.deleteArticle(id);
      toast({
        title: 'Article Deleted',
        description: 'The article has been removed successfully',
      });
      navigate('/');
    } catch (err) {
      toast({
        title: 'Delete Failed',
        description: err instanceof Error ? err.message : 'Failed to delete article',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <ArticleDetail
          article={article}
          loading={loading}
          onBack={handleBack}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
