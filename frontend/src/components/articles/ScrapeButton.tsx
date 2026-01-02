import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2 } from 'lucide-react';

interface ScrapeButtonProps {
  onScrape: () => void;
  loading: boolean;
}

export function ScrapeButton({ onScrape, loading }: ScrapeButtonProps) {
  return (
    <Button onClick={onScrape} disabled={loading} size="lg" className="gap-2">
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Fetching Articles...
        </>
      ) : (
        <>
          <RefreshCw className="h-4 w-4" />
          Fetch Latest Articles
        </>
      )}
    </Button>
  );
}
