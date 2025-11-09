import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/input-fields/Icons"
import { SocialFields } from "@/components/input-fields/SocialFields"
import { SocialLink } from "@/types/global"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"

const TestWrapper = ({initialSocials}: {initialSocials: SocialLink[]}) => {
    const [socials, setSocials] = useState(initialSocials)

    const onSocialChange = (updateIndex: number, value: string) => {
        setSocials(prevSocials => prevSocials.map((social, index) => index === updateIndex ? { ...social, url: value} : social ))
    }

    return <SocialFields socials={socials} onChange={onSocialChange}/>
}

describe("SocialFields Component", () => {
    const user = userEvent.setup()

    const mockSocials = [
        { platform: "x", url: "", Icon: TwitterIcon },
        { platform: "linkedin", url: "", Icon: LinkedInIcon },
        { platform: "github", url: "", Icon: GitHubIcon },
      ]

    
    it("should show error message for an invalid url", async() => {
        render(<TestWrapper initialSocials={mockSocials} />)

        const linkedInInputEl = screen.getByPlaceholderText(/linkedin\.com\/username/i)
        await user.type(linkedInInputEl, "github.com/invalid")

        expect(screen.getByText(/Please enter a valid linkedin URL/i)).toBeInTheDocument()
    })

    it("should clear error when a valid url is entered", async() => {
        render(<TestWrapper initialSocials={mockSocials} />)

        const linkedInInputEl = screen.getByPlaceholderText(/linkedin\.com\/username/i)
        await user.type(linkedInInputEl, "github.com/invalid")

        expect(screen.getByText(/Please enter a valid linkedin URL/i)).toBeInTheDocument()

        await user.clear(linkedInInputEl)
        await user.type(linkedInInputEl, "linkedin.com/rajwant")

        expect(screen.queryByText(/Please enter a valid linkedin URL/i)).not.toBeInTheDocument()
    })

    it("should not show error for an empty input", async () => {
        render(<TestWrapper initialSocials={mockSocials} />)

         const linkedInInputEl = screen.getByPlaceholderText(/linkedin\.com\/username/i)

         await user.type(linkedInInputEl, "github.com/invalid")
         await user.clear(linkedInInputEl)

         expect(screen.queryByText(/Please enter a valid linkedin URL/i)).not.toBeInTheDocument()
    })
})