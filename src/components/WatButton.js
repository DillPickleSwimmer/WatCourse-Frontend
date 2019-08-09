import  React from 'react';
import '../styles/WatButton.css';

export function WatButton(props) {
    // TODO: don't use className like this, just pass type 
    const {text, onClick, variant, name} = props;

    return <button name={name} className={variant} onClick={onClick}>{text}</button>;
}

export const WatButtonType = Object.freeze({
    PRIMARY:   'button primary-button',
    SECONDARY:  'button secondary-button',
    FACEBOOK: 'button fb connect',
    GOOGLE: 'button google-button_icon google-button'
});
