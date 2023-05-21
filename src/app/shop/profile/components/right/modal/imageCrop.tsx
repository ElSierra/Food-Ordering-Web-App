import { Box } from "@chakra-ui/react";

import AvatarUpload from "react-avatar-edit";
export const ImageCrop = ({
  onCrop,
  onClosedCrop,
  onBeforeFileLoad,
}: {
  onCrop: any;
  onClosedCrop: any;
  onBeforeFileLoad: any;
}) => {
  return (
    <Box>
      <AvatarUpload
        width={300}
        height={300}
        
        label="Upload Profile Picture"
        onCrop={onCrop}
        onClose={onClosedCrop}
        onBeforeFileLoad={onBeforeFileLoad}
      />
    </Box>
  );
};
