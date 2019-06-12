import  React from 'react';
import '../styles/WatButton.css';

export function WatButton(props) {
    // TODO: don't use className like this, just pass type 
    const {text, onClick, variant} = props;

    return <button className={variant} onClick={onClick}>{text}</button>;
}

export const WatButtonType = Object.freeze({
    PRIMARY:   'button primary-button',
    SECONDARY:  'button secondary-button',
});
