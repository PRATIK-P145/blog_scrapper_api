import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Article, ArticleInput } from '@/services/api';

interface ArticleFormProps {
  article?: Article | null;
  onSubmit: (data: ArticleInput) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export function ArticleForm({ article, onSubmit, onCancel, loading }: ArticleFormProps) {
  const [formData, setFormData] = useState<ArticleInput>({
    title: '',
    url: '',
    content: '',
    published_date: '',
    source: '',
    status: 'original',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        url: article.url || '',
        content: article.content || '',
        published_date: article.published_date
          ? new Date(article.published_date).toISOString().split('T')[0]
          : '',
        source: article.source || '',
        status: article.status || 'original',
      });
    }
  }, [article]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.url.trim()) newErrors.url = 'URL is required';
    if (formData.url && !formData.url.match(/^https?:\/\/.+/)) {
      newErrors.url = 'URL must start with http:// or https://';
    }
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      ...formData,
      published_date: formData.published_date || null,
    });
  };

  const handleChange = (field: keyof ArticleInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{article ? 'Edit Article' : 'Create New Article'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter article title"
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => handleChange('url', e.target.value)}
              placeholder="https://example.com/article"
              className={errors.url ? 'border-destructive' : ''}
            />
            {errors.url && <p className="text-sm text-destructive">{errors.url}</p>}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                value={formData.source}
                onChange={(e) => handleChange('source', e.target.value)}
                placeholder="e.g., TechCrunch"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="published_date">Published Date</Label>
              <Input
                id="published_date"
                type="date"
                value={formData.published_date || ''}
                onChange={(e) => handleChange('published_date', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="original">Original</SelectItem>
                <SelectItem value="Extracted">Extracted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Enter article content"
              rows={8}
              className={errors.content ? 'border-destructive' : ''}
            />
            {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {article ? 'Update Article' : 'Create Article'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
