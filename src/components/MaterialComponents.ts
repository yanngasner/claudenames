import {Button, Switch, withStyles} from "@material-ui/core";

export const BlueButton = withStyles({
    root : {
        backgroundColor: 'rgb(99, 158, 235)',
        '&:hover': {
            backgroundColor: 'rgba(99, 158, 235, 0.5)',
        },
    },
})(Button);

export const RedButton = withStyles({
    root : {
        backgroundColor: 'rgb(235, 99, 105)',
        '&:hover': {
            backgroundColor: 'rgba(235, 99, 105, 0.5)',
        },
    },
})(Button);

export const RedSwitch = withStyles({
    switchBase : {
        color: 'rgb(235, 99, 105)',
        '&$checked': {
            color: 'rgb(235, 99, 105)',
        },
        '&$checked + $track': {
            backgroundColor: 'rgb(235, 99, 105)',
        }
    },
    checked: {},
    track: {}
})(Switch);

export const BlueSwitch = withStyles({
    switchBase : {
        color: 'rgb(99, 158, 235)',
        '&$checked': {
            color: 'rgb(99, 158, 235)',
        },
        '&$checked + $track': {
            backgroundColor: 'rgb(99, 158, 235)',
        }
    },
    checked: {},
    track: {}
})(Switch);

