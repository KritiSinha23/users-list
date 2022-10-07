import { createTheme } from '@mui/material/styles';
import { purple, blue } from '@mui/material/colors';

export default function getTheme() {
    return createTheme({
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: purple[500],
                // kriti: "yellow"
            },
            kriti: {
                kritiBgColor: "yellow"
            },
            secondary: {
                main: blue[500]
            },
        },
    });
}