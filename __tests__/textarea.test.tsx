import { TextArea } from '@/components/input-fields/TextArea'
import React, { useState } from 'react'
import {userEvent} from '@testing-library/user-event'
import { render, screen } from "@testing-library/react"

const TestWrapper = ({initialValue = '', maxWords}: {initialValue: string, maxWords?:number}) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

  return (
    <TextArea label='Description' name='description' value={value} onChange={handleChange} maxWords={maxWords}/>
  )
}

describe("TextArea Component", () => {
    it("updates the value and does not show error when typing withing the word limit", async () => {
        const user = userEvent.setup()

        render(<TestWrapper initialValue='' maxWords={10} />)

        const textAreaEl = screen.getByRole("textbox")

        const userInput = "I'm a fullstack developer"

       await user.type(textAreaEl, userInput)

       expect(textAreaEl).toHaveValue(userInput)
       expect(screen.queryByText("/Maximum 10 words allowed/")).not.toBeInTheDocument()
    })

    it("clears the error message when the word count becomes valid", async() => {
        const MAX_WORDS = 10

        const user = userEvent.setup()

        render(<TestWrapper initialValue='' maxWords={10}/>)
        
        const textAreaEl = screen.getByRole("textbox")

        // 1. type text that exceed max word limit
        const userInputInvalid = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cumque magnam omnis."
        await user.type(textAreaEl, userInputInvalid)

        const errorMessageEl = await screen.findByText(`Maximum ${MAX_WORDS} words allowed`)
        expect(errorMessageEl).toBeInTheDocument()

        // 2. change the value to be within max word limit
        const userInputValid = "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
        await user.clear(textAreaEl)
        await user.type(textAreaEl, userInputValid)

        expect(screen.queryByText(`Maximum ${MAX_WORDS} words allowed`)).not.toBeInTheDocument()

    })
})