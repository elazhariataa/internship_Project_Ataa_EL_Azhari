import './footer.css';
import { Box, Typography } from '@mui/material';


function Footer(){
    return (
        <footer>
            <Box
                component="footer"
                sx={{
                backgroundColor: '#f1f1f1',
                color:'#0f263d',
                padding: '20px',
                textAlign: 'center',
                }}
            >
                <Typography variant="body2" color="text.secondary">
                &copy; 2023 GYM LINK. All rights reserved.
                </Typography>
            </Box>
        </footer>
    )
}

export default Footer;