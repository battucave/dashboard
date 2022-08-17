import { makeStyles } from "@mui/styles";

const style = makeStyles((theme) => ({
    form: {
        margin: "3rem 1rem",
        padding: "1rem",
        paddingBottom: "1rem",
    },
    formBox: {
        [theme.breakpoints.up('xl')]: {
            width: "100%"
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: "10%",
            width: "80%"
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: "22%",
            width: "55%"
        }
    },
    image: {
        marginLeft: '10%',
        width: "80%",
        aspectRatio: "1/1"
    },
    subCategoryMenu: {
        marginLeft: '1rem'
    },
}));

export default style;