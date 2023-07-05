import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import image from "../../assets/wallpaperflare.com_wallpaper.jpg";

import { motion, AnimatePresence } from "framer-motion";

export function Header() {
    return (
    <Box sx={{
        display: 'flex',
        height: {
            xs: 'auto',
            lg: '90vh',
        },
        mx: {
            xs: '20px',
            lg: '50px',
        },
        mb: 5,
        }}>
        <Box sx={{
            width: '30%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
        </Box>
        <Box sx={{
            width: {
            xs: '100%',
            lg: '90%',
            },
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            borderRadius: '10px',
            mt: {
            xs: 5,
            lg: 0,
            },
            }}>
            <AnimatePresence>
            <motion.div
                initial={{ y: -60, x: -600, opacity: 0 }}
                animate={{ y: -60, x: -480, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                exit={{ x: -100, opacity: 0 }}
                sx={{
                backgroundColor: '#000',
                height: 'auto',
                border: '10px',
                borderRadius: '10px',
                p: {
                    xs: 3,
                    lg: 5,
                }}}>  
                    <Typography
                variant="h2"
                component="h1"
                color="white"
                align="center"
                sx={{
                    backgroundColor: 'rgb(255,255,255,0.8)',
                position: 'relative',
                zIndex: 1,
                    color: "rgb(38, 38, 38)",
                    fontFamily: 'jost',
                    fontWeight: '700',
                    lineHeight: {
                    xs: '40px',
                    lg: '60px',
                    },
                    fontSize: {
                    xs: '30px',
                    lg: '60px',
                    },
                    textAlign: 'left',
                    width: '100%',       
                    height:'100%',
                    my:3,
                    borderRadius: '10px',
                    padding: '35px',
                }}
              >
                Book your stay & <br />enjoy a luxury experience
                <Typography
                  variant="h2"
                  component="h1"
                  color="white"
                  align="center"
                  sx={{
                    color: "rgb(38, 38, 38)",
                    fontFamily: 'jost',
                    fontWeight: '200',
                    lineHeight: {
                      xs: '20px',
                      lg: '35px',
                    },
                    fontSize: {
                      xs: '16px',
                      lg: '22px',
                    },
                    textAlign: 'left',
                    my:3
                    
                  }}
                >
                  Book your dream room or apartment today and experience <br /> the ultimate comfort and convenience.
                </Typography>
                <Button
                  sx={{   
                    color: "#fff",
                    width:'40%',
                    height: '25%',
                   
                    backgroundColor: '#000',
                    fontFamily: 'jost',
                    fontWeight: '200',
                    lineHeight: {
                      xs: '20px',
                      lg: '35px',
                    },
                    fontSize: {
                      xs: '16px',
                      lg: '22px',
                    },
                    textAlign: 'left',
                    my:3

                  }}
                >
                  GEt Explore
                </Button>
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
  );
}
    {/* <motion.div
              initial={{ y: -400, opacity: 0 }}
              animate={{ y: -100, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              exit={{ y: -100, opacity: 0 }} >
              <Typography variant="h2" component="h1" color="white" align="center"  sx={{ color: "#ffff",fontFamily: 'Outfit',fontWeight:'900',fontSize:'7rem'}}>
                Welcome
              </Typography>
            </motion.div> */}
   

            // <Box sx={{
            //     display: 'flex',
            //     flexDirection: 'row',
            //     height: '90vh',
            //     mx:'50px',
            
            //     mb:5
        
            //   }}>
            //     <Box sx={{
            //       width: '30%',
            //       display: 'flex',
            //       alignItems: 'center',
            //       justifyContent: 'center'
            //     }}>
                 
            //     </Box>
            //     <Box sx={{
            //       width: '90%',
            //       backgroundImage: `url(${image})`,
            //       backgroundSize: 'cover',
            //       backgroundPosition: 'right',
            //       backgroundRepeat:'no-repeat',
            //       display: 'flex',
            //       alignItems: 'center',
            //       justifyContent: 'center',
            //       flexDirection: 'column',
            //       borderRadius: '10px',
            //     }}>
            //        <AnimatePresence>
            //         <motion.div
            //           initial={{y:-80,x: -600, opacity: 0 }}
            //           animate={{y:-80, x: -480, opacity: 1 }}
            //           transition={{ delay: 1, duration: 0.5 }}
            //           exit={{ x: -100, opacity: 0 }} 
            //           sx={{ backgroundColor: '#000',
            //            height:'100%',
            //             border:'10px',
            //             borderRadius: '10px',
            //           }} >   
            //           <Typography variant="h2" component="h1" color="white" align="center"  sx={{ backgroundColor: 'rgb(255,255,255,0.8)',
            //             padding: '50px',
                        
            //             position: 'relative',
            //             zIndex: 1, color: "rgb(38, 38, 38)",fontFamily: 'jost',fontWeight:'700',lineHeight: '60px',fontSize:'60px',textAlign:'left', width:'90%',height:'100%',
            //             border:'10px',
            //             borderRadius: '10px',
            //           }} >        
            //           Book your stay & <br/>enjoy a luxury experience
        
            //           <Typography variant="h2" component="h1" color="white" align="center" sx={{mt:4, color: "rgb(38, 38, 38)",fontFamily: 'jost',fontWeight:'200',lineHeight: '35px',fontSize:'22px',textAlign:'left'}}>        
            //           Book your dream room or apartment today and experience <br/> the ultimate comfort and convenience.           
            //              </Typography>  
            //              <Button  sx={{mt:4, color: "#fff",width:'40%',height:'25%',backgroundColor: '#000',fontFamily: 'jost',fontWeight:'200',lineHeight: '35px',fontSize:'22px',textAlign:'left'}} >
            //                 GEt Explore
            //                 </Button>                         
            //           </Typography>
                   
            //         </motion.div>
        
        
            //       </AnimatePresence>
            //     </Box>
            //   </Box>