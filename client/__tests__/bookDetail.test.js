import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import BookDetails from "../pages/books/[id]";
import { getServerSideProps } from "../pages/books/[id]";
import * as axios from "axios";
import * as nextRouter from 'next/router';

jest.mock("axios");
nextRouter.useRouter = jest.fn();
const push = jest.fn() 
nextRouter.useRouter.mockImplementation(() => ({ route: '/', push}));


const mockData = [
  {
    "id": "872179f2-4de2-4cde-a259-ee470d83d515",
    "cover": "https:\/\/picsum.photos\/id\/1001\/640\/480",
    "isbn": "9781593275846",
    "title": "Eloquent JavaScript, Second Edition",
    "subtitle": "A Modern Introduction to Programming",
    "author": "Prof. John Doe",
    "published": "2014-12-14T00:00:00.000Z",
    "publisher": "No Starch Press",
    "pages": 472,
    "description": "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
    "website": "http://eloquentjavascript.net/"
  },
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

describe("Books list component", () => {
  describe("Renders correct information", () => {
    it("should render book\'s title", () => {
      render(<BookDetails book={mockData[0]} booksWithSameAuthor={[mockData[1]]}/>);
      const title = screen.getByText(mockData[0].title);
      expect(title).toBeInTheDocument();
    });
    it("should render book\'s isbn", () => {
      render(<BookDetails book={mockData[0]} booksWithSameAuthor={[mockData[1]]}/>);
      const isbn = screen.getByText('ISBN: ' + mockData[0].isbn);
      expect(isbn).toBeInTheDocument();
    });
  });
  it("should have a books with same author slider", () => {
    render(<BookDetails book={mockData[0]} booksWithSameAuthor={[mockData[1]]}/>);
    const title = screen.getByText(mockData[1].title);
    expect(title).toBeInTheDocument();
  });
  it("should go back to index page when back button pressed", async () => {
    const user = userEvent.setup()

    render(<BookDetails book={mockData[0]} booksWithSameAuthor={[mockData[1]]}/>);
    const button = await screen.findByRole('button', { name: "Back to list" });
    await user.click(button);
    expect(push).toHaveBeenCalledWith('/books');
  });
  it("should show message about no information available", () => {
    render(<BookDetails book={mockData[0]} booksWithSameAuthor={[]}/>);
    const message = screen.queryByText('You might also like from ' + mockData[0].author);
    expect(message).not.toBeInTheDocument();
  })
  describe('getServerSideProps method', () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {
      books: mockData
    } }));
    it("should call books api", async () => {
      const response = await getServerSideProps({ params: { id: mockData[0].id }});
      expect(response).toEqual(
        expect.objectContaining({
          props: {
            book: mockData[0],
            booksWithSameAuthor: [mockData[1]]
          }
        })
      );
    });
  })
});

