import { render, screen } from "@testing-library/react"
import Books from "../index";
import { getStaticProps } from "../index";
import axios from "axios";

jest.mock("axios");

const mockData = [
  {
    "id": "89cae71c-fbe5-445c-8299-6de7a88ea5ab",
    "cover": "https:\/\/picsum.photos\/id\/1002\/640\/480",
    "isbn": "9781449331818",
    "title": "Learning JavaScript Design Patterns",
    "subtitle": "A JavaScript and jQuery Developer's Guide",
    "author": "Prof. John Doe",
    "published": "2012-07-01T00:00:00.000Z",
    "publisher": "O'Reilly Media",
    "pages": 254,
    "description": "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
    "website": "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/"
  }
];

describe("Books", () => {
  it("renders a heading", () => {
    render(<Books />)
    const heading = screen.getByText(/all books/gi);

    expect(heading).toBeInTheDocument()
  });

  describe("getServerSideProps", () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {
      books: mockData
    } }));
  
    it("should call books api", async () => {
      const response = await getStaticProps();
      expect(response).toEqual(
        expect.objectContaining({
          props: {
            data: {
              books: mockData
            }
          }
        })
      );
    });
  });
})