import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/input-fields/Icons"
import ProfilePreview from "@/components/ProfilePreview"
import { render } from "@testing-library/react"

describe('ProfileReview Component', () => { 
    const mockProfile = {
        firstName: "Rajwant",
        lastName: "Prajapati",
        email: "test@gmail.com",
        description: "I am a fullstack developer",
        imageUrl: "/test/sample-image.webp"
    }

    const mockSocials = [
        { platform: "x", url: "x.com/rajwant", Icon: TwitterIcon },
        { platform: "linkedin", url: "linkedin.com/rajwant", Icon: LinkedInIcon },
        { platform: "github", url: "github.com/rajwant", Icon: GitHubIcon },
    ]
    
    it("should render correctly and match snapshot", () => {
        const {asFragment: profileFragment} = render(<ProfilePreview profile={mockProfile} socials={mockSocials} />)

        expect(profileFragment).toMatchSnapshot()
    })
 })