import { Box } from '@mui/material';
import { AddCard } from '../AddCard';
import { BoxItem } from '../BoxItem';

interface CardGridProps {
  items: BoxItem[];
}

export const CardGrid = ({ items }: CardGridProps) => (
  <Box sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 1,
    width: '100%'
  }}>
    {items.map((item) => (
      <AddCard item={item} />
    ))}
  </Box>
)