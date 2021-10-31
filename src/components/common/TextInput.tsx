import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../style/constants';
interface ITextInput {
    label?: string;
    error?: string;
}

const TextInput: FC<ITextInput & React.HTMLProps<HTMLInputElement>> = ({ label, error, ...props }) => {
    const [focus, setFocus] = useState<boolean>(false);
    return (
        <TextInputWrapper>
            {label && <label className={`${focus ? 'focus' : ''} ${error ? 'error' : ''}`}>{label}</label>}
            <input className={error ? 'error' : ''} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...props} />
            {error && <span className="error">{error}</span>}
        </TextInputWrapper>
    );
};

export default TextInput;

const TextInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;

    input[type='text'],
    input[type='password'] {
        width: 400px;
        height: 30px;
        padding: 6px;
        color: ${COLORS.grey.main};
        border: 1px solid ${COLORS.grey.light};
        border-radius: 5px;

        &:focus {
            border: 1px solid ${COLORS.primary.light};
            outline: none;
        }
        &.error {
            border-color: ${COLORS.error.main};
        }
    }

    label {
        font-size: 12px;
        padding-left: 5px;
        color: ${COLORS.grey.main};
        font-weight: bold;
        &.focus {
            color: ${COLORS.primary.light};
        }
        &.error {
            color: ${COLORS.error.main};
        }
    }
    span.error {
        font-size: 12px;
        font-weight: 700;
        padding-left: 5px;
        color: ${COLORS.error.main};
    }
`;
