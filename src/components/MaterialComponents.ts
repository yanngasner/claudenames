import {Button, Switch, withStyles} from "@material-ui/core";
import {blue, red} from "@material-ui/core/colors";

export const BlueButton = withStyles({
    root : {
        backgroundColor: "#5e9cff",
        '&:hover': {
            backgroundColor: blue[800],
        },
    },
})(Button);

export const RedButton = withStyles({
    root : {
        backgroundColor: "#ff887d",
        '&:hover': {
            backgroundColor: red[800],
        },
    },
})(Button);

export const RedSwitch = withStyles({
    switchBase : {
        color: red[800],
        '&$checked': {
            color: red[800],
        },
        '&$checked + $track': {
            backgroundColor: red[800],
        }
    },
    checked: {},
    track: {}
})(Switch);

export const BlueSwitch = withStyles({
    switchBase : {
        color: blue[800],
        '&$checked': {
            color: blue[800],
        },
        '&$checked + $track': {
            backgroundColor: blue[800],
        }
    },
    checked: {},
    track: {}
})(Switch);

