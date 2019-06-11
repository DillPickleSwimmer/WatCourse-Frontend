import  React from 'react';
import '../styles/Button.css';

export function Button(props) {
    // TODO: don't use className like this, just pass type 
    const {text, onClick, variant} = props;
    let classes;
    switch(variant){
    case ButtonType.PRIMARY:
        classes = 'button primary-button';
        break;
    case ButtonType.SECONDARY:
        classes = 'button secondary-button';
        break;
    default:
        classes = 'button';
    }

    return <button className={classes} onClick={onClick}>{text}</button>;
}

export const ButtonType = Object.freeze({
    PRIMARY:   'PRIMARY',
    SECONDARY:  'SECONDARY',
});
