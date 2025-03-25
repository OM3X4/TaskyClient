/* eslint-disable */
import { useState, useEffect } from "react";

export default function Alert({ message }) {


    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 z-50 shadow-lg transition-transform duration-500
                `}
            role="alert"
        >
            {message}
        </div>
    );
}
