import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { BoxItem } from '../BoxItem';

interface AddCardProps {
  item: BoxItem;
  onImageSelect?: (file: File) => void;
}

export const AddCard = ({ item, onImageSelect }: AddCardProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = async (e: React.MouseEvent) => {
    if (e.target === fileInputRef.current) {
      return;
    }

    try {
      const clipboardItems = await navigator.clipboard.read();
      const imageType = clipboardItems[0]?.types.find(type => type.startsWith('image/'));
      
      if (imageType) {
        const blob = await clipboardItems[0].getType(imageType);
        const file = new File([blob], 'clipboard-image.png', { type: imageType });
        const imageUrl = URL.createObjectURL(file);
        
        setPreview(imageUrl);
        onImageSelect?.(file);
      } else {
        fileInputRef.current?.click();
      }
    } catch (error) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onImageSelect?.(file);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <AddButton onClick={handleClick}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
        onClick={(e) => e.stopPropagation()}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {preview ? (
          <ImageContainer sx={{ width: '100%', height: '100%' }}>
            <Box
              component="img"
              src={preview}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <DeleteOverlay className="deleteOverlay">
              <CloseIcon
                onClick={handleDelete}
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 24
                }}
              />
            </DeleteOverlay>
          </ImageContainer>
        ) : (
          <>
            <AddIcon sx={{ fontSize: 40, color: '#757575' }} />
            <Typography variant="body2" color="text.secondary" fontSize={16} fontWeight={500}>
              {item.text}
            </Typography>
          </>
        )}
      </Box>
    </AddButton>
  );
};


const ImageContainer = styled(Box)({
  position: 'relative',
  '&:hover .deleteOverlay': {
    opacity: 1,
  }
});

const DeleteOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.2s',
  borderRadius: theme.shape.borderRadius
}));

const AddButton = styled(Box)(({ theme }) => ({
  width: 128,
  height: 128,
  border: '1px solid #e0e0e0',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  padding: 0, // додано
  overflow: 'hidden', // додано
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  }
}));
