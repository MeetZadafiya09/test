import { Box } from '@mui/material'
import { Outlet } from 'react-router'

const Root = () => {
    return (
        <Box sx={{
            p:2
        }}>
            <Outlet />
        </Box>
    )
}

export default Root