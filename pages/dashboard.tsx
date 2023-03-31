import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"

const DashboardContainer = styled.div`
	display: flex;
    flex-direction: column;
	width: 100vw;
    height: 100vh;
    .log-out {
        cursor: pointer;
    }
`
const Area = styled.div`
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #f9fafb;
    border-radius: 1rem;
    margin-top: 1rem;
`
const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    margin: 0 2rem;
    margin-top: auto;
    .handle {
        align-self: flex-end;
    }
`

const CharacterAttributes = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2em;
    label {
        font-size: 1rem;
    }
    input, button {
        padding: 0.5rem;
        border-radius: 0.25rem;
    }

    button {
        background-color: #13a0f0;
        color: #fff;
        border: none;
    }

    input {
        border: 1px solid #e5e7eb;
        
    }
    > div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
`

const Dashboard = () => {

    const { data: session }: any = useSession()

    const [character, setCharacter] = useState({
        characterName: '',
        level: 0,
        classType: '',
    })


    const fetchData = async () => {
        const character = {
            characterName: '',
            level: 0,
            classType: '',
        }
        const res = await fetch(`/api/character`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: session.user.id })
        })

        return await res.json()
    }

    useEffect(() => {
        const fetchCharacter = async () => {
            const data = await fetchData()
            setCharacter(data)
        }
        fetchCharacter()
    }, [])
    

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)

        const res = await fetch(`/api/character/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: session.user.id, ...data })
        })

        const json = await res.json()
        setCharacter(json)
    }

    return (
        <DashboardContainer>
            <Area>
                <CharacterAttributes onSubmit={handleCreate}>
                    <div>
                    <h1>Create a character</h1>
                    <label>Character Name</label>
                    <input type="text"  name="characterName" defaultValue={character.characterName} />
                    </div>
                    <div>
                        <label>Level</label>
                        <input type="number"  name="level"  defaultValue={character.level} />
                    </div>
                    <div>
                        <label>Class</label>
                        <input type="text" name="classType" defaultValue={character.classType} />
                    </div>
                    <button type="submit">Update</button>
                </CharacterAttributes>
            </Area>
            <Footer>
                <div className='handle'>
                    <p className='log-out' onClick={() => signOut()}>Log out?</p>
                </div>
            </Footer>
        </DashboardContainer>
    );
}

export default Dashboard