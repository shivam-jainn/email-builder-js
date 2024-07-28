import React from 'react';

import { Box, Button, Divider, Drawer, Link, Stack, Typography } from '@mui/material';

import { useSamplesDrawerOpen } from '../../documents/editor/EditorContext';

import SidebarButton from './SidebarButton';
import logo from './waypoint.svg';

export const SAMPLES_DRAWER_WIDTH = 240;

interface Template{
  name: string;
}

export default function SamplesDrawer() {
  const samplesDrawerOpen = useSamplesDrawerOpen();
  const [templates, setTemplates] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3010/templates/list/nocode')
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data);
      });
  }, []);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={samplesDrawerOpen}
      sx={{
        width: samplesDrawerOpen ? SAMPLES_DRAWER_WIDTH : 0,
      }}
    >
      <Stack spacing={3} py={1} px={2} width={SAMPLES_DRAWER_WIDTH} justifyContent="space-between" height="100%">
        <Stack spacing={2} sx={{ '& .MuiButtonBase-root': { width: '100%', justifyContent: 'flex-start' } }}>
          <Typography variant="h6" component="h1" sx={{ p: 0.75 }}>
            Buildmail
          </Typography>

          <Stack alignItems="flex-start">
            <SidebarButton href="#">Empty</SidebarButton>
            <SidebarButton href="#sample/welcome">Welcome email</SidebarButton>
            <SidebarButton href="#sample/one-time-password">One-time passcode (OTP)</SidebarButton>
            <SidebarButton href="#sample/reset-password">Reset password</SidebarButton>
            <SidebarButton href="#sample/order-ecomerce">E-commerce receipt</SidebarButton>
            <SidebarButton href="#sample/subscription-receipt">Subscription receipt</SidebarButton>
            <SidebarButton href="#sample/reservation-reminder">Reservation reminder</SidebarButton>
            <SidebarButton href="#sample/post-metrics-report">Post metrics</SidebarButton>
            <SidebarButton href="#sample/respond-to-message">Respond to inquiry</SidebarButton>
         
            {
              templates.map((template:Template,index:number) => (
                <SidebarButton key={index} href={`#template/${template.name}`}>{template.name}</SidebarButton>
              ))
            }
          </Stack>

          <Divider />

     
        </Stack>

      </Stack>
    </Drawer>
  );
}
