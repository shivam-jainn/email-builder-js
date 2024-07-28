import React, { useState, useMemo, useCallback } from 'react';
import { IosShareOutlined } from '@mui/icons-material';
import { IconButton, Snackbar, Tooltip } from '@mui/material';
import { useDocument } from '../../documents/editor/EditorContext';
import { renderToStaticMarkup } from '@usewaypoint/email-builder';

export default  function ShareButton() {
  const document =  useDocument();
  const [message, setMessage] = useState<string | null>(null);

  const onClick = useCallback( async () => {
    const code = renderToStaticMarkup(document, { rootBlockId: 'root' });
    
    setMessage('The URL was updated. Copy it to share your current template.');

    const result =  await fetch('http://localhost:3010/templates/upload/nocode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html: code,templateName : name }),
    });

    console.log(result);
  }, [document]);

  const onClose = () => {
    setMessage(null);
  };

  return (
    <>
      <IconButton onClick={onClick}>
        <Tooltip title="Share current template">
          <IosShareOutlined fontSize="small" />
        </Tooltip>
      </IconButton>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message !== null}
        onClose={onClose}
        message={message}
      />
    </>
  );
}
