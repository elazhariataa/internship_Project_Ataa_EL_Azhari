import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Link, SvgIcon, Typography } from '@mui/material';



function Page401(){
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
                src={require('../images/401_Error.gif')}
                style={{
                    display: 'inline-block',
                    maxWidth: '100%',
                    width: 400
                }}
                />
            </Box>
            <Typography
                align="center"
                sx={{ mb: 3,}}
                variant="h3"
            >
                Unauthorized Access: You are not authorized to view this page.
            </Typography>
            <Typography
                align="center"
                // color="white"
                variant="body1"
            >
                You either tried some shady route or you came here by mistake.
                Whichever it is, try using the navigation
            </Typography>
            <Button
                component={Link}
                href="/"
                startIcon={(
                <SvgIcon fontSize="small">
                    <ArrowBackIcon />
                </SvgIcon>
                )}
                sx={{ mt: 3 }}
                variant="contained"
            >
                Go back to Home Page
            </Button>
            </Box>
        </Container>
        </Box>
    )
}


export default Page401;