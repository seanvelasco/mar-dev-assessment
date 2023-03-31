import styled from '@emotion/styled'

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input, button {
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
    }
    input {
        box-sizing: border-box;        
    }
    button {
        background-color: #13a0f0;
        color: white;
        cursor: pointer;
        transition: background-color 0.2s ease;
        border: none;        
        :hover {
            background-color: #0f7bb7;
        }
    }
    & > div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
`

export default StyledForm