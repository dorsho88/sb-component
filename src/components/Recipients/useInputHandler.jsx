import React from 'react';

const form = {
    email: ''
};

const useInputHandler = callback => {
    const [values, setValues] = React.useState(form);

    const handleKeyDown = e => {
        if (["Enter", "Tab", ","].includes(e.key)) {
            e.preventDefault();
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        if (values.email.length < 1) {
            return;
        };
        callback(values.email);
        setValues(form);
    };

    const handleChange = e => {
        e.persist();
        let { value } = e.target;
        setValues(values => ({ ...values, [e.target.name]: value }));
    };

    const resetValues = () => {
        setValues(form);
    }

    return {
        handleChange,
        handleSubmit,
        handleKeyDown,
        resetValues,
        values
    };
};

export default useInputHandler;