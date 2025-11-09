import { ImageUpload } from "@/components/input-fields/ImageUpload"
import { fireEvent, render, screen } from "@testing-library/react"


describe("ImageUpload", () => {
    const mockHandleChange = jest.fn();

    it("calls handleChange with the correct file when file is selected", () => {
        render(<ImageUpload handleChange={mockHandleChange} />);

        const file = new File(["dummy content"], "profile.png", { type: "image/png" });
        const fileInputEl = screen.getByTestId("file-upload");
        fireEvent.change(fileInputEl, { target: { files: [file] } });

        expect(mockHandleChange).toHaveBeenCalledTimes(1);
        expect(mockHandleChange).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({ files: expect.arrayContaining([file]) })
            })
        );
    });

     it("calls handleChange when a single valid file is dropped", () => {
        render(<ImageUpload handleChange={mockHandleChange} />);

        const file = new File(["dummy content"], "profile.png", { type: "image/png" });
        
        const dropZoneEl = screen.getByTestId("drop-zone")

        if (dropZoneEl) {
            fireEvent.drop(dropZoneEl, { dataTransfer: { files: [file] } })
        }

         expect(mockHandleChange).toHaveBeenCalledTimes(1)
    });

     it("does not call handleChange when a single non-image file is dropped", () => {
        render(<ImageUpload handleChange={mockHandleChange} />);

        const file = new File(["dummy content"], "document.pdf", { type: "application/pdf" });
        
        const dropZoneEl = screen.getByTestId("drop-zone")

        if (dropZoneEl) {
            fireEvent.drop(dropZoneEl, { dataTransfer: { files: [file] } })
        }
        expect(mockHandleChange).not.toHaveBeenCalledTimes(1)
    });

    it("clears the error message after a successful file has been uploaded", () => {
        render(<ImageUpload handleChange={mockHandleChange} />);

        const file1 = new File(["dummy content"], "profile1.png", { type: "image/png" });
        const file2 = new File(["dummy content 2"], "profile2.png", { type: "image/png" });
        
        const dropZoneEl = screen.getByTestId("drop-zone")
        if (dropZoneEl) {
            fireEvent.drop(dropZoneEl, { dataTransfer: { files: [file1, file2] } })
        }

        expect(screen.getByTestId("error-message")).toBeInTheDocument()

        const validfile = new File(["dummy content"], "profile1.png", { type: "image/png" });

        if (dropZoneEl) {
            fireEvent.drop(dropZoneEl, { dataTransfer: { files: [validfile] } })
        }

         expect(screen.queryByTestId("error-message")).not.toBeInTheDocument()
    })
});