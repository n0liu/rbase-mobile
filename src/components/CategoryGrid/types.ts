export interface CategoryItem {
  id: string;
  label: string;
  count: number;
  active?: boolean;
  icon: string; // 图标 URL
}

export interface CategoryGridProps {
  items: CategoryItem[];
  onItemClick?: (item: CategoryItem) => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}
