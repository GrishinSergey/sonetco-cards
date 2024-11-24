import { Button, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CenteredContainer } from './Container';
import { CardGrid } from './CardGrid';
import { BoxItem } from './BoxItem';
import { useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
})

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGenerateCollage = async () => {
    console.log('Button clicked'); // додамо для дебагу

    if (!containerRef.current) {
      console.log('No container ref'); // додамо для дебагу
      return;
    }

    try {
      const dataUrl = await htmlToImage.toPng(containerRef.current, {
        quality: 1.0,
        width: 480,
      });

      console.log('Image generated'); // додамо для дебагу

      const link = document.createElement('a');
      link.download = 'collage.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Помилка при створенні колажу:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        onClick={handleGenerateCollage}
        sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
      >
        Згенерувати колаж
      </Button>

      <BrowserRouter basename="/sonetco-cards">
        <CenteredContainer ref={containerRef}>
          <CardGrid items={items} />
        </CenteredContainer>
      </BrowserRouter>
    </ThemeProvider>
  )
}


const items: BoxItem[] = [
  "Hobby",
  "Flower",
  "Color",
  "Season",
  "Charectar",
  "City",
  "Food",
  "Place",
  "Animal",
].map((text, index) => ({
  id: index,
  text,
  image: null,
}))