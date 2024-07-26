import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AddressForm from './AddressFrom';
import Info from './Info';
import Container from '@mui/material/Container'; // Import Container component
import { useDeleteCartMutation, useGetCartQuery } from '../services/carts';

const steps = ['Shipping address'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const defaultTheme = createTheme({ palette: { mode: 'light' } });
  const [activeStep, setActiveStep] = React.useState(0);
  const { data, error, isLoading } = useGetCartQuery();
  const [products, setProducts] = React.useState([]);
 const [deleteCart] = useDeleteCartMutation();
  React.useEffect(() => {
    if (data && data.items) {
      setProducts(data.items);
    }
  }, [data]);
    const totalPrice = products
    .reduce((total, { productId, quantity }) => total + productId.price * quantity, 0)
    .toFixed(2);

    let totalPriceString= `${totalPrice}`
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
const handleOrder = async ()=>{
       await deleteCart().unwrap();
}
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg"> {/* Add Container component */}
        <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
          <Grid
            item
            xs={12}
            sm={5}
            lg={4}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              backgroundColor: 'background.paper',
              borderRight: { sm: 'none', md: '1px solid' },
              borderColor: { sm: 'none', md: 'divider' },
              alignItems: 'start',
              pt: 4,
              px: 10,
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'end',
                height: 150,
              }}
            >
              <Button
                startIcon={<ArrowBackRoundedIcon />}
                component="a"
                href="/dashboard"
                sx={{ ml: '-8px' }}
              >
                Back
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                maxWidth: 500,
              }}
            >
              <Info totalPrice={totalPriceString} />
            </Box>
          </Grid>
          <Grid
            item
            sm={12}
            md={7}
            lg={8}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              width: '100%',
              backgroundColor: { xs: 'transparent', sm: 'background.default' },
              alignItems: 'start',
              pt: { xs: 2, sm: 4 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 2, md: 4 }, // Reduced gap here
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: { sm: 'space-between', md: 'flex-end' },
                alignItems: 'center',
                width: '100%',
                maxWidth: { sm: '100%', md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  startIcon={<ArrowBackRoundedIcon />}
                  component="a"
                  href="/dashboard"
                  sx={{ alignSelf: 'start' }}
                >
                  Back
                </Button>
              </Box>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexGrow: 1,
                  height: 150,
                }}
              >
                <Stepper
                  id="desktop-stepper"
                  activeStep={activeStep}
                  sx={{
                    width: '100%',
                    height: 40,
                  }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ':first-child': { pl: 0 },
                        ':last-child': { pr: 0 },
                      }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
            <Card
              sx={{
                display: { xs: 'flex', md: 'none' },
                width: '100%',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ':last-child': { pb: 2 },
                }}
              >
                <div>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected products
                  </Typography>
                  <Typography variant="body1">
                    $134.98
                  </Typography>
                </div>
                <Typography>Total: $134.98</Typography>
              </CardContent>
            </Card>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                maxWidth: { sm: '100%', md: 600 },
                maxHeight: '720px',
                gap: { xs: 2, md: 4 }, // Reduced gap here
              }}
            >
              <Stepper
                id="mobile-stepper"
                activeStep={activeStep}
                alternativeLabel
                sx={{ display: { sm: 'flex', md: 'none' } }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ':first-child': { pl: 0 },
                      ':last-child': { pr: 0 },
                      '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                    }}
                    key={label}
                  >
                    <StepLabel
                      sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <Stack spacing={2} useFlexGap>
                  <Typography variant="h1">📦</Typography>
                  <Typography variant="h5">Thank you for your order!</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Your order number is
                    <strong>&nbsp;#140396</strong>. We have emailed your order
                    confirmation and will update you once its shipped.
                  </Typography>
                  <Button
                    variant="contained"
                    component="a"
                    href="/dashboard"
                    sx={{
                      alignSelf: 'start',
                      width: { xs: '100%', sm: 'auto' },
                    }}
                    onClick={handleOrder}
                  >
                    Go to Dashboard
                  </Button>
                </Stack>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                      justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                      alignItems: 'end',
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 4, sm: 0 }, // Reduced padding here
                      mt: { xs: 2, sm: 0 },
                      mb: '60px',
                    }}
                  >
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="text"
                        sx={{
                          display: { xs: 'none', sm: 'flex' },
                        }}
                      >
                        Previous
                      </Button>
                    )}

                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        sx={{
                          display: { xs: 'flex', sm: 'none' },
                        }}
                      >
                        Previous
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                      onClick={handleNext}
                      sx={{
                        width: { xs: '100%', sm: 'fit-content' },
                      }}
                    >
                      Order
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container> {/* Close Container component */}
    </ThemeProvider>
  );
}
