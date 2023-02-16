import { AppBar } from '@mui/material';
import {Toolbar} from '@mui/material';
import {Typography} from '@mui/material';

const Footer: React.FC = () => {
    return(
        <AppBar position="relative" component={"footer"} color={"transparent"}>
        <Toolbar  sx={{justifyContent: "center", height: "100px", alignItems: "center" }}>
          <Typography variant="body2" color="primary" noWrap sx={{ }} >
            All Right reserved 2023@
          </Typography>
        </Toolbar>
      </AppBar>
    )
}
export default Footer;