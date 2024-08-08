import { IconButton } from "@mui/material";
import Image from "next/image";

const ActionButtons: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <IconButton onClick={onClick} sx={{padding:'3px' }}>
        <Image src="/images/review.svg" alt="review" width={24} height={24} loading="lazy" />
      </IconButton>
      <IconButton sx={{padding:'3px' }}>
        <Image src="/images/tabler-icon-edit.svg" alt="edit" width={24} height={24} loading="lazy" />
      </IconButton>
      <IconButton sx={{padding:'3px' }}>
        <Image src="/images/tabler-icon-share.svg" alt="upload" width={24} height={24} loading="lazy" />
      </IconButton>
      <IconButton sx={{padding:'3px' }}>
        <Image src="/images/tabler-icon-trash.svg" alt="trash" width={24} height={24} loading="lazy" />
      </IconButton>
    </div>
  );

  export default ActionButtons;