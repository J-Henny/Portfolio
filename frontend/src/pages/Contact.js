import { Box } from '@mui/material'
import React from 'react'

const Contact = () => {

  const fontStyle = {
    color: '#faf9f6',
  }
  return (
    <div style={{display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center'}}>
      <div style={{marginTop: '25vh'}}>
        <h3 className='font-link' style={{textAlign: 'center', color: '#faf9f6', fontSize: '36px'}}>
          Contact Me
        </h3>
        <Box
        display="flex"
        justifyContent="flex-start"
        flexDirection="column"
        marginLeft="-15vw"
        > 
        <span className='font-link' style={fontStyle}>
          <br></br><br></br><br></br>
            <h3>
              Email: &emsp;&emsp;&emsp;&emsp; jackhenry.hurd@gmail.com
            </h3><br></br><br></br>
            <h3>
              Phone: &emsp;&emsp;&emsp;&emsp; (720) - 391 - 5089
            </h3><br></br><br></br>
            <h3>
              LinkedIn: &emsp;&emsp;(720) - 391 - 5089
            </h3><br></br><br></br>

            <h3>
              Github: &emsp;&emsp;&emsp; (720) - 391 - 5089
            </h3>
          </span>


        </Box>
      </div>
      
    </div>
  )
}

export default Contact
