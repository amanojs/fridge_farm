import { createTheme } from '@mui/material/styles';
// TODO: 全体のカラーは後々考える とりあえず今はprimaryのみ設定
const theme = createTheme({
    palette: {
        primary: { main: '#1ABC9C', contrastText: '#ffffff' }
    }
});

export default theme;
