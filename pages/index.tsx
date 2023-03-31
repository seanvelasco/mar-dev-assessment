import { useState } from 'react'
import StyledForm from '@/components/StyledForm'
import Feedback from '@/components/Feedback'
import Head from 'next/head'
import styled from '@emotion/styled'
import { useSession } from "next-auth/react"
import Dashboard from './dashboard'
import { signIn } from "next-auth/react"

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const LoginContainer = styled.div`
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
	background-color: #f9fafb;
	padding: 1.25rem;
	border-radius: 0.75rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	p {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
		padding: 0;
	}
`

const RegisterCard = styled.div`
	text-align: center;
	background-color: #f9fafb;
	padding: 1rem;
	border-radius: 0.75rem;
	p {
		margin: 0;
	}
	a {
		color: #13a0f0;
	}
`
const LoginPage = () => {

    const [err, setErr] = useState('')

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setErr('')
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)
        const status = await signIn('credentials', {
			redirect: false,
			username: data.username,
			password: data.password,
		})

		if (status && status.error) {
			setErr(status.error)
		}
    }

	return (
        <LoginContainer>
            <h1>Sign in</h1>
            <LoginCard>
			<StyledForm onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" required />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" required />
				</div>
				<button type="submit">Login</button>
			</StyledForm>
            </LoginCard>
            <RegisterCard>
                <p>Don't have an account? <a href='/register'>Create an account</a>.</p>
            </RegisterCard>
			{err && <Feedback className='fail'>{err}</Feedback>}
        </LoginContainer>
    )
}

export default function Home() {

	const { data: session, status } = useSession()

	if (status === "loading") {
		return (
			<>
			<Head>
				<title>Loading</title>
			</Head>
			<Container>
				<h1>Loading</h1>
			</Container>
			</>
		)
	}

	if (!session) {
		return (
			<>
			<Head>
				<title>Sign in</title>
			</Head>
			<Container>
				<LoginPage />
			</Container>
			</>
		)
	}

	return (
		<>
		<Head>
			<title>Home</title>
		</Head>
		<Container>
			<Dashboard />
		</Container>
		</>
	)
}