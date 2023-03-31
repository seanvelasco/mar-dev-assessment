import { useState } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import StyledForm from '@/components/StyledForm'
import Feedback from '@/components/Feedback'

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`
const RegisterContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 25rem;
	h1 {
		text-align: center;
		margin: 0;	
	}
`

const LoginCard = styled.div`
	text-align: center;
	background-color: #f9fafb;
	padding: 1rem;
	border-radius: 0.75rem;
	p { margin: 0 }
	a { color: #13a0f0 }
`

export default () => {

    const [res, setRes] = useState('')
    const [err, setErr] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setRes('')
        setErr('')
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const json = await res.json()

        if (!res.ok) {
            setErr(json.message)
        }
        else {
            setRes(json.message)
        }
    }

    return (
        <>
            <Head>
                <title>Sign up</title>
            </Head>
            <Container>
                <RegisterContainer>
                    <h1>Sign up</h1>
                    <StyledForm onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Full name</label>
                            <input type="text" name="name" required />
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" required />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" required />
                        </div>
                        <button type="submit">Register</button>
                    </StyledForm>
                    <LoginCard>
                        <p>Already have an account? <a href='/'>Login</a>.</p>
                    </LoginCard>
                    {res && <Feedback className='success'> {res}</Feedback>}
                    {err && <Feedback className='fail'> {err}</Feedback>}
                </RegisterContainer>
            </Container>
        </>
    )
}
