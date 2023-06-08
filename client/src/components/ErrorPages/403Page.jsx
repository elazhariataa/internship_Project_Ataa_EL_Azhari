import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Link, SvgIcon, Typography } from '@mui/material';



function Page403(){
    return(
        
            <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%',
                backgroundColor : "white"
            }}
            >
            <Container maxWidth="md">
                <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                >
                <Box
                    sx={{
                    mb: 3,
                    textAlign: 'center'
                    }}
                >
                    <img
                    alt="Under development"
                    src={require('../images/403_Error.gif')}
                    style={{
                        display: 'inline-block',
                        maxWidth: '100%',
                        width: 400
                    }}
                    />
                </Box>
                <Typography
                    align="center"
                    sx={{ mb: 3, }}
                    variant="h3"
                >
                    Access Denied: You have not paid your membership fee
                </Typography>
                <Typography
                    align="center"
                    // color="white"
                    variant="body1"
                >
                    Please make a payment to access this page.
                    Try using the navigation
                </Typography>
                <Button
                    component={Link}
                    href="/membership_plans"
                    startIcon={(
                    <SvgIcon fontSize="small">
                        <ArrowBackIcon />
                    </SvgIcon>
                    )}
                    sx={{ mt: 3 }}
                    variant="contained"
                >
                    Go to Membership plans Page
                </Button>
                </Box>
            </Container>
            </Box>
        
    )
}


export default Page403;