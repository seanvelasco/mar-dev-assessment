import styled from "@emotion/styled"

const Feedback = styled.div`
    padding: 1rem;
    border-radius: 0.75rem;
    margin-top: 1rem;
    &.success {
        background-color: #d4edda;
        color: #155724;
    }
    &.fail {
        background-color: #f8d7da;
        color: #721c24;
    }


`
export default Feedback