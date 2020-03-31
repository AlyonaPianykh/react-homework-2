import React from "react";
import './LoadingIndicator.scss'

const CN = 'loading-center';
export const LoadingIndicator = () => {
    return (
            <div className={CN}>
                <div className={`${CN}__loadingspinner`}>
                </div>
            </div>
    )
};